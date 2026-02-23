let themeSystem = {};

// Private scope
(function () {
  const themes = [
    {
      name: 'Blue', fileName: 'blue.css', default: true
    },
    {
      name: 'Red', fileName: 'red.css'
    },
    {
      name: 'Rainbow', fileName: 'rainbow.css'
    },
    {
      name: 'ButterDogCo', fileName: 'butterdogco.css'
    },
    {
      name: 'Spooky Hacker', fileName: 'spooky hacker.css'
    },
  ];
  const themeSaveKey = 'activeTheme';
  let themeSheet = document.getElementById('themeStylesheet');

  if (!themeSheet) {
    themeSheet = document.createElement('link');
    themeSheet.rel = 'stylesheet';
    themeSheet.id = 'themeStylesheet';
    document.head.appendChild(themeSheet);
  }

  function updateTheme(newTheme = "Blue") {
    if (typeof newTheme === 'string') {
      newTheme = themes.find(t => t.name.toLowerCase() === newTheme.toLowerCase());
    }

    if (newTheme && newTheme.fileName) {
      if (newTheme.default) {
        themeSheet.removeAttribute('href');
      } else {
        themeSheet.href = `css/themes/${newTheme.fileName}`;
      }
      
      localStorage.setItem(themeSaveKey, newTheme.name);
    }
  }

  // Initialize theme on load
  const savedThemeName = localStorage.getItem(themeSaveKey);
  const savedTheme = themes.find(t => t.name === savedThemeName) || themes.find(t => t.default) || themes[0];
  updateTheme(savedTheme);
  
  // Manual export to avoid modules
  themeSystem.themes = themes;
  themeSystem.updateTheme = updateTheme;
})();