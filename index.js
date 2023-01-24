// this our main game loop file

const config = require("./config/classNames");
const Mage = require("./characters/mage");
const Shaman = require("./characters/shaman");
const Warlock = require("./characters/warlock");

// 1. I want to let a user create a character from alist of my given classes.

// the variable character is going to represent my character in the game.
// it should be of type 'character' from character/characters.js
// and an instance of that character
let character;

function chooseClass(classType) {
  if(classType === config.classNames.MageClassName) {
    character = new Mage("Jaina");
  } else if(classType === config.classNames.ShamanClassName) {
    character = new Shaman("Thrall");
  } else if(classType === config.classNames.WarlockClassName) {
    character = new Warlock("Gul'dan")
  }
}
// takes a classType parameter of type string and initiates the characeter variable
// to a new instance of that class this it toggles the displays, displays character info
// and sets us up to play the game
function initializeGame (classType) {
  chooseClass(classType);
  toggleCharacterInfoDisplays();
  displayCharacterInfo(character);
}

// hides the character select container, and unhides the character info container
function toggleCharacterInfoDisplays() {
  const selectContainer = document.getElementById("character-select-container");
  selectContainer.style.display = 'none';

  const infoContainer = document.getElementById("character-info-container");
  infoContainer.style.display = 'block';
}

// I know I can use this function to add new things to display
// this function should get EVERY attribute I want to diplay to the page, and add it there
function displayCharacterInfo(character) {
  const container = document.getElementById("character-info");
  let characeterInfoString = `Name: ${character.getName()} <br/>`;
  characeterInfoString += `Level ${character.getLevel()} ${character.getClassName()} <br/>`;
  characeterInfoString += `${character.getStatsString()}`;
  container.innerHTML = characeterInfoString;

}

const mageButton = document.getElementById("mage");
const shamanButton = document.getElementById("shaman");
const warlockButton = document.getElementById("warlock");

mageButton.addEventListener('click', function() {
  console.log("button clicked mage");
  initializeGame("mage");
});

shamanButton.addEventListener('click', function() {
  console.log("button clicked shaman");
  initializeGame("shaman");
});

warlockButton.addEventListener('click', function() {
  console.log("button clicked warlock");
  initializeGame("warlock");
});

