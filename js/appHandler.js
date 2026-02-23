const _weeklyAppsCount = 4;
const _backupAppImage = "img/defaultImage.png";
const _favoriteAppIcon = "https://raw.githubusercontent.com/butterdogco/da-hub/refs/heads/main/img/icons/star_hollow.svg";
const openAppImage = document.getElementById("appOpenImage");

const onAppPlayed = personalization.onAppPlayed;
const getAppPlayedEntry = personalization.getAppPlayedEntry;

function seededRandom(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function createAppTile(info, app, location, lazy = false) {
  if ((location && location.querySelector(`#${appID(app)}${location && location.id || ""}`) === null) || location == null) {
    if (isReleased(info.added)) {
      const b = document.createElement("button");
      const p = document.createElement("p");
      const img = document.createElement("img");
      const overlay = document.createElement("div");
      const tags = document.createElement("div");
      const fav = document.createElement("button");
      b.id = appID(app) + (location && location.id || "");
      b.classList.add(appID(app));
      b.classList.add("appsButton");
      b.title = info.hint;
      if (app.Mobile && app.Mobile == true) {
        b.classList.add("mobileApp");
      }
      if (lazy == true) img.setAttribute("loading", "lazy");
      img.onclick = () => {
        if (info.openWithCode == true) {
          const url = `${window.location.origin}/${info.url}`;
          openWindow(url, "New Tab", "", true, false, app.Notice);
        } else {
          openAppImage.src = img.src;
          const rect = img.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          openAppImage.style.left = centerX + "px";
          openAppImage.style.top = centerY + "px";
          openAppImage.style.width = rect.width + "px";
          openAppImage.style.height = rect.height + "px";
          openAppImage.classList.add("visible");
          setTimeout(() => {
            openAppImage.classList.remove("visible");
          }, 500);
          openSite(`${info.url}`);
        }

        try {
          if (!app || !app.Id) return;
          fetch("/log_event", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              event: "open_app",
              data: {
                app_id: app.Id
              }
            })
          }).catch(err => {
            console.error("Failed to log open_app event:", err);
          });
        } catch (err) { }
        onAppPlayed(app);
        if (app.Notice && !app.OpenWithCode) notify({ Text: app.Notice, ShowTime: 5000 });
      }

      p.innerText = app.Name;
      p.classList.add("appName");

      overlay.classList.add("overlay");

      tags.classList.add("tags");
      overlay.appendChild(tags);

      fav.classList.add("favorite");
      fav.title = "Toggle favorite";
      fav.onclick = () => {
        try {
          setFavorite(app, !isFavorite(app));
          // window.sa_event("toggle_app_favorite", { app_id: app.id });
        } catch (err) {
          console.error(err);
        }
      }
      overlay.appendChild(fav);

      b.appendChild(img);
      b.appendChild(overlay);
      b.appendChild(p);

      if (info.added != undefined) {
        if (info.added.Bool) {
          const newP = document.createElement("p");
          newP.innerText = (() => { try { return unsafeGetElementLanguageData("appTagNew"); } catch (e) { return "NEW" } })() ?? "NEW";
          newP.classList.add("new");
          newP.setAttribute("data-lang", "appTagNew");
          newP.title = "This app was recently added (within the last 7 days)";
          tags.appendChild(newP);
          newApps++;
        }
      }

      if (info.broken || app["Hidden"] == true) {
        const newP = document.createElement("p");
        newP.classList.add("broken");
        newP.innerText = "!";
        newP.title = "This app may not work at the moment, we'll fix it soon.";
        tags.appendChild(newP);
      }

      if (info.fixed.Bool) {
        const newP = document.createElement("p");
        newP.innerText = (() => { try { return unsafeGetElementLanguageData("appTagFixed"); } catch (e) { return "FIXED" } })() ?? "FIXED";
        newP.classList.add("fixed");
        newP.setAttribute("data-lang", "appTagFixed");
        newP.title = "This app was recently fixed.";
        tags.appendChild(newP);
        newApps++;
      }

      if (info.updated != undefined) {
        if (info.updated.Bool) {
          const newP = document.createElement("p");
          newP.innerText = (() => { try { return unsafeGetElementLanguageData("appTagUpdated"); } catch (e) { return "UPDATED" } })() ?? "UPDATED";
          newP.setAttribute("data-lang", "appTagUpdated");
          newP.classList.add("updated");
          newP.title = "This app was recently updated to a newer version.";
          tags.appendChild(newP);
          newApps++;
        }
      }

      if (info.WIP == true) {
        const newP = document.createElement("p");
        newP.innerText = (() => { try { return unsafeGetElementLanguageData("appTagWIP"); } catch (e) { return "WIP" } })() ?? "WIP";
        newP.classList.add("wip");
        newP.setAttribute("data-lang", "appTagWIP");
        newP.title = "This app is a work in progress and may not be fully functional.";
        tags.appendChild(newP);
      }

      if (info.pinned) {
        fav.classList.add("favorited");
      }

      location = location || document.getElementById("apps");
      location.appendChild(b);

      img.onload = function () {
        img.style.opacity = 1;
      };

      img.onerror = function () {
        img.src = _backupAppImage;
      };
      img.src = `${info.folder || ""}/${info.thumbnail || "thumbnail.png"}`;
      img.classList.add("thumbnail");
    }
  }
}

