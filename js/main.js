const appsDiv = document.getElementById("apps");
const summerInfoDiv = document.getElementById("summerInfo");
const appSizesSelect = document.getElementById("appSizes");
const updateAvailableButton = document.getElementById("updateButton");
const overlayBackground = document.getElementById("overlayBackground");
const recommendationsHeader = document.querySelector(".categoryHeader.weeklyRecommendations");
const changelogFrame = document.getElementById("changelogFrame");
const changelogContent = document.getElementById("changelogContent");
const daHubSettingsPrefix = "settings-";
let appOpen = false;
let newApps = 0;
let sections = [];
let sectionCount = {};
let currentAppSize = "default";
let mobileMode = ["true", true].includes(localStorage.getItem(daHubSettingsPrefix + "MobileMode") || "nope");
let currentApp;
let scrollPosition;
let newVersion;

const setParticlesEnabled = particles.setParticlesEnabled;
const getAppRecommendations = personalization.getAppRecommendations;
const getExperimentStatus = personalization.getExperimentStatus;

// TODO: Import fetchData and openWindow from utils.js

/**
 * Sends a get request to the provided URL, and returns the response text.
 */
async function fetchData(url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      return html;
    })
    .catch(error => {
      console.warn('Error fetching HTML:', error);
      return null;
    })
}

/**
 * Opens a new about:blank window, supports creating an iframe, or fetching the source of the provided page.
 */
async function openWindow(url, title, icon, code, removeCurrent, notice) {
  const blank = window.open();
  if (code == false || code == undefined) {
    const link = blank.document.createElement('link');
    const style = blank.document.createElement('style');
    const meta = blank.document.createElement('meta');

    link.rel = "shortcut icon";
    link.href = icon || "";
    style.innerHTML = `body { width: 100vw;height: 100vh;margin: 0; background: black; } iframe { width: 100vw;height: 100vh;border: none;outline: none;margin: 0;} p { cursor: pointer;font-family: monospace;position: fixed;z-index: 2;padding: 8px;left: 0;transform: translateX(-50%);transition: 0.2s ease;opacity: 0.5;background: black;border: 2px solid lime;color: lime;} p:hover { left: 8px;transform: translateX(0);opacity: 1;}`;
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", "width=device-width, initial-scale=1");
    blank.document.title = title || "New Tab";
    var iframe = blank.document.createElement('iframe');
    iframe.src = `${url}`;
    blank.document.head.appendChild(style);
    blank.document.head.appendChild(link);
    blank.document.head.appendChild(meta);
    blank.document.body.appendChild(iframe);
  } else {
    blank.document.open();
    blank.document.write(`
      <div class="notifications" id="notifications"></div>
      <h1 style='text-align:center;position:fixed;top:5px;font-family:sans-serif;' class='noticeElement'>Please wait...<br><p>Fetching the page...</p></h1>
      `);
    const style = blank.document.createElement("style");
    style.innerHTML = `
    @import url('${window.location.origin}/css/themes/blue.css');

    @keyframes notificationFadeIn {
      0% {
        opacity: 0;
        transform: translateX(-50%);
      }

      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes notificationFadeOut {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
        transform: translateX(-50%);
      }
    }

    body {
      background: white;
      font-family: var(--font), sans-serif;
      color: var(--textColor1);
      margin: 0;
    }

    .backdropBlur {
      backdrop-filter: var(--backdropBlur);
      -webkit-backdrop-filter: var(--backdropBlur);
    }

    .backdropBlurChildren * {
      backdrop-filter: var(--backdropBlur);
      -webkit-backdrop-filter: var(--backdropBlur);
    }

    div.notifications {
      position: fixed;
      top: 5%;
      justify-content: center;
      width: 100vw;
      pointer-events: none;
      z-index: 99;

      p.notification {
        background-color: var(--accent);
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, .6) 100%);
        border-top: 3px solid var(--accentTransparent1);
        border-right: 3px solid var(--accentTransparent1);
        border-bottom: 3px solid var(--accentTransparent1);
        padding: 8px;
        border-radius: 0 8px 8px 0;
        animation: notificationFadeIn 0.5s ease;
        text-align: center;
        width: 400px;
        max-width: 90vw;
        z-index: 99;
      }
    }
    `;
    blank.document.head.appendChild(style);

    if (notice && notice.length > 0) {
      const messagesScript = blank.document.createElement("script");
      messagesScript.id = "messagesScript";
      messagesScript.src = window.location.origin + "/js/messages.js";
      blank.document.body.appendChild(messagesScript);

      const noticeScript = blank.document.createElement("script");
      noticeScript.innerHTML = `
        const messagesScript = document.getElementById("messagesScript");
        const notice = () => {
          notify({ Text: "${notice.replace(/"/g, '\\"')}", ShowTime: 5000 });
        };
        if (messagesScript.complete) {
          notice();
        } else {
          messagesScript.onload = notice;
        }
      `;
      blank.document.body.appendChild(noticeScript);
    }

    fetchData(url).then(html => {
      if (html) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, "text/html");

        blank.document.write(htmlDoc.documentElement.outerHTML);
        blank.document.writeln(`
          <script>
            const elements = document.getElementsByClassName('noticeElement');
            for (let i = 0; i < elements.length; i++) {
              elements[i].style.display = "none";
            }
          </script>`
        );
        blank.document.close();
      } else {
        blank.document.write("<h1 style='text-align:center;position:fixed;top:40px;font-family:sans-serif;'>Failed to read the URL, please try again or report this.</h1>");
      }
    });
  }

  if (removeCurrent == true) {
    window.location.replace("https://google.com");
  }
}

