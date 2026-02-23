let overlayBackground = document.getElementById("overlayBackground");

/**
 * Sends a get request to the provided URL, and returns the response text.
 */
export async function fetchData(url) {
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
export async function openWindow(url, title, icon, code, removeCurrent) {
  var blank = window.open();
  if (code == false || code == undefined) {
    var link = blank.document.createElement('link');
    var style = blank.document.createElement('style');
    var meta = blank.document.createElement('meta');

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
    blank.document.write("<h1 style='text-align:center;position:fixed;top:5px;font-family:sans-serif;' class='noticeElement'>Please wait...<br><p>Fetching the page...</p></h1>")
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
 * Displays a prompt dialog with the provided message and options.
 * Returns a promise that resolves with the user's input or null if cancelled.
 * @param {string} message - The message to display in the prompt.
 * @param {object} buttons - Buttons for the prompt, e.g., [{text = "OK", callback = () => {}}].
 * @returns {Promise<string|null>} - A promise that resolves with null.
 */
export async function displayPrompt(message, buttons) {
  return new Promise((resolve) => {
    const prompt = document.createElement('div');
    prompt.classList.add('promptBox', 'overlayMenu');
    prompt.innerHTML = `<h2 class="promptMessage">${message}</h2>
    <div class="buttons">
      ${buttons && buttons.length ? buttons.map((button, index) => `<button id="promptButton${index}">${button.text}</button>`).join('') : `
        <button id="promptCancel">Nah (This prompt was not configured correctly)</button>
      `}
    </div>`;
    if (!overlayBackground) {
      overlayBackground = document.createElement('div');
      overlayBackground.id = "overlayBackground";
      overlayBackground.classList.add('overlayBackground');
      document.body.appendChild(overlayBackground);
    }
    overlayBackground.addEventListener('click', () => {
      closePrompt();
      resolve(null);
    });
    overlayBackground.classList.add('open');
    document.body.appendChild(prompt);
    prompt.classList.add('open'); // Allow CSS transition

    function closePrompt() {
      overlayBackground.classList.remove('open');
      prompt.remove();
    }

    // Add event listeners for buttons
    if (buttons && buttons.length) {
      buttons.forEach((button, index) => {
        document.getElementById(`promptButton${index}`).addEventListener('click', () => {
          closePrompt();
          button.callback();
          resolve();
        });
      });
    } else {
      document.getElementById('promptCancel').addEventListener('click', () => {
        closePrompt();
        resolve(null);
      });
    }
  });
}