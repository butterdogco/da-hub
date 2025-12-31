const appsDiv = document.getElementById("apps");
const summerInfoDiv = document.getElementById("summerInfo");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsText = document.getElementById("results");
const clear = document.getElementById("clear");
const appSizesSelect = document.getElementById("appSizes");
const daHubSettingsPrefix = "settings-";
let appOpen = false;
let newApps = 0;
let sections = [];
let sectionCount = {};
let currentAppSize = "default";
let mobileMode = ["true", true].includes(localStorage.getItem(daHubSettingsPrefix + "MobileMode") || "nope");
let currentApp;

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
async function openWindow(url, title, icon, code, removeCurrent) {
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
 * Opens a URL, but inside the current page via an iframe.
 */
async function openSite(url) {
  appOpen = true;
  const originalOption = particlesEnabled;
  particlesEnabled = false;
  if (document.getElementById("appDiv")) {
    document.getElementById("appDiv").remove();
  }

  const appDiv = document.createElement('div');
  const buttonDiv = document.createElement('div');
  const closeButton = document.createElement('button');
  const timerButton = document.createElement('button');
  const settingsButton = document.createElement('button');
  const iframe = document.createElement('iframe');

  appDiv.id = "appDiv";
  buttonDiv.classList.add("appButtons");
  closeButton.innerText = await getElementLanguageData("inGameCloseButton");
  closeButton.setAttribute("data-lang", "inGameCloseButton");
  timerButton.innerText = await getElementLanguageData("inGameTimerButton");
  timerButton.className = "speedrunTimerButton";
  timerButton.setAttribute("data-lang", "inGameTimerButton");
  if (!timerEnabled) { timerButton.style.display = "none"; }
  settingsButton.innerText = await getElementLanguageData("inGameSettingsButton");
  settingsButton.className = "appSettingsButton";
  settingsButton.setAttribute("data-lang", "inGameSettingsButton");
  iframe.src = `${url}`;
  iframe.className = "appIframe";

  closeButton.addEventListener('click', async () => {
    if (confirm(await getElementLanguageData("appCloseConfirm")) === true) {
      document.getElementById("main").style.display = "block";
      appDiv.remove();
      appOpen = false;
      closeSpeedrunTimer();
      particlesEnabled = originalOption;
      if (particlesEnabled == true) {
        createParticles();
      }
    }
  });

  timerButton.addEventListener('click', function () {
    toggleSpeedrunTimer();
  });

  settingsButton.addEventListener('click', toggleSettings);

  appDiv.appendChild(iframe);
  appDiv.appendChild(buttonDiv);
  buttonDiv.appendChild(closeButton);
  buttonDiv.appendChild(settingsButton);
  buttonDiv.appendChild(timerButton);
  document.body.appendChild(appDiv);
  document.getElementById("main").style.display = "none";

  try {
    var event = new CustomEvent('appOpened', { frame: iframe })
    window.parent.document.dispatchEvent(event);
  } catch (err) {
    // do nothing
  }
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
  localStorage.setItem(daHubSettingsPrefix + "MobileMode", onMobile);
  try {
    settings["MobileMode"].SetTo = onMobile;
    settings["MobileMode"].UpdateFunction(onMobile);
  } catch (e) { }
}

let __logoClicks = 0;
function logoClick() {
  __logoClicks++;
  if (__logoClicks >= 10) {
    notify({Text: "<img src='img/butterdog.png' style='width:80px;height:80px;'></img>"});
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

// Apps setup
const _weeklyEnabled = localStorage.getItem(daHubSettingsPrefix + "WeeklyRecommend");

addAllValidApps();
addAppsOfTheWeek();
if (_weeklyEnabled == false) {
  document.querySelectorAll(".weeklyRecommendations").forEach((element) => {
    element.style.display = "none";
  });
}
sortApps();

window.addEventListener('beforeunload', (event) => {
  event.returnValue = "Are you sure you want to leave?";
});
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);

// Events
clear.addEventListener("click", function () {
  searchInput.value = "";
  searchApp();
});

searchForm.addEventListener("input", handleSearch);
searchForm.addEventListener("submit", handleSearch);

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

// Create particles
if (particlesEnabled === true) {
  createParticles();
}
