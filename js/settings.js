let _currentLanguage = locales.currentLanguage;
let settings = {}; // Object to hold settings data

// Settings Handler
const versionText = document.getElementById("currentVersion");
const themeSheet = document.getElementById("themeStylesheet");
let settingsFrame = document.getElementById("settingsFrame");
let settingsList = document.getElementById("settingsList");
let settingsOpen = false;

const settingsHeaderLangPrefix = "settingsCategory";
const settingsItemLangPrefix = "settingsItem";
const settingsItemButtonLangSuffix = "Button";
const settingsSocialLangPrefix = "settingsSocial";
const closeKeybind = "Escape";

const updateTheme = themeSystem.updateTheme;
const themes = themeSystem.themes;

async function getSettingDisplayName(name) {
  return await locales.getElementLanguageData(settingsItemLangPrefix + name);
}

async function getSettingHeaderText(name) {
  return await locales.getElementLanguageData(settingsHeaderLangPrefix + name);
}

async function getSocialLinkText(name) {
  return await locales.getElementLanguageData(settingsSocialLangPrefix + name);
}

function parseBoolean(value, defaultValue = null) {
  if (value === 'true' || value === true) return true;
  if (value === 'false' || value === false) return false;
  return defaultValue;
}

async function initSettings() {
  const categoryNames = {
    Visual: await locales.getElementLanguageData("settingsCategoryVisual"),
    Features: await locales.getElementLanguageData("settingsCategoryFeatures"),
    Performance: await locales.getElementLanguageData("settingsCategoryPerformance"),
    Advanced: await locales.getElementLanguageData("settingsCategoryAdvanced"),
  };

  const socialLinks = [
    { name: "ButterDogCoSite", url: "https://butterdogco.com/", icon: "img/butterdogco.png" },
    { name: "Discord", url: "https://discord.gg/KZzVM4rfg6", icon: "img/discord.jpg" },
  ];

  let allSettings = {
    ["Language"]: {
      Category: "Visual",
      LanguageKey: "Language",
      SetTo: _currentLanguage || "English",
      Options: Object.keys(locales.languages),
      UpdateFunction: (newLang) => {
        if (newLang != _currentLanguage) {
          _currentLanguage = newLang;
          locales.updateLanguage(newLang);
        }
      },
    },

    ["Theme"]: {
      Category: "Visual",
      LanguageKey: "Theme",
      SetTo: "Blue",
      Options: themes.map(t => t.name),
      UpdateFunction: updateTheme
    },

    ["Grid Mode"]: {
      Category: "Visual",
      LanguageKey: "AppGridMode",
      SetTo: "Default",
      Options: ["Default", "Square", "LargeTiles"],
      UpdateFunction: function (newSize) {
        // appsDiv.classList.remove(currentAppSize);
        // appsDiv.classList.add(newSize);
        document.querySelectorAll(".apps").forEach((div) => {
          div.classList.remove(currentAppSize);
          div.classList.add(newSize);
        });
        currentAppSize = newSize;
      },
    },

    ["Snow Particles"]: {
      Category: "Visual",
      LanguageKey: "SnowParticles",
      SetTo: "false",
      Options: ["false", "true"],
      UpdateFunction: (val) => {
        const enabled = parseBoolean(val, false);
        setParticlesEnabled(enabled, true);
      }
    },

    ["Weekly Recommendations"]: {
      Category: "Features",
      LanguageKey: "WeeklyRecommendations",
      SetTo: "true",
      Options: ["true", "false"],
      UpdateFunction: function (val) {
        const enabled = parseBoolean(val, false);
        document.querySelectorAll(".weeklyRecommendations").forEach((element) => {
          element.classList.toggle("hidden", !enabled);
        });
      }
    },

    ["Settings In-Game"]: {
      Category: "Features",
      LanguageKey: "ShowSettingsInGame",
      SetTo: "true",
      Options: ["true", "false"],
      UpdateFunction: function (val) {
        const enabled = parseBoolean(val, false);
        updateVisibilityOfSettingsButton(enabled);
        if (settingsOpen && !enabled && appOpen) {
          locales.toggleSettings();
        }
      }
    },

    ["Speedrun Timer"]: {
      Category: "Features",
      LanguageKey: "SpeedrunTimer",
      SetTo: "false",
      Options: ["false", "true"],
      UpdateFunction: function (val) {
        const enabled = parseBoolean(val, false);
        timerEnabled = enabled;
        if (!enabled) {
          closeSpeedrunTimer();
        }
        updateVisibilityOfToggleButton();
      }
    },

    ["Reload App Button"]: {
      Category: "Features",
      LanguageKey: "ReloadButtonInGame",
      SetTo: "false",
      Options: ["false", "true"],
      UpdateFunction: function (val) {
        const enabled = parseBoolean(val, false);
        window.iframeReloadEnabled = enabled;
        const button = document.getElementById("inGameReloadButton");
        if (button) button.style.display = enabled ? "block" : "none";
      }
    },

    ["MobileMode"]: {
      Category: "Features",
      LanguageKey: "HideNonMobileApps",
      SetTo: "false",
      Options: ["false", "true"],
      UpdateFunction: function (val) {
        const enabled = parseBoolean(val, false);
        document.body.classList.toggle("mobileMode", enabled);
        document.querySelectorAll(".apps").forEach(div => {
          const placeholder = div.querySelector(".placeholder");
          const allHidden = [...div.querySelectorAll(".appsButton")].every((button) => button.classList.contains("mobileApp") == false);
          if (placeholder) {
            if (allHidden == false && enabled == true && div.childElementCount > 1) { // Force hide placeholder since CSS won't handle this due to the child count
              placeholder.style.display = "none";
            } else if (allHidden == true && enabled == true && div.childElementCount > 1) { // Force show placeholder since CSS won't handle this due to the child count
              placeholder.style.display = "block";
            } else { // Don't override (let CSS handle it)
              placeholder.style = "";
            }
          }
        });
      },
    },

    ["FlipInAppButtons"]: {
      Category: "Features",
      LanguageKey: "flipInAppButtons",
      SetTo: "false",
      Options: ["false", "true"],
      UpdateFunction: function (val) {
        const enabled = parseBoolean(val, false);
        document.body.classList.toggle("flipInAppButtons", enabled);
      }
    },

    ["Transparent background blurring"]: {
      Category: "Performance",
      LanguageKey: "TransparentBackgroundBlurring",
      SetTo: "true",
      Options: ["true", "false"],
      UpdateFunction: function (val) {
        const enabled = parseBoolean(val, false);
        document.body.classList.toggle("blurEnabled", enabled);
      }
    },

    ["Export Saved Data"]: {
      Category: "Advanced",
      LanguageKey: "ExportSavedData",
      Text: "Download",
      Icon: "download.svg",
      RunFunction: exportData,
    },

    ["Import Saved Data"]: {
      Category: "Advanced",
      LanguageKey: "ImportSavedData",
      Text: "Upload",
      Icon: "upload.svg",
      RunFunction: loadData,
      FileInput: true,
    },


    ["Reload Page"]: {
      Category: "Advanced",
      LanguageKey: "reloadPage",
      LanguageKeyPrefix: false,
      Text: "Reload",
      Icon: "reload.svg",
      RunFunction: reloadPage,
    },

    ["Check Updates"]: {
      Category: "Advanced",
      LanguageKey: "checkUpdates",
      LanguageKeyPrefix: false,
      Text: "Check",
      Icon: "update.svg",
      // RunFunction: fetchVersion,
      RunFunction: () => {
        fetchVersion().then(available => {
          if (!available) alert(locales.unsafeGetElementLanguageData("noVersionAvailable"));
        });
      }
    },
  }

  buildSettingsUI(allSettings, socialLinks, categoryNames);

  // Add event listener to close settings with Escape key
  document.addEventListener("keydown", function escListener(event) {
    if (event.key === closeKeybind && settingsOpen) {
      settings.toggleSettings();
    }
  });
}

