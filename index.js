// this our main game loop file
const chooseClass = require("./chooseClass");
const displayCharacterInfo = require("./diplayCharacterInfo");
const displayMobInfo = require("./displayMobInfo");
const mobs = require("./mobs/mobs");
const setActiveMob = require("./setActiveMob");
const toggleCharacterInfoDisplays = require("./toggleCharacterInfoDisplays");

// 1. I want to let a user create a character from alist of my given classes.

// the variable character is going to represent my character in the game.
// it should be of type 'character' from character/characters.js
// and an instance of that character
let character;

// activeMob is the monster we are currently fighting, it should be of type 'mob', from mobs/mob.js
// and an instance of that mob, meaning one of the other classes created in that folder, such as goblin
let activeMob;

const mageButton = document.getElementById("mage");
const shamanButton = document.getElementById("shaman");
const warlockButton = document.getElementById("warlock");

mageButton.addEventListener('click', function() {
  initializeGame("Mage");
});

shamanButton.addEventListener('click', function() {
  initializeGame("Shaman");
});

warlockButton.addEventListener('click', function() {
  initializeGame("Warlock");
});

// takes a classType parameter of type string and initiates the characeter variable
// to a new instance of that class this it toggles the displays, displays character info
// and sets us up to play the game
function initializeGame (classType) {
  character = chooseClass(classType);
  toggleCharacterInfoDisplays();
  displayCharacterInfo(character);
  startGameLoop();
}

// startGameLoop assumes we have a character creat, and character info displayed on the page
// as well as no other initialization properties, such as mobs spawned
// it begins the game loop of spawning mobs, fighting, waiting for user input,
// until the user wins or is dead
async function startGameLoop() {
  
  // TODO add more mobs and pick a random one here, remove mob from array if defeated.
  const mob = mobs[1];
  activeMob = setActiveMob(mob);

  while(activeMob.getHealth() > 0 && character.getHealth() > 0) {
    // fight!
    // I want to display user choices to the page
    displayChoices();

    // then I want to wait until a user clicks them
    const choice = await waitForChoice();

    // TODO refactor into a game logic function that changes action per choice
    console.log("user chose", choice);
    const myDamage = character.getDamage();
    const mobDamage = activeMob.getDamage();

    character.health -= mobDamage;
    activeMob.health -= myDamage;

    displayCharacterInfo(character);
    displayMobInfo(activeMob);
    ;
  }
}

function displayChoices() {
  const container = document.getElementById('user-choices-container');
  container.style.display = 'inline-block';
}

function waitForChoice() {
  const fightButton = document.getElementById('fight');
  const healButton = document.getElementById('heal');
  const blockButton = document.getElementById('block');
  return new Promise(function(resolve) {
    fightButton.addEventListener('click', function() {
      resolve('fight');
    });

    // TODO figure out what game actions I want to use
    // healButton.addEventListener('click', function() {
    //   resolve('heal');
    // });
    // blockButton.addEventListener('click', function() {
    //   resolve('block');
    // });
  })
}