function isReleased(added) {
  if (typeof (added) === "object" && added["Date"] != null) {
    added = added["Date"];
  } else {
    return;
  }

  const currentDate = new Date();
  const utc1 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const utc2 = Date.UTC(added.getFullYear(), added.getMonth(), added.getDate());
  return utc1 >= utc2;
}

function isNew(added, days) {
  if (typeof (added) === "object" && added["Date"] != null) {
    added = added["Date"];
  } else if ((added instanceof Date && !isNaN(added)) == false) {
    added = new Date("January 1, 2020");
  }

  days = days || 7;
  let newlyAdded = false;
  const currentDate = new Date();
  const utc1 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const utc2 = Date.UTC(added.getFullYear(), added.getMonth(), added.getDate());
  const timeDiff = Math.abs(utc2 - utc1);
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  if (daysDiff <= days) {
    newlyAdded = true;
  }
  return newlyAdded;
}

function isAppDatePropertyValid(property) {
  return (typeof (property) === "object" && property !== null && property.hasOwnProperty("Date"));
}

function getAppInfo(app) {
  let info = {
    hint: "Play " + app.Name,
    url: "apps/" + app.Folder + "/" + app.Index,
    folder: "apps/" + (app.Folder || app.Name),
    thumbnail: app.Thumbnail,
    broken: app.Broken,
    newlyUpdated: false,
    fixed: isAppDatePropertyValid(app.Fixed) && app.Fixed || { Bool: isNew(app.Fixed), Date: app.Fixed },
    added: isAppDatePropertyValid(app.Added) && app.Added || { Bool: isNew(app.Added), Date: app.Added },
    updated: isAppDatePropertyValid(app.Updated) && app.Updated || { Bool: isNew(app.Updated), Date: app.Updated },
    WIP: app.WIP || false,
    pinned: isFavorite(app),
    openWithCode: app.OpenWithCode
  };

  info["newlyUpdated"] = (isNew(info.added, 7) || isNew(info.fixed, 7) || isNew(info.updated, 7)) && true || false;

  return info;
}

function setupApp(app) {
  if (app["Hidden"] == true) {
    return;
  } else {
    app.Hidden = false;
  }

  app.Name = app.Name || "No Name";
  app.Folder = app.Folder || app.Name;
  app.Index = app.Index || "index.html";
  app.Thumbnail = app.Thumbnail || "";
  app.Broken = app.Broken || false;
  app.Fixed = app.Fixed || new Date("January 1, 2020");
  app.Added = app.Added || new Date("January 1, 2020");
  app.Updated = app.Updated || new Date("January 1, 2020");
  app.Section = app.Section || "apps";
  app.NewlyUpdated = app.NewlyUpdated || false;
  app.OpenWithCode = app.OpenWithCode || false;

  let info = getAppInfo(app);

  if (!sections.indexOf(app.Section)) {
    sections.push(app.Section);
  }
  sectionCount[app.Section] += 1;

  // Setup
  let sectionsToAddTo = [];
  if (info.newlyUpdated) sectionsToAddTo.push("newApps");
  if (info.pinned) sectionsToAddTo.push("favorite");
  if (info.newlyUpdated) sectionsToAddTo.push("newApps");
  sectionsToAddTo.push(app.Section);

  sectionsToAddTo.forEach(section => {
    createAppTile(info, app, document.getElementById(section), section == "apps");
  });
}

