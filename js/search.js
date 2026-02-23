const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const resultCount = document.getElementById("resultCount");
const queryText = document.getElementById("queryText");
const multipleResults = document.getElementById("multipleResults");
const altCSS = document.createElement("style");
altCSS.rel = 'stylesheet';

function searchApp(name) {
  var foundApps = [];
  if (name != undefined && name !== "") {
    altCSS.innerHTML = `.appsButton { display: none !important; animation: none; }
                        .hideOnSearch { display: none; }
                        .foundApp { display: flex !important; }`;
    document.querySelectorAll(".foundApp").forEach((app) => {
      app.classList.remove("foundApp");
    });
    const lowerCaseSearch = name.toLowerCase();
    apps.forEach(function (app) {
      if (app.Hidden == true) return;
      let match = false;
      while (match == false) {
        // Search logic - Look through all properties of the app, and if any of them match the search term, break the loop. Else, keep going until all properties have been searched
        if (app.hasOwnProperty("Genres")) { 
          const appGenres = app.Genres.map(e => e.toLowerCase());
          if (appGenres.some(genre => genre.includes(lowerCaseSearch))) { match = true; break; }
        }
        if (app.hasOwnProperty("Related")) {
          const appRelated = app.Related.map(e => e.toLowerCase());
          if (appRelated.some(rel => rel.includes(lowerCaseSearch))) { match = true; break;}
        }
        if (app.hasOwnProperty("Name")) {
          const appName = app.Name.toLowerCase();
          if (appName.includes(lowerCaseSearch)) { match = true; break; }
        }
        break;
      }
      // Search logic
      if (match) {
        foundApps.push(app);
      }
    });
    foundApps.sort();
    foundApps.forEach(function(app) {
      if (app.Hidden === true) { return; }
      const button = document.getElementById(appID(app) + "apps") 
        || document.getElementById(appID(app) + "emulators")
        || document.getElementById(appID(app) + "webApps");
      if (button) {
        button.classList.add("foundApp");
      } else {
        console.warn("Could not find button for app:", app);
      }
    });

    if (name !== "") {
      resultsText.classList.remove("hidden");
      const results = foundApps.length;
      if (name == "by name, genre, anything") {
        resultCount.innerText = "0";
        queryText.innerText = "why are you searching for that";
        multipleResults.classList.remove("hidden");
      } else {
        resultCount.innerText = results;
        queryText.innerText = name;
        multipleResults.classList.toggle("hidden", results == 1);
      }
    } else {
      resultCount.innerText = "0";
      queryText.innerText = "";
    }
  } else {
    altCSS.innerHTML = `.appsButton { display: block; animation: none; }`;
    resultsText.classList.add("hidden");
  }
}

function handleSearch(e) {
  if (e.type == "submit") {
    e.preventDefault();
    e.stopPropagation();
  }
  
  searchApp(searchInput.value);
}

function clearSearchInput() {
  searchInput.value = "";
  searchApp("");
}

document.head.appendChild(altCSS);

searchInput.addEventListener("input", handleSearch);
searchInput.addEventListener("submit", handleSearch);
clearSearch.addEventListener("click", clearSearchInput);