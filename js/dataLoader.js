// Data export/import for localStorage, cookies, and IndexedDB
// Made by many totally human contributors (ChatGPT, Claude, probably me (i removed a few logs))

const ignoredLocalStorageKeys = [
  "_dh-played-apps", "_dh-personalization-experiment"
];

/* -------------------------
   Helpers for serializing values
   ------------------------- */
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      const comma = dataUrl.indexOf(',');
      resolve(dataUrl.slice(comma + 1));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function valueToSerializable(value) {
  if (value === null || value === undefined) {
    return { type: 'null', value: null };
  }
  if (typeof Blob !== 'undefined' && value instanceof Blob) {
    const b64 = await blobToBase64(value);
    return { type: 'blob', value: b64, mime: value.type || '' };
  }
  if (value instanceof ArrayBuffer) {
    return { type: 'arraybuffer', value: arrayBufferToBase64(value) };
  }
  if (ArrayBuffer.isView(value)) {
    return { type: 'arraybuffer', value: arrayBufferToBase64(value.buffer) };
  }
  
  // Handle Unity IDBFS objects with 'contents' field (Uint8Array)
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    // Check if this is a Unity file object with contents
    if (value.contents) {
      const isTypedArray = value.contents instanceof Uint8Array || ArrayBuffer.isView(value.contents);
      const isArrayBuffer = value.contents instanceof ArrayBuffer;
      
      if (isTypedArray || isArrayBuffer) {
        const buffer = isTypedArray ? value.contents.buffer || value.contents : value.contents;
        return {
          type: 'unity_file',
          timestamp: value.timestamp,
          mode: value.mode,
          contents: arrayBufferToBase64(buffer)
        };
      }
    }
    
    // Regular object - try JSON
    try {
      const json = JSON.stringify(value);
      return { type: 'json', value: json };
    } catch (e) {
      return { type: 'string', value: String(value) };
    }
  }
  
  try {
    const json = JSON.stringify(value);
    return { type: 'json', value: json };
  } catch (e) {
    return { type: 'string', value: String(value) };
  }
}

function serializableToValue(item) {
  if (!item || !item.type) return item;
  switch (item.type) {
    case 'null': 
      return null;
    case 'unity_file': {
      // Restore Unity IDBFS file structure
      const binary = atob(item.contents);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
      return {
        timestamp: item.timestamp,
        mode: item.mode,
        contents: bytes
      };
    }
    case 'blob': {
      const binary = atob(item.value);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
      try {
        return new Blob([bytes], { type: item.mime || '' });
      } catch (e) {
        return bytes.buffer;
      }
    }
    case 'arraybuffer': {
      const binary = atob(item.value);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
      return bytes.buffer;
    }
    case 'json': {
      try { return JSON.parse(item.value); } catch (e) { return item.value; }
    }
    case 'string':
    default:
      return item.value;
  }
}

// Helper to describe file mode
function getModeDescription(mode) {
  if (!mode) return 'unknown';
  // Unix file mode bits
  const S_IFDIR = 0o040000;  // Directory
  const S_IFREG = 0o100000;  // Regular file
  
  if ((mode & S_IFDIR) === S_IFDIR) return 'DIRECTORY';
  if ((mode & S_IFREG) === S_IFREG) return 'FILE';
  return 'other';
}

/* -------------------------
   IndexedDB Exporter
   ------------------------- */
async function exportAllIndexedDB() {
  const result = {};
  let dbInfos = [];

  if (indexedDB && indexedDB.databases) {
    try {
      dbInfos = await indexedDB.databases();
    } catch (e) { /* fallback */ }
  }

  if (!dbInfos || dbInfos.length === 0) {
    const fallbackNames = ['unity', 'fileData', 'emscripten-ht', 'saveload', 'indexeddb', 'UNITY_IDBFS'];
    const discovered = [];
    for (const name of fallbackNames) {
      try {
        await new Promise((resolve) => {
          const req = indexedDB.open(name);
          let handled = false;
          req.onsuccess = function () { handled = true; req.result.close(); resolve(true); };
          req.onupgradeneeded = function (e) { e.target.transaction.abort(); req.result && req.result.close(); resolve(false); };
          req.onerror = function () { resolve(false); };
          setTimeout(() => { if (!handled) resolve(false); }, 300);
        }).then(ok => { if (ok) discovered.push({ name }); });
      } catch { }
    }
    dbInfos = discovered;
  }

  for (const info of dbInfos) {
    const name = info.name;
    if (!name) continue;
    
    // Debug: Inspect the database before exporting
    // await debugInspectDB(name);
    
    result[name] = { stores: {} };

    await new Promise((resolve) => {
      const req = indexedDB.open(name);
      req.onsuccess = async function (e) {
        const db = e.target.result;
        try {
          const storeNames = Array.from(db.objectStoreNames);
          if (storeNames.length === 0) { db.close(); resolve(); return; }

          const tx = db.transaction(storeNames, 'readonly');
          let pending = storeNames.length;
          for (const storeName of storeNames) {
            const store = tx.objectStore(storeName);
            const keyPath = store.keyPath;
            const autoIncrement = store.autoIncrement;
            const items = [];
            const cursorReq = store.openCursor();
            cursorReq.onsuccess = async function (ev) {
              const cursor = ev.target.result;
              if (cursor) {
                try {
                  const serialized = await valueToSerializable(cursor.value);
                  items.push({ key: cursor.key, value: serialized });
                } catch (err) {
                  console.error(`[Export] Failed to serialize ${cursor.key}:`, err);
                  items.push({ key: cursor.key, value: { type: 'error', error: String(err) } });
                }
                cursor.continue();
              } else {
                result[name].stores[storeName] = { meta: { keyPath, autoIncrement }, entries: items };
                if (--pending === 0) { db.close(); resolve(); }
              }
            };
            cursorReq.onerror = function () {
              result[name].stores[storeName] = { meta: { keyPath, autoIncrement }, entries: [] };
              if (--pending === 0) { db.close(); resolve(); }
            };
          }
        } catch { db.close(); resolve(); }
      };
      req.onerror = function () { resolve(); };
    });
  }
  
  return result;
}

