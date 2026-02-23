/**
 * An app available in the Da Hub.
 * @typedef {Object} App
 * @property {string} Name - The name of the app.
 * @property {string} Id - The unique identifier for the app.
 * @property {string?} Thumbnail - The thumbnail image for the app.
 * @property {string?} Description - A brief description of the app.
 * 
 * @property {string?} Folder - The folder where the app is located.
 * @property {string?} Index - The index file for the app.
 * 
 * @property {Date?} Added - The date the app was added.
 * @property {Date?} Updated - The date the app was last updated.
 * @property {Date?} Fixed - The date the app was last fixed.
 * @property {Boolean?} WIP - Indicates if the app is a work in progress.
 * 
 * @property {boolean?} Mobile - Indicates if the app is mobile-friendly.
 * @property {string?} Notice - Any special notice about the app, displayed before launching.
 * @property {string[]?} Genres - The genres associated with the app.
 * @property {string[]?} Related - Related apps IDs.
 * 
 * @property {boolean?} Hidden - Indicates if the app is hidden from the main list.
 * @property {boolean?} OpenWithCode - Indicates if the app should be opened in a new tab.
 */

/**
 * The list of apps available in the Da Hub.
 * @type {App[]}
 */
const apps = [
  {
    Name: "1v1.LOL",
    Thumbnail: "thumbnail.jpg",
    Genres: ["fps", "shooter", "pvp"],
    Related: ["guns", "guns", "fortnite"],
    Broken: true,
    Hidden: true,
  },
  {
    Name: "10 Minutes Till Dawn",
    Genres: ["fps", "zombie", "shooter"],
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 3, 2025")
  },
  {
    Name: "2048",
    Mobile: true,
    Thumbnail: "thumbnail.png",
  },
  {
    Name: "A Dark Room",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("November 20, 2024")
  },
  {
    Name: "a game inside a game inside a game",
    Thumbnail: "thumbnail.png",
    Added: new Date("Febuary 13, 2025")
  },
  {
    Name: "A Small World Cup",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("June 1, 2025"),
    Mobile: true
  },
  {
    Name: "Angry Birds",
    Folder: "../resources/ruffle",
    Index: "index.html?file=angry-birds-chrome",
    Thumbnail: "thumbnails/angrybirds.png",
    Mobile: true,
    Related: ["rovio", "bad piggies", "flash"],
    Updated: new Date("May 4, 2025")
  },
  {
    Name: "Angry Birds Halloween",
    Folder: "../resources/ruffle",
    Index: "index.html?file=angry-birds-halloween",
    Mobile: true,
    Thumbnail: "thumbnails/angrybirds-halloween.jpg",
    Related: ["rovio", "bad piggies", "flash"],
    Added: new Date("May 4, 2025")
  },
  {
    Name: "Angry Birds Rio",
    Folder: "../resources/ruffle",
    Index: "index.html?file=angry-birds-rio",
    Mobile: true,
    Thumbnail: "thumbnails/angrybirds-rio.png",
    Related: ["rovio", "bad piggies", "flash"],
    Added: new Date("May 4, 2025")
  },
  {
    Name: "Anxiety",
    Thumbnail: "thumbnail.png",
    Added: new Date("November 20, 2024")
  },
  {
    Name: "Aquapark",
    Mobile: true,
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Bad Piggies",
    Mobile: true,
    Thumbnail: "thumbnail.jpg",
    Related: ["rovio", "angry birds", "flash"],
  },
  {
    Name: "Bad Piggies v2.0",
    Description: "This adds on to the content for the first version, with new levels and more.",
    Folder: "../resources/ruffle",
    Index: "index.html?file=bad-piggies-hd-2",
    Mobile: true,
    Thumbnail: "thumbnails/badpiggies.jpg",
    Related: ["rovio", "angry birds", "flash"],
    Added: new Date("May 4, 2025")
  },
  {
    Name: "Basket Random",
    Mobile: true,
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("December 18, 2024"),
  },
  {
    Name: "Basketball Stars",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("September 30, 2024"),
  },
  {
    Name: "Batman (NES)",
    Folder: "../resources/jsnes",
    Index: "nes.html?file=batman",
    Thumbnail: "thumbnails/batman.jpg",
    Added: new Date("December 18, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Bitlife",
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Blackjack",
    Mobile: true,
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Block Blast",
    Added: new Date("April 20, 2025"),
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Block Break",
    Mobile: true,
    Added: new Date("April 5, 2025"),
    Thumbnail: "thumbnail.jpg",
    Related: ["block blast"]
  },
  {
    Name: "Bloons TD 1",
    Folder: "BloonsTD/1/",
    Mobile: true,
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Bloons TD 4",
    Folder: "BloonsTD/4/",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Added: new Date("Febuary 13, 2025")
  },
  {
    Name: "Bloxorz",
    Thumbnail: "thumbnail.jpeg"
  },
  {
    Name: "ButterDog Chat",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Added: new Date("January 22, 2025"),
    Hidden: true,
  },
  {
    Name: "Cartoon Mini Racing",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 18, 2025")
  },
  {
    Name: "Chess",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Added: new Date("September 30, 2024"),
  },
  {
    Name: "Cluster Rush",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("November 18, 2024"),
  },
  {
    Name: "Color Tunnel",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("November 18, 2024"),
  },
  {
    Name: "Cookie Clicker",
    Folder: "CookieClicker",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Updated: new Date("November 5, 2024")
  },
  {
    Name: "Crazy Cattle 3D",
    Thumbnail: "thumbnail.png",
    Added: new Date("April 24, 2025")
  },
  {
    Name: "Crossy Road",
    Folder: "CrossyRoad",
    Mobile: true,
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Cubefield",
    Thumbnail: "thumbnail.png",
    Hidden: true,
  },
  {
    Name: "Cut the Rope",
    Thumbnail: "thumbnail.jpeg",
    Mobile: true,
    Added: new Date("November 20, 2024"),
    Notice: "This app may take a moment or two to load. (it gets stuck at a percent for a little while)"
  },
  {
    Name: "Donkey Kong",
    Folder: "DonkeyKong",
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "DOOM",
    Thumbnail: "thumbnail.jpeg"
  },
  {
    Name: "Double Dragon (NES)",
    Thumbnail: "thumbnails/doubledragon.png",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=Double_dragon",
    Added: new Date("December 20, 2024"),
    Genres: ["classic", "nintendo"],  
  },
  {
    Name: "Drift Boss",
    Thumbnail: "thumbnail.jpg",
    Mobile: true,
    Added: new Date("November 18, 2024"),
  },
  {
    Name: "Drift Hunters",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("January 8, 2025"),
  },
  {
    Name: "Drive Mad",
    Thumbnail: "thumbnail.png",
    Added: new Date("April 24, 2025")
  },
  {
    Name: "Duck Hunt",
    Folder: "DuckHunt",
    Mobile: true,
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Ducklife 1",
    Folder: "Ducklife/1/",
    Thumbnail: "thumbnail.jpeg"
  },
  {
    Name: "Ducklife 2",
    Folder: "Ducklife/2/",
    Thumbnail: "thumbnail.jpeg"
  },
  {
    Name: "Ducklife 3",
    Folder: "Ducklife/3/",
    Thumbnail: "thumbnail.jpeg"
  },
  {
    Name: "Ducklife 4",
    Folder: "Ducklife/4/",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("October 10, 2024"),
  },
  {
    Name: "Duck Tales (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=ducktales",
    Thumbnail: "thumbnails/ducktales.jpg",
    Added: new Date("December 20, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Ecks vs. Sever (GBA)",
    Thumbnail: "thumbnails/evs.jpg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=EcksvsSever.gba",
    Added: new Date("June 6, 2025"),
  },
  {
    Name: "Electric Man 2",
    Folder: "ElectricMan 2",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Fancy Pants 1",
    Folder: "Fancy Pants/1/",
    Thumbnail: "thumbnail.png",
    Added: new Date("November 12, 2024"),
    Fixed: new Date("June 6, 2025")
  },
  {
    Name: "Fire Boy and Water Girl 1",
    Folder: "Fire Boy and Water Girl/1",
    Added: new Date("April 24, 2025"),
    Hidden: true
  },
  {
    Name: "Fire Boy and Water Girl 2",
    Folder: "Fire Boy and Water Girl/2",
    Added: new Date("April 24, 2025"),
    Hidden: true
  },
  {
    Name: "Five Nights at Epstein's",
    Folder: "FNAE/",
    Mobile: true,
    Thumbnail: "thumbnail.jpg",
    Genres: ["horror", "fnaf fangame"],
    Added: new Date("February 23, 2026"),
  },
  {
    Name: "FNAF 1",
    Folder: "FNAF/1/",
    Related: ["port"],
    Mobile: true,
    Thumbnail: "thumbnail.jpeg"
  },
  {
    Name: "FNAF 2",
    Folder: "FNAF/2/",
    Thumbnail: "thumbnail.jpeg",
    Related: ["scratch", "recreation"],
    Notice: "This app take a while to load, please be patient.",
  },
  {
    Name: "FNAF 3",
    Folder: "FNAF/3/",
    Mobile: true,
    Thumbnail: "thumbnail.webp",
    Related: ["scratch", "recreation"],
    Notice: "This app take a while to load, please be patient.",
  },
  {
    Name: "FNAF 4",
    Folder: "FNAF/4/",
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "FNAW",
    Thumbnail: "thumbnail.jpg",
    Mobile: true,
  },
  {
    Name: "Friday Night Funkin'",
    Folder: "Friday Night Funkin",
    Thumbnail: "thumbnail.png",
    Added: new Date("May 3, 2025")
  },
  {
    Name: "Friday the 13th (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=fridaythe13th",
    Thumbnail: "thumbnails/fridaythe13th.jpg",
    Added: new Date("December 18, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Fruit Ninja",
    Folder: "FruitNinja",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Geometry Dash Lite",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("June 1, 2025"),
    Mobile: true
  },
  {
    Name: "Getaway Shootout",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("November 22, 2024")
  },
  {
    Name: "Gimme the Airpod",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("June 6, 2025")
  },
  {
    Name: "Google Dino",
    Folder: "GoogleDino",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Google Snake",
    Folder: "GoogleSnake",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Fixed: new Date("October 10, 2024")
  },
  {
    Name: "Gunblood",
    Added: new Date("April 4, 2025"),
    Thumbnail: "thumbnail.jpg",
    Genres: ["shooter", "pvp"],
    Related: ["ragdoll archers"]
  },
  {
    Name: "Half Life 1",
    Folder: "Half Life/1/",
    Added: new Date("Febuary 12, 2025"),
    Thumbnail: "thumbnail.jpg",
    Notice: "To launch this app, simply press the first \"Start\" button, then \"Launch Xash3D!\"."
  },
  {
    Name: "Happy Wheels",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("April 24, 2025")
  },
  {
    Name: "Slow Roads modded (Hell Roads)",
    Folder: "Hell Roads/",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("October 15, 2024")
  },
  {
    Name: "Hole.io",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("January 22, 2025"),
  },
  {
    Name: "House of Horers Simulator 🥶",
    Folder: "House of Horers Simulator",
    Thumbnail: "thumbnail.png",
    Related: ["locked", "unavailable"]
  },
  {
    Name: "Hunger Games",
    Thumbnail: "thumbnail.jpeg",
    Mobile: true,
    Added: new Date("January 8, 2025"),
  },
  {
    Name: "Idle Breakout",
    Thumbnail: "thumbnail.png",
    Added: new Date("October 15, 2024")
  },
  {
    Name: "Idle Dice",
    Thumbnail: "thumbnail.png",
    Added: new Date("January 8, 2025")
  },
  {
    Name: "Impossible Quiz",
    Mobile: true,
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Jacksmith",
    Mobile: true,
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Jetpack Joyride",
    Thumbnail: "splash.jpg",
    Mobile: true,
    Added: new Date("January 22, 2025")
  },
  {
    Name: "Johnny Upgrade",
    Added: new Date("April 5, 2025"),
    Thumbnail: "thumbnail.jpg",
    Genres: ["platformer"],
  },
  {
    Name: "Learn 2 Fly",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
  },
  {
    Name: "Learn To Fly 3",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("January 22, 2025"),
    Genres: ["flash"],
  },
  {
    Name: "Little Alchemy 2",
    Folder: "Little Alchemy/2",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 3, 2025")
  },
  {
    Name: "Madalin Stunt Cars 2",
    Folder: "Madalin Stunt Cars/2/",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("November 5, 2024"),
    Fixed: new Date("June 6, 2025"),
    Genres: ["driving", "car", "open world"]
  },
  {
    Name: "Madalin Stunt Cars Multiplayer",
    Folder: "Madalin Stunt Cars/Multiplayer/",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("November 5, 2024"),
    Notice: "Despite multiplayer being in this app's name, multiplayer doesn't currently function. Sorry bro.",
    Genres: ["driving", "car", "open world"]
  },
  {
    Name: "Mario Kart DS",
    Hidden: true,
    Genres: ["driving", "car", "racing", "race"]
  },
  {
    Name: "Masked Forces",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 18, 2025")
  },
  {
    Name: "MegaMan 2 (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=megaman2",
    Thumbnail: "thumbnails/MegaMan 2.jpg",
    Added: new Date("December 18, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Minecraft 1.8",
    Folder: "Minecraft/1.8.8",
    Thumbnail: "thumbnail.png",
    Notice: "Opening in another window...",
    Genres: ["open world"],
    Updated: new Date("January 15, 2025"),
    OpenWithCode: true
  },
  {
    Name: "Minecraft 1.12",
    Folder: "Minecraft/1.12",
    Thumbnail: "thumbnail.png",
    Notice: "Opening in another window...",
    Genres: ["open world"],
    Added: new Date("March 10, 2025"),
    OpenWithCode: true
  },
  {
    Name: "Minesweeper",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Moomoo.io Sandbox",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("January 22, 2025"),
    Hidden: true
  },
  {
    Name: "MotoX3M",
    Thumbnail: "thumbnail.jpg",
    Genres: ["driving", "bike", "racing", "race"]
  },
  {
    Name: "MotoX3M 2",
    Thumbnail: "thumbnail.jpg",
    Genres: ["driving", "bike", "racing", "race"]
  },
  {
    Name: "MotoX3M Pool Party",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("April 24, 2025"),
  },
  {
    Name: "MotoX3M Winter",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("June 1, 2025")
  },
  {
    Name: "n-gon",
    Thumbnail: "thumbnail.png",
    Added: new Date("December 16, 2024")
  },
  {
    Name: "OpenTTD",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 18, 2025")
  },
  {
    Name: "Pachinkremental",
    Thumbnail: "thumbnail.webp",
    Added: new Date("June 1, 2025")
  },
  {
    Name: "Pacman",
    Thumbnail: "thumbnail.jpg",
    Genres: ["classic"]
  },
  {
    Name: "Papa's Burgeria",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
    Added: new Date("October 15, 2024")
  },
  {
    Name: "Papa's Freezeria",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["flash"],
    Added: new Date("October 15, 2024")
  },
  {
    Name: "Papa's Pancakeria",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["flash"],
    Added: new Date("October 15, 2024")
  },
  {
    Name: "Papa's Pizzeria",
    Folder: "PapaPizza",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
  },
  {
    Name: "Paper.io 2",
    Folder: "Paper.io/2/",
    Mobile: true,
    Thumbnail: "thumbnail.jpg",
    Added: new Date("January 22, 2025")
  },
  {
    Name: "Plants Vs. Zombies",
    Folder: "Plants vs Zombies",
    Thumbnail: "thumbnail.jpeg",
    Mobile: true,
    Added: new Date("January 22, 2025"),
    Fixed: new Date("April 24, 2025"),
    Related: ["pvz"],
  },
  {
    Name: "Pokemon Green (GBA)",
    Thumbnail: "thumbnails/pgreen.jpg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=pokemongreen.gba",
    Added: new Date("June 6, 2025"),
  },
  {
    Name: "Pokemon Ruby (GBA)",
    Thumbnail: "thumbnails/pruby.jpeg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=pokemonruby.gba",
    Added: new Date("June 6, 2025"),
  },
  {
    Name: "Pokemon Sapphire (GBA)",
    Thumbnail: "thumbnails/psapphire.jpeg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=pokemonsapphire.gba",
    Added: new Date("June 6, 2025"),
  },
  {
    Name: "Punchout (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=punchout",
    Thumbnail: "thumbnails/punchout.jpg",
    Added: new Date("January 6, 2025"),
    Genres: ["classic", "nintendo"],
    Broken: true,
    Hidden: true,
  },
  {
    Name: "Punchout 2 (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=punchouttwo",
    Thumbnail: "thumbnails/punchout 2.jpg",
    Added: new Date("January 6, 2025"),
    Genres: ["classic", "nintendo"],
    Broken: true,
    Hidden: true,
  },
  {
    Name: "Polytrack",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("January 8, 2025"),
    Genres: ["driving", "car", "racing", "race"],
    Related: ["trackmania"],
  },
  {
    Name: "Pong",
    Thumbnail: "thumbnail.png",
    Genres: ["classic"],
  },
  {
    Name: "Portal (Flash)",
    Folder: "Portal WCS2/",
    Thumbnail: "thumbnail.png",
    Added: new Date("November 1, 2024"),
    Genres: ["remake", "flash"],
    Related: ["valve", "half life"]
  },
  {
    Name: "q1k3",
    Thumbnail: "thumbnail.png",
    Added: new Date("Febuary 13, 2025"),
    Genres: ["fps", "shooter"],
  },
  {
    Name: "Ragdoll Archers",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("Febuary 13, 2025")
  },
  {
    Name: "Retro Bowl",
    Folder: "RetroBowl",
    Thumbnail: "thumbnail.png",
  },
  {
    Name: "Retro Bowl College",
    Folder: "RetroBowl/College/",
    Thumbnail: "thumbnail.png",
    Added: new Date("November 18, 2024")
  },
  {
    Name: "Riddle School 1",
    Folder: "RiddleSchool/1/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
  },
  {
    Name: "Riddle School 2",
    Folder: "RiddleSchool/2/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
  },
  {
    Name: "Riddle School 3",
    Folder: "RiddleSchool/3/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
  },
  {
    Name: "Riddle School 4",
    Folder: "../resources/ruffle",
    Index: "index.html?file=riddleschool4",
    Thumbnail: "thumbnails/riddleschool4.jpg",
    Related: ["flash"],
    Added: new Date("June 1, 2025")
  },
    {
    Name: "Riddle School 5",
    Folder: "../resources/ruffle",
    Index: "index.html?file=riddleschool5",
    Thumbnail: "thumbnails/riddleschool5.jpg",
    Related: ["flash"],
    Added: new Date("June 1, 2025")
  },
  {
    Name: "Robux Generator Clicker",
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Run 1",
    Folder: "Run/1/",
    Thumbnail: "thumbnail.png",
    Genres: ["flash"],
  },
  {
    Name: "Run 2",
    Folder: "Run/2/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
  },
  {
    Name: "Run 3",
    Folder: "Run/3/",
    Thumbnail: "thumbnail.png",
    Genres: ["flash"],
  },
  {
    Name: "Sand Tetris",
    Added: new Date("April 20, 2025"),
    Thumbnail: "thumbnail.jpg",
  },
  {
    Name: "Shell Shockers",
    Added: new Date("Febuary 13, 2025"),
    Hidden: true
  },
  {
    Name: "Skiing Fred",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 18, 2025")
  },
  {
    Name: "Sling Drift",
    Thumbnail: "thumbnail.jpg",
    Genres: ["driving"],
    Hidden: true,
    Added: new Date("December 18, 2024")
  },
  {
    Name: "Rooftop Snipers",
    Folder: "Rooftop Snipers/",
    Genres: ["multiplayer", "arcade"],
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("October 2, 2024")
  },
  {
    Name: "Rooftop Snipers 2",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("June 1, 2025")
  },
  {
    Name: "Slope",
    Folder: "Slope/1/",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Slope Ass",
    Folder: "Slope/Ass/",
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Slow Roads",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("April 24, 2025")
  },
  {
    Name: "Soccer Random",
    Thumbnail: "thumbnail.webp",
    Added: new Date("December 18, 2024"),
  },
  {
    Name: "Solitare",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("November 18, 2024")
  },
  {
    Name: "Soobway Surfers",
    Folder: "SoobwaySurfers",
    Thumbnail: "thumbnail.png",
    Genres: ["remake"],
    Related: ["subway surfers"]
  },
  {
    Name: "Super Mario 63",
    Folder: "SuperMario 63/",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Super Mario 64",
    Folder: "SuperMario 64/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["classic"]
  },
  {
    Name: "Super Mario Advance 2 (GBA)",
    Thumbnail: "thumbnails/sma2.jpg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=supermarioadvance2.gba",
    Added: new Date("June 6, 2025"),
  },
  {
    Name: "Super Mario Bros. 1 (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=supermariobros",
    Thumbnail: "thumbnails/smb1.png",
    Added: new Date("January 6, 2025"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Super Mario Bros. 2 (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=supermariobros2",
    Thumbnail: "thumbnails/smb2.jpg",
    Added: new Date("January 6, 2025"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Super Mario Bros. 3 (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=supermariobros3",
    Thumbnail: "thumbnails/smb3.jpg",
    Added: new Date("January 6, 2025"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Stickman Hook",
    Folder: "StickmanHook/",
    Thumbnail: "thumbnail.png",
    Fixed: new Date("October 2, 2024")
  },
  {
    Name: "Subway Surfers",
    Thumbnail: "thumbnail.png",
    Added: new Date("October 2, 2024")
  },
  {
    Name: "Tanuki Sunset",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("Febuary 13, 2025")
  },
  {
    Name: "Temple Run 1",
    Folder: "Temple Run/1/",
    Added: new Date("April 5, 2025"),
    Hidden: true
  },
  {
    Name: "Temple Run 2",
    Folder: "Temple Run/2/",
    Added: new Date("April 5, 2025"),
    Hidden: true
  },
  {
    Name: "Tetris",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "There is no game",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("April 24, 2025")
  },
  {
    Name: "Tomb of the Mask",
    Thumbnail: "thumbnail.png",
    Added: new Date("January 8, 2025"),
  },
  {
    Name: "The Legend of Zelda (NES)",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=zelda",
    Thumbnail: "thumbnails/zelda.jpg",
    Added: new Date("December 18, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Ultimate Flash Sonic",
    Thumbnail: "thumbnail.jpg",
    Genres: ["remake"]
  },
  {
    Name: "Vex 3",
    Folder: "Vex/3/",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "We Become What We Behold",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("June 1, 2025")
  },
  {
    Name: "Wolfenstein 3D",
    Folder: "wolfen/",
    Thumbnail: "thumbnail.png"
  },
  {
    Name: "Wordle",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "World's Hardest Game 1",
    Folder: "Worlds Hardest Game/1/",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "World's Hardest Game 2",
    Folder: "Worlds Hardest Game/2/",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "yohoho.io",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Yorg.io 3",
    Folder: "Yorg.io/3/",
    Added: new Date("Febuary 13, 2025"),
    Hidden: true
  },

  // Begin Emulators
  {
    Name: "Game Boy Advance Emulator",
    Folder: "GBA-gh-pages/",
    Thumbnail: "Binaries/gb.ico",
    Section: "emulators"
  },
];

function getAppById(id) {
  for (let i = 0; i < apps.length; i++) {
    if (apps[i].Id === id) {
      return apps[i];
    }
  }
  return null;
}

apps.sort(function (a, b) {
  const name_a = a.Name.toLowerCase();
  const name_b = b.Name.toLowerCase();
  if (name_a < name_b) {
    return -1;
  }
  if (name_a > name_b) {
    return 1;
  }
  return 0;
});