async function buildSettingsUI(settingsOptions, socialLinks, categoryNames) {
  const categories = [];

  // Setup categories array
  for (let key in settingsOptions) {
    const saved = getSavedSetting(key, settingsOptions);
    if (saved) {
      updateSetting(key, saved, false, settingsOptions);
    }

    const category = settingsOptions[key]["Category"] || "General";
    if (!categories.some(cat => cat.name === category)) {
      categories.push({ name: category, options: [key] });
    } else {
      categories.find(cat => cat.name === category).options.push(key);
    }
  }

  // Create categories
  categories.forEach(async (category) => {
    const categoryElement = document.createElement("h3");
    categoryElement.setAttribute("data-lang", settingsHeaderLangPrefix + category.name);
    categoryElement.innerText = !locales.currentLanguageData && await getSettingHeaderText(category.name) || locales.unsafeGetElementLanguageData(settingsHeaderLangPrefix + category.name);
    settingsList.appendChild(categoryElement);
    category.options.forEach((option) => {
      createOptionButton(option, settingsOptions);
    });
  });

  // Create social link header
  const header = document.createElement("h2");
  header.setAttribute("data-lang", "settingsExtraHeader");
  header.innerText = await locales.getElementLanguageData("settingsExtraHeader");
  header.id = "socialHeader";

  // Create social link buttons
  const container = document.createElement("ul");
  container.id = "socialLinks";
  socialLinks.forEach(async (link) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = link.url;
    a.title = link.url;
    li.appendChild(a);

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = link.icon || "img/butterdog.png";
    img.className = "socialIcon";
    a.appendChild(img);

    const text = document.createElement("p");
    text.setAttribute("data-lang", settingsSocialLangPrefix + link.name);
    text.innerText = !locales.currentLanguageData && (await getSocialLinkText(link.name) || link.name) || (locales.unsafeGetElementLanguageData(settingsSocialLangPrefix + link.name) || link.name);
    text.className = "socialText";
    a.appendChild(text);
    container.appendChild(li);
  });

  settingsList.appendChild(header);
  settingsList.appendChild(container);
  settingsList.appendChild(versionText); // Move version text to the end of the list

  settings.settings = settingsOptions;
}