/* -------------------------
   Restore database safely
   ------------------------- */
async function restoreDBSafely(dbName, dbSpec) {
  return new Promise((resolve) => {
    const req = indexedDB.open(dbName);
    
    req.onupgradeneeded = function (e) {
      const db = e.target.result;
      for (const storeName of Object.keys(dbSpec.stores)) {
        const meta = dbSpec.stores[storeName].meta || {};
        if (!db.objectStoreNames.contains(storeName)) {
          try {
            db.createObjectStore(storeName, {
              keyPath: meta.keyPath ?? null,
              autoIncrement: !!meta.autoIncrement,
            });
          } catch (err) {
            console.error(`[Restore] Failed to create store ${storeName}:`, err);
          }
        }
      }
    };
    
    req.onsuccess = function (e) {
      const db = e.target.result;
      const storeNames = Object.keys(dbSpec.stores);
      
      if (storeNames.length === 0) {
        db.close();
        resolve();
        return;
      }
      
      const tx = db.transaction(storeNames, 'readwrite');
      
      for (const [storeName, storeData] of Object.entries(dbSpec.stores)) {
        const store = tx.objectStore(storeName);
        const entries = storeData.entries || [];

        for (const entry of entries) {
          try {
            const val = serializableToValue(entry.value);
            if (entry && entry.hasOwnProperty('key')) {
              store.put(val, entry.key);
            } else {
              store.put(val);
            }
          } catch (err) {
            console.error(`[Restore] Failed to restore entry in ${storeName}:`, err, entry);
          }
        }
      }
      
      tx.oncomplete = () => { 
        db.close(); 
        resolve();
      };
      tx.onerror = (e) => { 
        console.error(`[Restore] ✗ ${dbName} failed:`, e);
        db.close(); 
        resolve(); 
      };
    };
    
    req.onerror = (e) => {
      console.error(`[Restore] Could not open ${dbName}:`, e);
      resolve();
    };
  });
}

/* -------------------------
   IndexedDB Importer
   ------------------------- */
async function importAllIndexedDB(exported) {  
  for (const dbName of Object.keys(exported)) {
    const dbSpec = exported[dbName];
    if (!dbSpec || !dbSpec.stores) {
      console.warn(`[Import] Skipping ${dbName} - invalid spec`);
      continue;
    }
    await restoreDBSafely(dbName, dbSpec);
  }
}

/* -------------------------
   Export wrapper
   ------------------------- */
async function exportData() {
  const storageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (ignoredLocalStorageKeys.includes(key)) continue;
    storageData[key] = localStorage.getItem(key);
  }

  const cookieData = {};
  const cookies = document.cookie ? document.cookie.split(';') : [];
  cookies.forEach(cookie => {
    if (!cookie) return;
    const idx = cookie.indexOf('=');
    if (idx < 0) return;
    const name = cookie.slice(0, idx).trim();
    const value = cookie.slice(idx + 1).trim();
    cookieData[name] = value;
  });

  let indexed = {};
  try {
    indexed = await exportAllIndexedDB();
  } catch (err) {
    console.error('[Export] IndexedDB export failed:', err);
    indexed = { _error: String(err) };
  }

  const combinedData = {
    exportedAt: new Date().toISOString(),
    localStorage: storageData,
    cookies: cookieData,
    indexedDB: indexed
  };

  const jsonData = JSON.stringify(combinedData, null, 2); // Pretty print for debugging
  const base64Data = btoa(unescape(encodeURIComponent(jsonData)));

  const blob = new Blob([base64Data], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const d = new Date();
  a.download = `da-hub_data_backup_${d.getMonth() + 1}_${d.getDate()}_${d.getHours()}${d.getMinutes()}.b64`;
  a.click();
  URL.revokeObjectURL(url);
}

/* -------------------------
   Import wrapper
   ------------------------- */
function loadData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
    try {
      const base64Data = e.target.result;
      const jsonData = decodeURIComponent(escape(atob(base64Data)));
      const parsedData = JSON.parse(jsonData);

      // LocalStorage
      if (parsedData.localStorage) {
        for (const key in parsedData.localStorage) {
          if (ignoredLocalStorageKeys.includes(key)) continue
          try {
            localStorage.setItem(key, parsedData.localStorage[key]); 
          } catch (err) { 
            console.warn('[Import] localStorage set failed:', key, err); 
          }
        }
      }

      // Cookies
      if (parsedData.cookies) {
        for (const name in parsedData.cookies) {
          document.cookie = `${name}=${parsedData.cookies[name]}; path=/`;
        }
      }

      // IndexedDB
      if (parsedData.indexedDB && typeof parsedData.indexedDB === 'object') {
        if (parsedData.indexedDB._error) {
          console.error('[Import] Backup had IndexedDB error:', parsedData.indexedDB._error);
        } else {
          await importAllIndexedDB(parsedData.indexedDB);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      alert("Data imported! Check console for details. Page will reload in 2 seconds.");
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error("[Import] FATAL ERROR:", error);
      alert("Failed to import data: " + error.message + "\n\nCheck console for details.");
    }
  };
  reader.readAsText(file);
}

/* -------------------------
   Debug utilities
   ------------------------- */
// window.__exportIndexedDBToJson = exportAllIndexedDB;
// window.__importIndexedDBFromJson = importAllIndexedDB;
// window.__debugInspectDB = debugInspectDB;