/**
 * Opens a URL, but inside the current page via an iframe.
 */
async function openSite(url) {
  appOpen = true;
  scrollPosition = window.scrollY;
  setParticlesEnabled(false);

  const existingAppDiv = document.getElementById("appDiv");
  if (existingAppDiv) existingAppDiv.remove();

  const appDiv = document.createElement('div');
  appDiv.id = "appDiv";
  
  const iframe = document.createElement('iframe');
  iframe.src = `${url}`;
  iframe.className = "appIframe";
  appDiv.appendChild(iframe);
  
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add("appButtons");
  appDiv.appendChild(buttonDiv);
  
  const closeButton = document.createElement('button');
  closeButton.innerText = await getElementLanguageData("inGameCloseButton");
  closeButton.setAttribute("data-lang", "inGameCloseButton");
  closeButton.addEventListener('click', async () => {
    if (confirm(await getElementLanguageData("appCloseConfirm")) === true) {
      document.getElementById("main").style.display = "block";
      appDiv.remove();
      appOpen = false;
      window.scrollTo(0, scrollPosition);
      closeSpeedrunTimer();
      setParticlesEnabled(true);
    }
  });
  buttonDiv.appendChild(closeButton);
  
  const timerButton = document.createElement('button');
  timerButton.innerText = await getElementLanguageData("inGameTimerButton");
  timerButton.className = "speedrunTimerButton";
  timerButton.setAttribute("data-lang", "inGameTimerButton");
  timerButton.addEventListener('click', toggleSpeedrunTimer);
  if (!timerEnabled) timerButton.style.display = "none";
  buttonDiv.appendChild(timerButton);
  
  const settingsButton = document.createElement('button');
  settingsButton.innerText = await getElementLanguageData("inGameSettingsButton");
  settingsButton.className = "appSettingsButton";
  settingsButton.setAttribute("data-lang", "inGameSettingsButton");
  settingsButton.addEventListener('click', toggleSettings);
  buttonDiv.appendChild(settingsButton);

  const reloadButton = document.createElement('button');
  reloadButton.innerText = await getElementLanguageData("inGameReloadButton");
  reloadButton.id = "inGameReloadButton";
  reloadButton.setAttribute("data-lang", "inGameReloadButton");
  reloadButton.addEventListener('click', () => iframe.contentWindow.location.reload());
  if (!window.iframeReloadEnabled) reloadButton.style.display = "none";
  buttonDiv.appendChild(reloadButton);

  document.body.appendChild(appDiv);
  document.getElementById("main").style.display = "none";
}

async function getChangelogContent() {
  try {
    const response = await fetch('documents/changelog.md');
    const data = await response.text();
    return marked.parse(data);
  } catch (e) {
    return "<p>Failed to load changelog.</p>";
  }
}

let changelogOverlayClickEvent = null;
let changelogLoaded = false;
/**
 * Toggles the changelog overlay.
 */
function toggleChangelog() {
  const open = !changelogFrame.classList.contains("open");
  changelogFrame.classList.toggle("open");
  overlayBackground.classList.toggle("open", open);

  if (open == true && !changelogOverlayClickEvent) {
    changelogOverlayClickEvent = toggleChangelog;
    overlayBackground.addEventListener("click", changelogOverlayClickEvent);
    if (!changelogLoaded) {
      getChangelogContent().then((content) => {
        changelogContent.innerHTML = content;
        changelogLoaded = true;
      });
    }
  } else if (changelogOverlayClickEvent) {
    overlayBackground.removeEventListener("click", changelogOverlayClickEvent);
    changelogOverlayClickEvent = null;
  }
}

/**
 * Returns whether or not the current window has the iframe=true parameter.
 */
function getInIframe() {
  try {
    const params = new URL(document.location).searchParams;
    const iframe = params.get("iframe");
    return (iframe == "true" && iframe != null);
  } catch (e) {
    return true;
  }
}

/**
 * Checks whether or not the window is in an iframe, and corrects the URL if needed.
 */
function checkInFrame() {
  // if (getInIframe() == false) {
  //   document.body.innerHTML = "";
  //   window.location.href = `home.html?iframe=true`;
  // } else {
  window.addEventListener('beforeunload', (event) => {
    event.returnValue = "Are you sure you want to leave?";
  });
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  }, false);
  // }
}

