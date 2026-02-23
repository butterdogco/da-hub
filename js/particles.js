let particles = {};

(function () {
  const maxParticles = 15;
  const particleImage = "img/snow.png";
  const storageKey = "settings-SnowParticles";

  let particlesOnScreen = 0;
  let particlesEnabled = false;
  let savedOption = null;
  let particlesContainer = null;
  let particleIntervalId = null; // Store the interval ID so we can clear it

  function initParticles() {
    particlesContainer = document.createElement("div");
    particlesContainer.classList.add("particlesContainer");
    document.body.appendChild(particlesContainer);
  }

  async function createParticles() {
    for (let i = 0; i < Math.round(Math.random() * 5); i++) {
      if (particlesOnScreen + 1 <= maxParticles) {
        particlesOnScreen += 1;
        const img = document.createElement("img");
        const randomSize = Math.random() * (50 - 20) + 20;
        const animTime = Math.random() * (10 - 3) + 3;

        img.classList.add("particle");
        img.style = `
        width: ${randomSize}px;
        height: ${randomSize}px;
        top: -${randomSize}px;
        left: ${Math.floor(Math.random() * (screen.availWidth + 100))}px;
        animation: particleAnimation ${animTime}s linear;
        `;
        img.src = particleImage;
        img.setAttribute("lazy", "true");
        particlesContainer.appendChild(img);

        setTimeout(() => {
          img.remove();
          particlesOnScreen -= 1;
        }, animTime * 1000);
      }
    }
  }

  function saveParticlesSetting() {
    savedOption = particlesEnabled;
    localStorage.setItem(storageKey, particlesEnabled);
  }

  particles.setParticlesEnabled = (enabled, save = false) => {
    // Do not enable if already enabled or saved option is false (and not overridden)
    if (enabled === particlesEnabled) return;
    if (enabled && savedOption === false && !save) return;

    particlesEnabled = enabled;
    if (particlesEnabled) {
      // Clear any existing interval first to prevent multiple intervals running
      if (particleIntervalId !== null) {
        clearInterval(particleIntervalId);
      }
      if (!particlesContainer) initParticles();
      particleIntervalId = setInterval(createParticles, 150);
    } else {
      if (particleIntervalId !== null) {
        clearInterval(particleIntervalId);
        particleIntervalId = null;
      }
    }

    if (save) saveParticlesSetting();
  }

  // Load saved setting
  savedOption = localStorage.getItem(storageKey);
  if (savedOption == null) savedOption = true;
  else savedOption = savedOption == "true" && true || false;

  if (savedOption === true) particles.setParticlesEnabled(savedOption, true);
})();