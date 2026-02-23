import { openWindow } from "./utils.js";

const baseURL = window.location.origin + window.location.pathname.replace(/\/[^\/]+$/, "/");
const button = document.getElementById("oMSB");
const newURL = `${baseURL}home.html?v=${Date.now()}`;

if (("standalone" in window.navigator) && window.navigator.standalone) {
  // The site is running in standalone mode (e.g., on iOS home screen)
  window.location.replace(newURL);
} else {
  // The site is running in a browser
  button.addEventListener("click", () => {
    openWindow(newURL);
    window.location.replace("https://google.com");
  });
}