function sortApps() {
  try {
    var appsContainer = document.getElementById('apps');
    const appsButtons = Array.from(appsContainer.getElementsByClassName('appsButton'));
    const sortBy = document.getElementById('sortSelect').value;

    appsButtons.sort(function(a, b) {
      const appA = apps[Number.parseInt(a.id.replace('appButton', '').replace('apps', ''))];
      const appB = apps[Number.parseInt(b.id.replace('appButton', '').replace('apps', ''))];
      
      if (sortBy === 'alphabetical') {
        return appA.Name.localeCompare(appB.Name);
      } else if (sortBy === 'newest') {
        return new Date(appB.Added) - new Date(appA.Added);
      } else if (sortBy === 'oldest') {
        return new Date(appA.Added) - new Date(appB.Added);
      } else if (sortBy === 'mostPlayed') {
        const playedEntryA = getAppPlayedEntry(appA.Id);
        const playedEntryB = getAppPlayedEntry(appB.Id);
        const playCountA = playedEntryA ? playedEntryA.playCount : 0;
        const playCountB = playedEntryB ? playedEntryB.playCount : 0;
        return playCountB - playCountA;
      }
    });

    appsButtons.forEach(function(app) {
      appsContainer.appendChild(app);
    });
  } catch (err) {
    console.error(err)
  }
}

function appID(app) {
  return `appButton${appIndex(app)}`;
}

function appIndex(app) {
  return apps.indexOf(app);
}

function getFavorites() {
  let favorites;
  if (localStorage.getItem("favorites")) {
    favorites = JSON.parse(localStorage.getItem("favorites"));
  } else {
    favorites = [];
  }
  return favorites;
}

function isFavorite(app) {
  let favorites = getFavorites();
  let found = favorites.includes(app.Name);
  if (found) {
    return true;
  } else {
    return false;
  }
}

async function setFavorite(app, makeFavorite) {
  if (makeFavorite) {
    let favorites = getFavorites();
    favorites.push(app.Name);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    document.querySelectorAll(`.${appID(app)}`).forEach(function (thingy) {
      const e = thingy.querySelector(".favorite");
      if (e) {
        e.classList.add("favorited");
      }
    });
    setupApp(app);
    notify({ Text: `${app.Name} ${await getElementLanguageData("notifyAddedToFavorites")}` });
  } else {
    const thing = document.querySelector(`#favorite #${appID(app)}favorite`);
    if (thing) {
      thing.remove();
    }
    document.querySelectorAll(`.${appID(app)}`).forEach(function (thingy) {
      const e = thingy.querySelector(".favorited");
      if (e) {
        e.classList.remove("favorited");
      }
    });
    let favorites = getFavorites();
    favorites.splice(favorites.indexOf(app.Name), 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    notify({ Text: `${app.Name} ${await getElementLanguageData("notifyRemovedFromFavorites")}` });
  }
}

function getAppsOfTheWeek() {
  // This function will return a random selection of apps,
  // the apps selected will stay the same for 1 week, by using the week number plus year as a seed.

  const currentDate = new Date();
  const oneJan = new Date(currentDate.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
  const seed = currentDate.getFullYear().toString() + weekNumber.toString();

  let appsOfTheWeek = [];
  let availableApps = apps.filter(app => isReleased(getAppInfo(app).added) && !app["Hidden"] && !app["Broken"]);

  while (appsOfTheWeek.length < _weeklyAppsCount && availableApps.length > 0) {
    const randomIndex = Math.floor(seededRandom(parseInt(seed)) * availableApps.length);
    appsOfTheWeek.push(availableApps[randomIndex]);
    availableApps.splice(randomIndex, 1);
  }

  return appsOfTheWeek;
}

function addWeeklyRecommendations() {
  const weeklyApps = getAppsOfTheWeek();
  weeklyApps.forEach((app) => {
    createAppTile(getAppInfo(app), app, document.getElementById("weeklyApps"));
  });
}

function addAllValidApps() {
  apps.forEach(setupApp);
}