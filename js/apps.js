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
    Name: "10 Minutes Till Dawn",
    Id: "10mtd",
    Genres: ["fps", "zombie", "shooter"],
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 3, 2025")
  },
  {
    Name: "1v1.LOL",
    Id: "1v1lol",
    Folder: "1v1LOL",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("January 20, 2026"),
    Genres: ["shooter", "pvp", "building", "multiplayer"]
  },
  {
    Name: "2048",
    Id: "2048",
    Mobile: true,
    Thumbnail: "thumbnail.jpg",
    Added: new Date("November 15, 2021"),
    Genres: ["puzzle", "numbers", "math"]
  },
  {
    Name: "A Dark Room",
    Id: "adarkroom",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("November 20, 2024"),
    Genres: ["text based", "adventure"]
  },
  {
    Name: "a game inside a game inside a game",
    Id: "agiagiag",
    Thumbnail: "thumbnail.png",
    Added: new Date("February 13, 2025"),
    Genres: ["adventure", "meta", "puzzle"]
  },
  {
    Name: "A Small World Cup",
    Id: "aswc",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("June 1, 2025"),
    Genres: ["soccer", "football", "sports"],
    Mobile: true
  },
  {
    Name: "Angry Birds",
    Id: "ab",
    Folder: "../resources/ruffle",
    Index: "index.html?file=angry-birds-chrome",
    Thumbnail: "thumbnails/angrybirds.jpg",
    Mobile: true,
    Genres: ["physics", "puzzle"],
    Related: ["rovio", "bad piggies", "flash"],
    Updated: new Date("May 4, 2025")
  },
  {
    Name: "Angry Birds Halloween",
    Id: "abh",
    Folder: "../resources/ruffle",
    Index: "index.html?file=angry-birds-halloween",
    Mobile: true,
    Thumbnail: "thumbnails/angrybirds-halloween.jpg",
    Genres: ["physics", "puzzle"],
    Related: ["rovio", "bad piggies", "flash"],
    Added: new Date("May 4, 2025")
  },
  {
    Name: "Angry Birds Rio",
    Id: "abr",
    Folder: "../resources/ruffle",
    Index: "index.html?file=angry-birds-rio",
    Mobile: true,
    Thumbnail: "thumbnails/angrybirds-rio.jpg",
    Genres: ["physics", "puzzle"],
    Related: ["rovio", "bad piggies", "flash"],
    Added: new Date("May 4, 2025")
  },
  {
    Name: "Anxiety",
    Id: "anxiety",
    Thumbnail: "thumbnail.png",
    Added: new Date("November 20, 2024"),
    Genres: ["horror", "adventure"]
  },
  {
    Name: "Aquapark",
    Id: "aquapark",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Added: new Date("March 23, 2023"),
    Genres: ["water slide", "arcade"],
  },
  {
    Name: "Awesome Tanks 2",
    Folder: "Awesome Tanks/2",
    Id: "awesometanks2",
    Thumbnail: "thumbnail.jpg",
    Mobile: true,
    Genres: ["tanks", "shooter", "multiplayer"],
    Added: new Date("December 19, 2025")
  },
  {
    Name: "Bad Piggies",
    Id: "bp",
    Folder: "../resources/ruffle",
    Index: "index.html?file=badpiggies",
    Thumbnail: "thumbnails/badpiggies-1.jpg",
    Genres: ["physics", "puzzle"],
    Related: ["rovio", "angry birds", "flash"],
    Mobile: true,
  },
  {
    Name: "Bad Piggies v2.0",
    Id: "bpv2",
    Description: "This adds on to the content for the first version, with new levels and more.",
    Folder: "../resources/ruffle",
    Index: "index.html?file=bad-piggies-hd-2",
    Mobile: true,
    Thumbnail: "thumbnails/badpiggies-2.jpg",
    Genres: ["physics", "puzzle"],
    Related: ["rovio", "angry birds", "flash"],
    Added: new Date("May 4, 2025")
  },
  {
    Name: "Basket Random",
    Id: "br",
    Mobile: true,
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("December 18, 2024"),
    Genres: ["sports", "basketball"],
    Related: ["basketball stars"]
  },
  {
    Name: "Basketball Stars",
    Id: "bs",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("September 30, 2024"),
    Genres: ["sports", "basketball"],
    Related: ["basket random"]
  },
  {
    Name: "Batman (NES)",
    Id: "bn",
    Folder: "../resources/jsnes",
    Index: "nes.html?file=batman",
    Thumbnail: "thumbnails/batman.jpg",
    Added: new Date("December 18, 2024"),
    Genres: ["classic", "nintendo"],
    Related: ["dc comics"]
  },
  {
    Name: "Bitlife",
    Id: "bitlife",
    Thumbnail: "thumbnail.png",
    Mobile: true,
    Added: new Date("May 16, 2023"),
    Genres: ["simulation", "life", "text based", "life"]
  },
  {
    Name: "Blackjack",
    Id: "blackjack",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Added: new Date("October 12, 2021"),
    Genres: ["cards", "casino", "gambling"]
  },
  {
    Name: "Block Blast",
    Id: "blockblast",
    Added: new Date("April 20, 2025"),
    Thumbnail: "thumbnail.jpg",
    Genres: ["puzzle", "blocks", "match 3", "casual"],
    Related: ["block break"]
  },
  {
    Name: "Block Break",
    Id: "blockbreak",
    Mobile: true,
    Added: new Date("April 5, 2025"),
    Thumbnail: "thumbnail.jpg",
    Genres: ["puzzle", "blocks", "match 3", "casual"],
    Related: ["block blast"],
  },
  {
    Name: "Bloons TD 1",
    Id: "btd1",
    Folder: "BloonsTD/1/",
    Mobile: true,
    Thumbnail: "thumbnail.jpg",
    Genres: ["tower defense", "strategy"],
    Related: ["btd4", "btd5"]
  },
  {
    Name: "Bloons TD 4",
    Id: "btd4",
    Folder: "BloonsTD/4/",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Added: new Date("February 13, 2025"),
    Genres: ["tower defense", "strategy"],
    Related: ["btd1", "btd5"]
  },
  {
    Name: "Bloxorz",
    Id: "bloxorz",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["puzzle", "blocks", "physics"]
  },
  {
    Name: "Buckshot Roulette",
    Id: "buckshot",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("December 19, 2025"),
    Genres: ["shooter", "pvp", "multiplayer"]
  },
  {
    Name: "Cartoon Mini Racing",
    Id: "cmr",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 18, 2025"),
    Genres: ["driving", "racing", "cartoon"]
  },
  {
    Name: "Chess",
    Id: "chess",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Added: new Date("September 30, 2024"),
    Genres: ["board game", "strategy", "classic"]
  },
  {
    Name: "Cluster Rush",
    Id: "clusterrush",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("November 18, 2024"),
    Genres: ["arcade", "action"]
  },
  {
    Name: "Color Tunnel",
    Id: "colortunnel",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("November 18, 2024"),
    Genres: ["arcade", "3d"]
  },
  {
    Name: "Cookie Clicker",
    Id: "cookieclicker",
    Folder: "CookieClicker",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Updated: new Date("November 5, 2024"),
    Genres: ["clicker", "incremental"]
  },
  {
    Name: "Crazy Cattle 3D",
    Id: "cc3d",
    Thumbnail: "thumbnail.png",
    Added: new Date("April 24, 2025"),
    Genres: ["driving", "racing"]
  },
  {
    Name: "Crossy Road",
    Id: "crossyroad",
    Folder: "CrossyRoad",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Added: new Date("May 16, 2023"),
    Genres: ["arcade", "action", "3d"]
  },
  {
    Name: "Cut the Rope",
    Id: "ctr",
    Thumbnail: "thumbnail.jpeg",
    Mobile: true,
    Added: new Date("November 20, 2024"),
    Genres: ["puzzle", "physics"]
  },
  {
    Name: "Donkey Kong",
    Id: "dk",
    Folder: "DonkeyKong",
    Thumbnail: "thumbnail.png",
    Genres: ["classic", "arcade"],
    Related: ["nintendo", "mario"]
  },
  {
    Name: "DOOM",
    Id: "doom",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["fps", "shooter", "horror", "zombie"],
  },
  {
    Name: "Double Dragon (NES)",
    Id: "ddnes",
    Thumbnail: "thumbnails/doubledragon.png",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=Double_dragon",
    Added: new Date("December 20, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Drift Boss",
    Id: "driftboss",
    Thumbnail: "thumbnail.jpg",
    Mobile: true,
    Added: new Date("November 18, 2024"),
  },
  {
    Name: "Drift Hunters",
    Id: "drifthunters",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("January 8, 2025"),
  },
  {
    Name: "Drive Mad",
    Id: "drivemad",
    Thumbnail: "thumbnail.png",
    Added: new Date("April 24, 2025")
  },
  {
    Name: "Duck Hunt",
    Id: "duckhunt",
    Folder: "DuckHunt",
    Mobile: true,
    Thumbnail: "thumbnail.jpg",
    Genres: ["classic", "nintendo", "shooter"],
  },
  {
    Name: "Ducklife 1",
    Id: "dl1",
    Folder: "Ducklife/1/",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["flash", "rpg", "adventure"]
  },
  {
    Name: "Ducklife 2",
    Id: "dl2",
    Folder: "Ducklife/2/",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["flash", "rpg", "adventure"]
  },
  {
    Name: "Ducklife 3",
    Id: "dl3",
    Folder: "Ducklife/3/",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["flash", "rpg", "adventure"]
  },
  {
    Name: "Ducklife 4",
    Id: "dl4",
    Folder: "Ducklife/4/",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("October 10, 2024"),
    Genres: ["rpg", "adventure"]
  },
  {
    Name: "Duck Tales (NES)",
    Id: "ducktalesnes",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=ducktales",
    Thumbnail: "thumbnails/ducktales.jpg",
    Added: new Date("December 20, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Ecks vs. Sever (GBA)",
    Id: "evsgba",
    Thumbnail: "thumbnails/evs.jpg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=EcksvsSever.gba",
    Added: new Date("June 6, 2025"),
    Genres: ["action", "nintendo"]
  },
  {
    Name: "Electric Man 2",
    Id: "em2",
    Folder: "ElectricMan 2",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash", "fighting", "1v1"]
  },
  {
    Name: "Fancy Pants 1",
    Id: "fp1",
    Folder: "Fancy Pants/1/",
    Thumbnail: "thumbnail.png",
    Added: new Date("November 12, 2024"),
    Fixed: new Date("June 6, 2025"),
    Genres: ["flash", "platformer"]
  },
  {
    Name: "Five Nights at Freddy's 1",
    Id: "fnaf1",
    Folder: "FNAF/1/",
    Related: ["port", "fnaf"],
    Genres: ["scratch", "recreation", "horror", "point and click"],
    Mobile: true,
    Added: new Date("February 26, 2023"),
    Thumbnail: "thumbnail.jpeg"
  },
  {
    Name: "Five Nights at Freddy's 2",
    Id: "fnaf2",
    Folder: "FNAF/2/",
    Thumbnail: "thumbnail.jpeg",
    Related: ["scratch", "recreation", "fnaf"],
    Genres: ["horror", "point and click"],
    Added: new Date("February 18, 2023"),
    Notice: "This app take a while to load, please be patient.",
  },
  {
    Name: "Five Nights at Freddy's 3",
    Id: "fnaf3",
    Folder: "FNAF/3/",
    Mobile: true,
    Thumbnail: "thumbnail.webp",
    Related: ["scratch", "recreation", "fnaf"],
    Genres: ["horror", "point and click"],
    Added: new Date("February 18, 2023"),
    Notice: "This app take a while to load, please be patient.",
  },
  {
    Name: "Five Nights at Freddy's 4",
    Id: "fnaf4",
    Folder: "FNAF/4/",
    Thumbnail: "thumbnail.png",
    Genres: ["horror", "point and click", "fnaf"],
    Related: ["five nights at freddy's"],
  },
  {
    Name: "Five Nights At Winston's",
    Id: "fnaw",
    Folder: "FNAW/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["horror", "point and click"],
    Related: ["five nights at freddy's", "fnaw"],
    Mobile: true,
  },
  {
    Name: "Football Bros",
    Id: "footballbros",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("December 10, 2025"),
    Genres: ["sports", "soccer", "multiplayer"],
  },
  {
    Name: "Friday Night Funkin'",
    Id: "fnf",
    Folder: "Friday Night Funkin",
    Thumbnail: "thumbnail.png",
    Added: new Date("May 3, 2025"),
    Genres: ["rhythm", "music"]
  },
  {
    Name: "Friday the 13th (NES)",
    Id: "ft13nes",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=fridaythe13th",
    Thumbnail: "thumbnails/fridaythe13th.jpg",
    Added: new Date("December 18, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Fruit Ninja",
    Id: "fruitninja",
    Folder: "FruitNinja",
    Thumbnail: "thumbnail.jpg",
    Genres: ["arcade", "action"],
  },
  {
    Name: "Geometry Dash Lite",
    Id: "gdl",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("June 1, 2025"),
    Mobile: true,
    Genres: ["platformer", "rhythm"]
  },
  {
    Name: "Getaway Shootout",
    Id: "getshoot",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("November 22, 2024"),
    Genres: ["pvp", "shooter"],
  },
  {
    Name: "Gimme the Airpod",
    Id: "gimmeairpod",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("June 6, 2025"),
    Genres: ["arcade", "action"]
  },
  {
    Name: "Google Dino",
    Id: "gdino",
    Folder: "GoogleDino",
    Thumbnail: "thumbnail.jpg",
    Genres: ["arcade", "endless runner"],
  },
  {
    Name: "Google Snake",
    Id: "gsnake",
    Folder: "GoogleSnake",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Fixed: new Date("October 10, 2024"),
    Genres: ["arcade", "classic"],
  },
  {
    Name: "Gunblood",
    Id: "gunblood",
    Added: new Date("April 4, 2025"),
    Thumbnail: "thumbnail.jpg",
    Genres: ["shooter", "pvp"],
    Related: ["ragdoll archers"]
  },
  {
    Name: "Gunspin",
    Id: "gunspin",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("February 3, 2026"),
    Genres: ["shooter", "arcade"]
  },
  {
    Name: "Happy Wheels",
    Id: "happywheels",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("April 24, 2025"),
    Genres: ["flash", "ragdoll", "physics", "platformer"],
  },
  {
    Name: "Slow Roads modded (Hell Roads)",
    Id: "srmodded",
    Folder: "Hell Roads/",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("October 15, 2024"),
    Genres: ["driving", "relaxing", "open world"]
  },
  {
    Name: "Hole.io",
    Id: "holeio",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("January 22, 2025"),
    Genres: ["io", "multiplayer", "arcade"],
  },
  {
    Name: "House of Horers Simulator 🥶",
    Id: "hohs",
    Folder: "House of Horers Simulator",
    Thumbnail: "thumbnail.png",
    Genres: ["horror", "adventure", "3d", "spooky", "nolan"],
    Related: ["locked", "unavailable"]
  },
  {
    Name: "Hunger Games",
    Id: "hungergames",
    Thumbnail: "thumbnail.jpeg",
    Mobile: true,
    Added: new Date("January 8, 2025"),
    Genres: ["pvp", "shooter", "battle royale"]
  },
  {
    Name: "Idle Breakout",
    Id: "idlebreakout",
    Thumbnail: "thumbnail.png",
    Added: new Date("October 15, 2024"),
    Genres: ["clicker", "incremental", "breakout"]
  },
  {
    Name: "Idle Dice",
    Id: "idledice",
    Thumbnail: "thumbnail.png",
    Added: new Date("January 8, 2025"),
    Genres: ["clicker", "incremental", "dice"]
  },
  {
    Name: "Impossible Quiz",
    Id: "impquiz",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Genres: ["quiz", "puzzle", "flash"]
  },
  {
    Name: "Jacksmith",
    Id: "jacksmith",
    Mobile: true,
    Thumbnail: "thumbnail.png",
    Genres: ["flash", "adventure", "rpg"]
  },
  {
    Name: "Jetpack Joyride",
    Id: "jpjoyride",
    Thumbnail: "splash.jpg",
    Mobile: true,
    Added: new Date("January 22, 2025"),
    Genres: ["arcade", "action", "endless runner"]
  },
  {
    Name: "Johnny Upgrade",
    Id: "jupgrade",
    Added: new Date("April 5, 2025"),
    Thumbnail: "thumbnail.jpg",
    Genres: ["platformer"],
  },
  {
    Name: "Learn 2 Fly",
    Id: "l2f",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
  },
  {
    Name: "Learn To Fly 3",
    Id: "ltf3",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("January 22, 2025"),
    Genres: ["flash"],
  },
  {
    Name: "Little Alchemy 2",
    Id: "la2",
    Folder: "Little Alchemy/2",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 3, 2025"),
    Genres: ["puzzle", "crafting"]
  },
  {
    Name: "Madalin Stunt Cars 2",
    Id: "msc2",
    Folder: "Madalin Stunt Cars/2/",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("November 5, 2024"),
    Fixed: new Date("June 6, 2025"),
    Genres: ["driving", "car", "open world"]
  },
  {
    Name: "Madalin Stunt Cars Multiplayer",
    Id: "mscm",
    Folder: "Madalin Stunt Cars/Multiplayer/",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("November 5, 2024"),
    Notice: "Despite multiplayer being in this app's name, multiplayer doesn't currently function. Sorry bro.",
    Genres: ["driving", "car", "open world"]
  },
  {
    Name: "Mario Kart DS",
    Id: "mariokartds",
    Hidden: true,
    Genres: ["driving", "car", "racing", "race"]
  },
  {
    Name: "Masked Forces",
    Id: "maskedforces",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 18, 2025")
  },
  {
    Name: "MegaMan 2 (NES)",
    Id: "megaman2nes",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=megaman2",
    Thumbnail: "thumbnails/MegaMan 2.jpg",
    Added: new Date("December 18, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Minecraft 1.8",
    Id: "mc1-8",
    Folder: "Minecraft/1.8.8",
    Thumbnail: "thumbnail.png",
    Genres: ["open world", "sandbox", "crafting", "survival"],
    Updated: new Date("January 15, 2025"),
    Fixed: new Date("September 23, 2025"),
    OpenWithCode: true,
    Notice: "This app needs to be run in a new tab due to technical limitations, sorry for the inconvenience."
  },
  {
    Name: "Minecraft 1.12",
    Id: "mc1-12",
    Folder: "Minecraft/1.12",
    Thumbnail: "thumbnail.png",
    Genres: ["open world", "sandbox", "crafting", "survival"],
    Added: new Date("March 10, 2025"),
    Fixed: new Date("September 23, 2025"),
    OpenWithCode: true,
    Notice: "This app needs to be run in a new tab due to technical limitations, sorry for the inconvenience."
  },
  {
    Name: "Minesweeper",
    Id: "minesweeper",
    Thumbnail: "thumbnail.jpg",
    Genres: ["classic", "puzzle"],
  },
  {
    Name: "Moomoo.io Sandbox",
    Id: "mmiosandbox",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("January 22, 2025"),
    Hidden: true,
    Genres: ["io", "multiplayer", "survival", "sandbox"]
  },
  {
    Name: "MotoX3M",
    Id: "motox3m",
    Thumbnail: "thumbnail.jpg",
    Genres: ["driving", "bike", "racing", "race"]
  },
  {
    Name: "MotoX3M 2",
    Id: "motox3m2",
    Thumbnail: "thumbnail.jpg",
    Genres: ["driving", "bike", "racing", "race"]
  },
  {
    Name: "MotoX3M Pool Party",
    Id: "motox3mpp",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("April 24, 2025"),
    Genres: ["driving", "bike", "racing", "race"]
  },
  {
    Name: "MotoX3M Winter",
    Id: "motox3mw",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("June 1, 2025"),
    Genres: ["driving", "bike", "racing", "race"]
  },
  {
    Name: "n-gon",
    Id: "ngon",
    Thumbnail: "thumbnail.png",
    Added: new Date("December 16, 2024")
  },
  {
    Name: "OpenTTD",
    Id: "openttd",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 18, 2025"),
    Genres: ["simulation", "transportation", "strategy", "management"]
  },
  {
    Name: "Pachinkremental",
    Id: "pachinkremen",
    Thumbnail: "thumbnail.webp",
    Added: new Date("June 1, 2025"),
    Genres: ["clicker", "incremental", "pachinko"]
  },
  {
    Name: "Pacman",
    Id: "pacman",
    Thumbnail: "thumbnail.jpg",
    Genres: ["classic"]
  },
  {
    Name: "Papa's Burgeria",
    Id: "papaburger",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
    Added: new Date("October 15, 2024")
  },
  {
    Name: "Papa's Freezeria",
    Id: "papafreeze",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["flash"],
    Added: new Date("October 15, 2024")
  },
  {
    Name: "Papa's Pancakeria",
    Id: "papapancake",
    Thumbnail: "thumbnail.jpeg",
    Genres: ["flash"],
    Added: new Date("October 15, 2024")
  },
  {
    Name: "Papa's Pizzeria",
    Id: "papapizza",
    Folder: "PapaPizza",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash"],
  },
  {
    Name: "Paper.io 2",
    Id: "paperio2",
    Folder: "Paper.io/2/",
    Mobile: true,
    Thumbnail: "thumbnail.jpg",
    Added: new Date("January 22, 2025"),
    Genres: ["multiplayer", "arcade"]
  },
  {
    Name: "Plants Vs. Zombies",
    Id: "pvz",
    Folder: "Plants vs Zombies",
    Thumbnail: "thumbnail.jpeg",
    Mobile: true,
    Added: new Date("January 22, 2025"),
    Fixed: new Date("April 24, 2025"),
    Related: ["pvz2"],
    Genres: ["strategy", "tower defense"]
  },
  {
    Name: "Pokemon Green (GBA)",
    Id: "pgreen",
    Thumbnail: "thumbnails/pgreen.jpg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=pokemongreen.gba",
    Added: new Date("June 6, 2025"),
    Genres: ["rpg", "adventure", "nintendo"]
  },
  {
    Name: "Pokemon Ruby (GBA)",
    Id: "pruby",
    Thumbnail: "thumbnails/pruby.jpeg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=pokemonruby.gba",
    Added: new Date("June 6, 2025"),
    Genres: ["rpg", "adventure", "nintendo"]
  },
  {
    Name: "Pokemon Sapphire (GBA)",
    Id: "psapphire",
    Thumbnail: "thumbnails/psapphire.jpeg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=pokemonsapphire.gba",
    Added: new Date("June 6, 2025"),
    Genres: ["rpg", "adventure", "nintendo"]
  },
  {
    Name: "Punchout (NES)",
    Id: "punchout",
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
    Id: "punchout2",
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
    Id: "polytrack",
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("January 8, 2025"),
    Genres: ["driving", "car", "racing", "race"],
    Related: ["trackmania"],
  },
  {
    Name: "Pong",
    Id: "pong",
    Thumbnail: "thumbnail.png",
    Genres: ["classic", "arcade"],
  },
  {
    Name: "Portal (Flash)",
    Id: "portalwcs2",
    Folder: "Portal WCS2/",
    Thumbnail: "thumbnail.png",
    Added: new Date("November 1, 2024"),
    Genres: ["remake", "flash"],
    Related: ["valve", "half life"]
  },
  {
    Name: "q1k3",
    Id: "q1k3",
    Thumbnail: "thumbnail.png",
    Added: new Date("February 13, 2025"),
    Genres: ["fps", "shooter"],
  },
  {
    Name: "Ragdoll Archers",
    Id: "ragarchers",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("February 13, 2025"),
    Genres: ["pvp", "shooter"],
  },
  {
    Name: "Retro Bowl",
    Id: "retrobowl",
    Folder: "RtoBwl",
    Thumbnail: "thumbnail.png",
    Genres: ["sports", "football"],
  },
  {
    Name: "Retro Bowl College",
    Id: "retrobowlcollege",
    Folder: "RtoBwl/College/",
    Thumbnail: "thumbnail.png",
    Added: new Date("November 18, 2024"),
    Genres: ["sports", "football"],
  },
  {
    Name: "Riddle School 1",
    Id: "riddles1",
    Folder: "RiddleSchool/1/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash", "point and click"],
  },
  {
    Name: "Riddle School 2",
    Id: "riddles2",
    Folder: "RiddleSchool/2/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash", "point and click"],
  },
  {
    Name: "Riddle School 3",
    Id: "riddles3",
    Folder: "RiddleSchool/3/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash", "point and click"],
  },
  {
    Name: "Riddle School 4",
    Id: "riddles4",
    Folder: "../resources/ruffle",
    Index: "index.html?file=riddleschool4",
    Thumbnail: "thumbnails/riddleschool4.jpg",
    Genres: ["flash", "point and click"],
    Added: new Date("June 1, 2025")
  },
  {
    Name: "Riddle School 5",
    Id: "riddles5",
    Folder: "../resources/ruffle",
    Index: "index.html?file=riddleschool5",
    Thumbnail: "thumbnails/riddleschool5.jpg",
    Genres: ["flash", "point and click"],
    Added: new Date("June 1, 2025")
  },
  {
    Name: "Robux Generator Clicker",
    Id: "robuxgenclicker",
    Thumbnail: "thumbnail.png",
    Genres: ["clicker", "incremental"],
    Related: ["roblox"]
  },
  {
    Name: "Run 1",
    Id: "run1",
    Folder: "Run/1/",
    Thumbnail: "thumbnail.png",
    Genres: ["flash", "platformer"],
  },
  {
    Name: "Run 2",
    Id: "run2",
    Folder: "Run/2/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash", "platformer"],
  },
  {
    Name: "Run 3",
    Id: "run3",
    Folder: "Run/3/",
    Thumbnail: "thumbnail.png",
    Genres: ["flash", "platformer"],
  },
  {
    Name: "Sand Tetris",
    Id: "sandtetris",
    Added: new Date("April 20, 2025"),
    Thumbnail: "thumbnail.jpg",
    Genres: ["relaxing"]
  },
  {
    Name: "Skiing Fred",
    Id: "skifred",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("May 18, 2025"),
    Genres: ["platformer"],
  },
  {
    Name: "Sling Drift",
    Id: "slingdrift",
    Thumbnail: "thumbnail.jpg",
    Genres: ["driving", "car", "racing"],
    Hidden: true,
    Added: new Date("December 18, 2024")
  },
  {
    Name: "Rooftop Snipers",
    Id: "roofsnipe",
    Folder: "Rooftop Snipers/",
    Genres: ["multiplayer", "arcade"],
    Thumbnail: "thumbnail.jpeg",
    Added: new Date("October 2, 2024")
  },
  {
    Name: "Rooftop Snipers 2",
    Id: "roofsnipe2",
    Genres: ["multiplayer", "arcade"],
    Thumbnail: "thumbnail.jpg",
    Added: new Date("June 1, 2025")
  },
  {
    Name: "Slope",
    Id: "slope",
    Folder: "Slope/1/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["arcade", "3d"]
  },
  {
    Name: "Slope Ass",
    Id: "slopeass",
    Folder: "Slope/Ass/",
    Thumbnail: "thumbnail.png",
    Genres: ["arcade", "ripoff"]
  },
  {
    Name: "Slow Roads",
    Id: "slowroads",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("April 24, 2025"),
    Genres: ["driving", "relaxing", "open world"]
  },
  {
    Name: "Soccer Random",
    Id: "soccerrandom",
    Thumbnail: "thumbnail.webp",
    Added: new Date("December 18, 2024"),
    Genres: ["multiplayer", "arcade"]
  },
  {
    Name: "Solitare",
    Id: "solitare",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("November 18, 2024"),
    Genres: ["cards"]
  },
  {
    Name: "Soobway Surfers",
    Id: "soobwaysurf",
    Folder: "SoobwaySurfers",
    Thumbnail: "thumbnail.png",
    Genres: ["remake"],
    Related: ["subway surfers"]
  },
  {
    Name: "Super Mario 63",
    Id: "sm63",
    Folder: "SuperMario 63/",
    Thumbnail: "thumbnail.jpg"
  },
  {
    Name: "Super Mario 64",
    Id: "sm64",
    Folder: "SuperMario 64/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["classic"],
    Related: ["nintendo"]
  },
  {
    Name: "Super Mario Advance 2 (GBA)",
    Id: "sma2gba",
    Thumbnail: "thumbnails/sma2.jpg",
    Folder: "GBA-gh-pages/",
    Index: "index.html?file=supermarioadvance2.gba",
    Added: new Date("June 6, 2025"),
    Genres: ["platformer", "nintendo"]
  },
  {
    Name: "Super Mario Bros. 1 (NES)",
    Id: "smb1nes",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=supermariobros",
    Thumbnail: "thumbnails/smb1.png",
    Added: new Date("January 6, 2025"),
    Genres: ["classic", "nintendo", "platformer"],
  },
  {
    Name: "Super Mario Bros. 2 (NES)",
    Id: "smb2nes",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=supermariobros2",
    Thumbnail: "thumbnails/smb2.jpg",
    Added: new Date("January 6, 2025"),
    Genres: ["classic", "nintendo", "platformer"],
  },
  {
    Name: "Super Mario Bros. 3 (NES)",
    Id: "smb3nes",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=supermariobros3",
    Thumbnail: "thumbnails/smb3.jpg",
    Added: new Date("January 6, 2025"),
    Genres: ["classic", "nintendo", "platformer"],
  },
  {
    Name: "Stickman Hook",
    Id: "stickhook",
    Folder: "StickmanHook/",
    Thumbnail: "thumbnail.png",
    Fixed: new Date("October 2, 2024"),
    Genres: ["arcade"]
  },
  {
    Name: "Subway Surfers",
    Id: "subwaysurf",
    Thumbnail: "thumbnail.png",
    Added: new Date("October 2, 2024"),
    Genres: ["endless runner", "arcade"]
  },
  {
    Name: "Tanuki Sunset",
    Id: "tsunset",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("February 13, 2025"),
    Genres: ["platformer"],
  },
  {
    Name: "Temple Run 1",
    Id: "templerun1",
    Folder: "Temple Run/1/",
    Added: new Date("April 5, 2025"),
    Hidden: true
  },
  {
    Name: "Temple Run 2",
    Id: "templerun2",
    Folder: "Temple Run/2/",
    Added: new Date("April 5, 2025"),
    Hidden: true
  },
  {
    Name: "Tetris",
    Id: "tetris",
    Thumbnail: "thumbnail.jpg",
    Genres: ["classic", "arcade"],
  },
  {
    Name: "There is no game",
    Id: "nogame",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("April 24, 2025"),
    Genres: ["point and click", "puzzle"]
  },
  {
    Name: "Tomb of the Mask",
    Id: "totm",
    Thumbnail: "thumbnail.png",
    Added: new Date("January 8, 2025"),
    Genres: ["arcade", "maze"]
  },
  {
    Name: "The Legend of Zelda (NES)",
    Id: "tloznes",
    Folder: "../resources/jsnes/",
    Index: "nes.html?file=zelda",
    Thumbnail: "thumbnails/zelda.jpg",
    Added: new Date("December 18, 2024"),
    Genres: ["classic", "nintendo"],
  },
  {
    Name: "Ultimate Flash Sonic",
    Id: "usonicflash",
    Thumbnail: "thumbnail.jpg",
    Genres: ["remake"],
    Related: ["sonic the hedgehog", "sega"]
  },
  {
    Name: "Vex 3",
    Id: "vex3",
    Folder: "Vex/3/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["platformer"],
  },
  {
    Name: "We Become What We Behold",
    Id: "wbwwb",
    Thumbnail: "thumbnail.jpg",
    Added: new Date("June 1, 2025"),
    Genres: ["arcade", "pixel art", "politics", "satire", "story"]
  },
  {
    Name: "Wolfenstein 3D",
    Id: "wolf3d",
    Folder: "wolfen/",
    Thumbnail: "thumbnail.png",
    Genres: ["fps", "shooter", "classic"],
    Related: ["id software", "bethesda"]
  },
  {
    Name: "Wordle",
    Id: "wordle",
    Thumbnail: "thumbnail.jpg",
    Genres: ["puzzle"],
    Mobile: true
  },
  {
    Name: "World's Hardest Game 1",
    Id: "whg1",
    Folder: "Worlds Hardest Game/1/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash", "puzzle"]
  },
  {
    Name: "World's Hardest Game 2",
    Id: "whg2",
    Folder: "Worlds Hardest Game/2/",
    Thumbnail: "thumbnail.jpg",
    Genres: ["flash", "puzzle"]
  },
  {
    Name: "yohoho.io",
    Id: "yohohoio",
    Thumbnail: "thumbnail.jpg",
    Genres: ["multiplayer", "arcade"],
  },

  // Begin Emulators
  {
    Name: "Game Boy Advance Emulator",
    Id: "gbae",
    Folder: "GBA-gh-pages/",
    Thumbnail: "Binaries/gb.ico",
    Section: "emulators",
    Genres: ["emulator", "nintendo"],
  },

  // Begin web apps
  // none
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