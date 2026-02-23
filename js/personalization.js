// Local personalization logic for the Da Hub

let personalization = {};

(function () {
  const playedAppsKey = "_dh-played-apps";
  const experimentKey = "_dh-personalization-experiment";
  const maxPlayHistory = 50;
  const maxRecentlyPlayed = 5;
  const maxAppRecommendations = 4;
  const maxDaysSinceLastPlayedToRecommend = 30;
  const minPlayedAppsForRecommendations = 1;
  const secret = {
    appId: "tetris", minReplays: 10
  };
  let playedApps = [];
  const msPerDay = 24 * 60 * 60 * 1000;

  function shuffleArray(source) {
    const result = [...source];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function getRecencyMultiplier(lastPlayed) {
    if (!lastPlayed) {
      return 1;
    }
    const daysSince = (Date.now() - lastPlayed) / msPerDay;
    const normalized = Math.min(daysSince, maxDaysSinceLastPlayedToRecommend) / maxDaysSinceLastPlayedToRecommend;
    return Math.max(0.25, 1 - normalized);
  }

  function onAppPlayed(app) {
    const now = Date.now();
    const existingEntry = playedApps.find(pa => pa.id === app.Id);
    if (existingEntry) {
      existingEntry.lastPlayed = now;
      existingEntry.playCount += 1;
    } else {
      playedApps.push({
        id: app.Id,
        lastPlayed: now,
        playCount: 1
      });
    }

    // Keep only the most recent maxPlayHistory entries
    playedApps.sort((a, b) => b.lastPlayed - a.lastPlayed);
    if (playedApps.length > maxPlayHistory) {
      playedApps = playedApps.slice(0, maxPlayHistory);
    }

    saveData();
  }

  function getPlayedCount() {
    return playedApps.length;
  }

  function getMostPlayed() {
    return [...playedApps]
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, 5)
      .map(entry => entry.id);
  }

  function getRecentlyPlayedApps() {
    return playedApps.slice(-maxRecentlyPlayed).reverse();
  }

  function getAppPlayedEntry(appId) {
    return playedApps.find(entry => entry.id === appId);
  }

  // Finds unplayed apps with most matching genres and related to most played apps
  function getAppRecommendations() {
    const playedCount = getPlayedCount();
    const playedMap = new Map(playedApps.map(entry => [entry.id, entry]));
    const playedSet = new Set(playedMap.keys());

    if (playedCount <= minPlayedAppsForRecommendations) {
      const fallbackCandidates = shuffleArray(apps.filter(app => app && !app.Hidden && !app.Broken));
      return fallbackCandidates.slice(0, maxAppRecommendations);
    }

    const mostPlayed = getMostPlayed();
    const genreCounts = {};
    const relatedApps = new Set();
    const relatedAppWeights = {};

    const secretPlayed = playedMap.get(secret.appId);
    if (secretPlayed && secretPlayed.playCount >= secret.minReplays) {
      const secretApp = getAppById(secret.appId);
      if (secretApp) {
        return [secretApp];
      }
    }

    mostPlayed.forEach(appId => {
      const app = getAppById(appId);
      if (!app) {
        return;
      }
      const entry = playedMap.get(appId);
      const multiplier = getRecencyMultiplier(entry?.lastPlayed);
      const weight = Math.max(1, (entry?.playCount || 1) * multiplier);

      if (app.Genres) {
        app.Genres.forEach(genre => {
          genreCounts[genre] = (genreCounts[genre] || 0) + weight;
        });
      }

      if (app.Related) {
        app.Related.forEach(relAppId => {
          relatedApps.add(relAppId);
          relatedAppWeights[relAppId] = Math.max(relatedAppWeights[relAppId] || 0, weight);
        });
      }
    });

    const candidateApps = apps.filter(app =>
      app && !playedSet.has(app.Id) && !app.Hidden && !app.Broken
    );

    const appScores = {};

    candidateApps.forEach(app => {
      let score = 0;
      const genres = app.Genres || [];
      const matchedGenres = genres.reduce((count, genre) => {
        if (genreCounts[genre]) {
          score += genreCounts[genre];
          return count + 1;
        }
        return count;
      }, 0);

      score += matchedGenres * 0.2;

      if (relatedApps.has(app.Id)) {
        const relatedBoost = relatedAppWeights[app.Id] || 0;
        score += 5 + Math.min(relatedBoost, 4);
      }

      score += Math.random() * 0.4;

      if (score > 0) {
        appScores[app.Id] = score;
      }
    });

    let recommendedApps = Object.entries(appScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxAppRecommendations)
      .map(entry => getAppById(entry[0]))
      .filter(Boolean);

    if (recommendedApps.length < maxAppRecommendations) {
      const recommendedIds = new Set(recommendedApps.map(app => app.Id));
      const fallbackCandidates = shuffleArray(candidateApps.filter(app => !recommendedIds.has(app.Id)));
      const remainingSlots = maxAppRecommendations - recommendedApps.length;
      recommendedApps = recommendedApps.concat(fallbackCandidates.slice(0, remainingSlots));
    }

    return recommendedApps;
  }

  function saveData() {
    localStorage.setItem(playedAppsKey, JSON.stringify(playedApps));
  }

  function loadData() {
    const savedPlayedApps = localStorage.getItem(playedAppsKey);
    if (savedPlayedApps) {
      try {
        const parsed = JSON.parse(savedPlayedApps);
        if (Array.isArray(parsed)) {
          playedApps = parsed;
        }
      } catch (e) {
        console.error('Failed to parse played apps from localStorage:', e);
      }
    }
  }

  if (localStorage.getItem(experimentKey) !== null) {
    localStorage.removeItem(experimentKey);
  }

  // Get saved played apps from localStorage
  loadData();

  personalization.onAppPlayed = onAppPlayed;
  personalization.getRecentlyPlayedApps = getRecentlyPlayedApps;
  personalization.getAppPlayedEntry = getAppPlayedEntry;
  personalization.getAppRecommendations = getAppRecommendations;
})();