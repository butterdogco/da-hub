let locales = {}; // Global object to hold language data and methods

locales.currentLanguage = localStorage.getItem("settings-Language") || "English";
locales.languages = {
    Afrikaans: "af",
    ButterDog: "butterdog",
    English: "en",
    Español: "es",
    Emoji: "emoji",
};
locales.currentLanguageData = null;

locales.defaultLang = "en";

locales.getElementLanguageData = async function(name) {
    while (locales.currentLanguageData == null) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    return locales.currentLanguageData[name] || null;
}

locales.unsafeGetElementLanguageData = function(name) {
    return locales.currentLanguageData[name] || null;
}

locales.updateLanguageElement = async function(element) {
    const key = element.getAttribute("data-lang");
    const titleKey = element.getAttribute("data-lang-title");
    const placeholderKey = element.getAttribute("data-lang-placeholder");
    if (key) {
        const text = await locales.getElementLanguageData(key);
        if (text) {
            element.innerText = text;
        }
    }
    if (titleKey) {
        const text = await locales.getElementLanguageData(titleKey);
        if (text) {
            element.setAttribute("title", text);
        }
    }
    if (placeholderKey) {
        const text = await locales.getElementLanguageData(placeholderKey);
        if (text) {
            element.setAttribute("placeholder", text);
        }
    }
}

locales.updateLanguageElements = async function () {
    const elements = document.querySelectorAll("[data-lang], [data-lang-title], [data-lang-placeholder]");
    elements.forEach(async (element) => {
        await locales.updateLanguageElement(element);
    });
    console.log("Successfully updated page language");
}

let _canTryDefaultLang = false;
// let _defaultLangLoadAttempts = 5;
locales.updateLanguage = async function(lang = locales.defaultLang) {
    // 
    const langShort = locales.languages[lang] || lang;
    
    const data = language_data[langShort];
    if (!data && _canTryDefaultLang == false) {
        console.error(`Language data for ${langShort} not found.`);
        notify({Text: "Error loading the new language data, defaulting to English.", ShowTime: 4000});
        _canTryDefaultLang = true;
        locales.updateLanguage(locales.defaultLang);
    } else {
        console.log("Successfully loaded language data.");
        _canTryDefaultLang = true;
        locales.currentLanguageData = data;
        locales.updateLanguageElements();
    }
    
    // Fetch the language JSON file
    // const langJSON = `locales/${langShort}.json`;
    // return fetch(langJSON)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log("Language data loaded");
    //         locales.currentLanguageData = data;
    //         locales.updateLanguageElements();
    //     })
    //     .catch(error => {
    //         console.error('Error loading language file:', error);
    //         try {
    //             if (_defaultLangLoadAttempts > 0) {
    //                 _defaultLangLoadAttempts -= 1;
    //                 notify({Text: "Error loading the language file. Retrying with English (Attempt " + (5 - _defaultLangLoadAttempts) + " / 5)", ShowTime: 4000});
    //                 setTimeout(locales.updateLanguage, 1000, locales.defaultLang);
    //             } else {
    //                 notify({Text: "Failed to load language file, max attempts reached. (Check your internet connection?)", ShowTime: 8000});
    //             }
    //         } catch (err) {}
    //     });
}

locales.init = () => {
    const _userLang = navigator.language.toLowerCase().split('-')[0];
    const _index = Object.values(locales.languages).indexOf(_userLang);

    if (_index !== -1) {
        const keyAtIndex = Object.keys(locales.languages)[_index];
        if (locales.currentLanguage !== keyAtIndex) {
            locales.currentLanguage = keyAtIndex;
        }
    }

    window.getElementLanguageData = locales.getElementLanguageData;
}

locales.init();