settings.toggleSettings = function () {
  settingsFrame.classList.toggle("open");
  settingsOpen = settingsFrame.classList.contains("open");
  overlayBackground.classList.toggle("open", settingsOpen);
  document.body.classList.toggle("settingsOpen", settingsOpen);

  if (settingsOpen) {
    settingsFrame.setAttribute("aria-hidden", "false");
    // Add event listener to close settings when clicking outside
    overlayBackground.addEventListener("click", settings.toggleSettings);
  } else {
    settingsFrame.setAttribute("aria-hidden", "true");
    // Remove event listener when settings are closed
    overlayBackground.removeEventListener("click", settings.toggleSettings);
  }
}

function updateVisibilityOfSettingsButton(value) {
  const toggleButton = document.querySelector(".appSettingsButton");
  if (toggleButton) {
    toggleButton.style.display = value ? "block" : "none";
  }
}

function checkIfOptionIsValid(options, value) {
  return options.includes(`${value}`);
}

function updateSetting(name, newValue, save, settings) {
  const option = settings[name];
  if (option && checkIfOptionIsValid(option.Options, newValue)) {
    option["SetTo"] = newValue;
    if (save == true) {
      saveSetting(name, settings);
    }

    const func = settings[name]["UpdateFunction"];
    if (func) {
      func(option.SetTo);
    }
  }
}

function saveSetting(name, settings) {
  if (settings[name] != null) {
    const savedOption = settings[name]["Save"];
    if (savedOption === false) return; // Do not save if Save is false
    localStorage.setItem(`settings-${name}`, settings[name]["SetTo"]);
  }
}

function getSavedSetting(name, settings) {
  if (settings[name] != null) {
    return localStorage.getItem(`settings-${name}`);
  }
}

async function createOptionButton(name, settings) {
  const option = settings[name];
  if (option != null) {
    // Check if the default value is a boolean
    const isABoolean = option.SetTo == "true" || option.SetTo == "false";
    const availableOptions = option.Options;
    const langPrefix = option.LanguageKeyPrefix === false ? "" : settingsItemLangPrefix;

    const frame = document.createElement("li");
    frame.classList.add("option");
    const label = document.createElement("p");
    label.setAttribute("data-lang", langPrefix + option.LanguageKey);
    label.innerText = option.LanguageKey && (!locales.currentLanguageData && await getSettingDisplayName(option.LanguageKey) || locales.unsafeGetElementLanguageData(langPrefix + option.LanguageKey)) || name;
    label.classList.add("label");
    frame.appendChild(label);


    if (isABoolean == true) {
      const checkbox = document.createElement("input");
      checkbox.classList.add("checkbox");
      checkbox.type = "checkbox";
      checkbox.checked = option.SetTo == "true" && true || false;
      checkbox.onclick = () => {
        updateSetting(name, checkbox.checked, true, settings);
      }
      frame.appendChild(checkbox);
    } else if (availableOptions) {
      const dropdown = document.createElement("select");
      dropdown.classList.add("dropdown");
      dropdown.name = name;
      dropdown.onchange = (event) => {
        updateSetting(name, event.target.value, true, settings);
      }

      availableOptions.forEach(function (optionValue) {
        const optionElement = document.createElement("option");
        optionElement.value = optionValue;
        optionElement.innerText = optionValue;
        if (option.SetTo == optionValue) {
          optionElement.selected = "selected";
        }
        dropdown.appendChild(optionElement);
      });
      frame.appendChild(dropdown);
    } else if (option.RunFunction) { // Button option
      const buttonElement = document.createElement("button");
      const textElement = document.createElement("span");
      textElement.classList.add("buttonText");
      textElement.setAttribute("data-lang", langPrefix + option.LanguageKey + settingsItemButtonLangSuffix);
      textElement.innerText = !locales.currentLanguageData && (await getSettingDisplayName(option.LanguageKey + settingsItemButtonLangSuffix) || option.Text) || (locales.unsafeGetElementLanguageData(langPrefix + option.LanguageKey + settingsItemButtonLangSuffix) || option.Text);
      buttonElement.appendChild(textElement);

      const iconElement = document.createElement("img");
      iconElement.loading = "lazy";
      iconElement.src = `img/icons/${option.Icon}`;
      iconElement.classList.add("buttonIcon");
      buttonElement.appendChild(iconElement);
      frame.appendChild(buttonElement);

      if (option.FileInput) {
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "file");
        inputElement.onchange = (event) => {
          option.RunFunction(event);
        }
        buttonElement.onclick = () => {
          inputElement.click();
        }
        frame.appendChild(inputElement);
      } else[
        buttonElement.onclick = () => {
          option.RunFunction();
        }
      ]
    }

    if (!option.RunFunction) {
      updateSetting(name, option.SetTo, false, settings); // Initialize setting
    }

    settingsList.appendChild(frame);
  }
}

locales.updateLanguage(_currentLanguage).then(() => {
  initSettings(); // Build settings after translations are ready
});

window.toggleSettings = settings.toggleSettings;