/**
 * Returns whether or not the user is currently on a mobile device
 */
function isMobile() {
  return (
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || // user agent
    (window.innerWidth <= 768 && 'ontouchstart' in window)       // screen size + touch
  );
}

/**
 * Handler for detected mobile devices.
 */
async function mobileDetected() {
  let onMobile = confirm(await getElementLanguageData("mobileDetectPrompt"));
  mobileMode = onMobile;
  try {
    updateSetting("MobileMode", onMobile, true, window.settings.settings);
  } catch (e) {
    console.error("Failed to update MobileMode setting via settings object:", e);
    localStorage.setItem(daHubSettingsPrefix + "MobileMode", onMobile);
  }
}

let __logoClicks = 0;
function logoClick() {
  __logoClicks++;
  if (__logoClicks >= 10) {
    notify({ Text: "<img src='img/butterdog.png' style='width:80px;height:80px;'></img>" });
    __logoClicks = 0;
  }
}

function observe(element, callback) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        callback(mutation);
      }
    }
  });
  observer.observe(element, { childList: true, attributes: true });
}

let currentVersion = null;
let updateAvailable = false;
let updateInterval = null;
/**
 * Fetches the current version from the server, and compares it to the current version.
 * If the versions are different, it notifies the user that an update is available.
 * @returns {Promise<boolean>} True if an update is available, false otherwise.
 */
function fetchVersion() {
  return fetch('version')
    .then(response => response.text())
    .then(async (version) => {
      if (updateAvailable == true) return;
      if (currentVersion == null) {
        currentVersion = version.trim();
        if (versionText) {
          versionText.innerText = "Da Hub version " + currentVersion;
        }
        return false;
      } else if (version.trim() != currentVersion.trim()) {
        newVersion = version.trim();

        // Determine if the version is a major or minor update (number changed, or letter changed)
        // Example version: 13a
        const currentVersionNumber = parseInt(currentVersion);
        const newVersionNumber = parseInt(version.trim());
        notify({
          Text: await getElementLanguageData(newVersionNumber > currentVersionNumber ? "newMajorVersionAvailable" : "newMinorVersionAvailable")
        });

        updateAvailableButton.classList.add("visible");
        updateAvailable = true;
        clearInterval(updateInterval);
        updateInterval = null;

        if (versionText) {
          versionText.innerText = "Da Hub version " + currentVersion + " -> " + version.trim();
        }

        return true;
      }

      return false;
    })
    .catch(error => {
      console.warn('Error fetching version:', error);
    });
}

function reloadPage() {
  window.location.reload();
}

function updateSite() {
  if (newVersion) {
    try {
      // Append new version to URL
      const url = new URL(window.location.href);
      url.searchParams.set("v", newVersion);
      window.location.replace(url.toString());
      return; // Completed, don't continue
    } catch (err) {
      // Do nothing
    }
  }

  // If all else fails, or no new version is detected, just reload
  reloadPage();
}

// Apps setup
const _weeklyEnabled = localStorage.getItem(daHubSettingsPrefix + "WeeklyRecommend");

addAllValidApps();

if (_weeklyEnabled != false && _weeklyEnabled != "false") {
  let appTiles = [];
  function addRecommendations() {
    // Clear existing recommendations
    appTiles.forEach((appId) => {
      const appElement = document.getElementById(appId + "weeklyApps");
      if (appElement) appElement.remove();
    });
    appTiles = [];

    getAppRecommendations().forEach((app) => {
      createAppTile(getAppInfo(app), app, document.getElementById("weeklyApps"));
      appTiles.push(appID(app));
    });
  }

  addRecommendations();
  setInterval(addRecommendations, 10 * 60 * 1000); // Update every 10 minutes
}

if (_weeklyEnabled == false) {
  document.querySelectorAll(".weeklyRecommendations").forEach((element) => {
    element.style.display = "none";
  });
}
sortApps();

// Events
document.addEventListener('DOMContentLoaded', function () {
  checkInFrame();
});

/* 
  Final setup
*/

// Mobile mode CSS
if (mobileMode == true) {
  document.body.classList.add("mobileMode");
}

sections.forEach(function (section) {
  if (sectionCount[section] && sectionCount[section] < 1) {
    document.querySelectorAll(`.${section}Section`).forEach(function (obj) {
      obj.style.display = "none";
    });
  }
});

// Check if the user is on mobile
if (mobileMode == false && isMobile() && localStorage.getItem(daHubSettingsPrefix + "__MobilePromptIgnore") == null) {
  localStorage.setItem(daHubSettingsPrefix + "__MobilePromptIgnore", true);
  mobileDetected();
}

// Fetch version every 10 minutes
fetchVersion();
updateInterval = setInterval(fetchVersion, 10 * 60 * 1000);