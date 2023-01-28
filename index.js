// this our main game loop file

// modules import
const chooseClass = require("./modules/chooseClass");
const displayCharacterInfo = require("./modules/diplayCharacterInfo");
const displayMobInfo = require("./modules/displayMobInfo");
const mobs = require("./mobs/mobs");
const setActiveMob = require("./modules/setActiveMob");
const enableCharacterInfoDisplays = require("./modules/enableCharacterInfoDisplays");

// other variables for code readability
const characterImage = document.getElementById("character-image");
const mobImage = document.getElementById("mob-image");

// 1. I want to let a user create a character from alist of my given classes.

// the variable character is going to represent my character in the game.
// it should be of type 'character' from character/characters.js
// and an instance of that character
let character;

// activeMob is the monster we are currently fighting, it should be of type 'mob', from mobs/mob.js
// and an instance of that mob, meaning one of the other classes created in that folder, such as goblin
let activeMob;

const warriorButton = document.getElementById("warrior");
const assassinButton = document.getElementById("assassin");
const mageButton = document.getElementById("mage");

warriorButton.addEventListener("click", function () {
  initializeGame("Warrior");
});

assassinButton.addEventListener("click", function () {
  initializeGame("Assassin");
});

mageButton.addEventListener("click", function () {
  initializeGame("Mage");
});

// takes a classType parameter of type string and initiates the characeter variable
// to a new instance of that class this it toggles the displays, displays character info
// and sets us up to play the game
function initializeGame(classType) {
  character = chooseClass(classType);
  enableCharacterInfoDisplays();
  displayCharacterInfo(character);
  startGameLoop();
}

// startGameLoop assumes we have a character creat, and character info displayed on the page
// as well as no other initialization properties, such as mobs spawned
// it begins the game loop of spawning mobs, fighting, waiting for user input,
// until the user wins or is dead
async function startGameLoop() {
  // TODO add more mobs and pick a random one here, remove mob from array if defeated.
  const mob = mobs[0];
  activeMob = setActiveMob(mob);

  // turn on choices box after character has been selected and displayed
  toggleChoicesBox();

  while (activeMob.getHealth() > 0 && character.getHealth() > 0) {
    const myDamage = character.getDamage();
    const mobDamage = activeMob.getDamage();

    // then I want to wait until a user clicks them
    const choice = await waitForChoice();
    console.log(choice);
    battleLogic(choice);

    // TODO refactor into a game logic function that changes action per choice
    function battleLogic(choice) {
      if (choice === "fight") {
        toggleChoicesBox();
        setTimeout(() => {
          toggleChoicesBox();
        }, 1000);
        console.log("choice is fight, new function test");
        const animationClass = "animation-fight";

        if (character.health > 0) {
          triggerAnimation(mobImage, animationClass);
          activeMob.health -= myDamage;
          displayMobInfo(activeMob);
        }

        if (activeMob.health > 0) {
          setTimeout(() => {
            triggerAnimation(characterImage, animationClass);
            character.health -= mobDamage;
            displayCharacterInfo(character);
          }, 1000);
        }
      } else if (choice === "power") {
        console.log("power attack chosen");
      } else if (choice === "heal") {
        console.log("heal chosen");
      }
    }
  }

  // TODO add function to get new mob, levelup feature
  setTimeout(() => {
    alert("you beat the alpha demo! great work!");
  }, 2000);
  console.log("DEBUG: Mob Dead!");

  // player or mob is dead, remove choices block
  toggleChoicesBox();
}

// this function will check if the choices block is visible or not and set it to the other
function toggleChoicesBox() {
  const container = document.getElementById("user-choices-container");
  container.style.display =
    container.style.display == "block" ? "none" : "block";
}

function waitForChoice() {
  const fightButton = document.getElementById("fight");
  const powerButton = document.getElementById("power");
  const healButton = document.getElementById("heal");
  return new Promise(function (resolve) {
    fightButton.addEventListener("click", function () {
      resolve("fight");
    });
    // TODO figure out what game actions I want to use
    powerButton.addEventListener("click", function () {
      resolve("power");
    });
    healButton.addEventListener("click", function () {
      resolve("heal");
    });
  });
}

// this function triggers animation by adding the class to the image elemnt
function triggerAnimation(target, animationClass) {
  target.classList.add(animationClass);
  console.log("animation class added");
  // timeout is set to same time as animation length
  setTimeout(() => {
    target.classList.remove(animationClass);
  }, 500);
  console.log("animation class removed");
}
