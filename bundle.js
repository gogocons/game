(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const config = require("../config/classNames");
const bow = require("../weapons/bow");
const Character = require("./character");

class Assassin extends Character {
  constructor(name) {
    super(name, config.classNames.AssassinClassName, 10, 1, 3, 10, 100, 100);
    this.weapons.push(bow);
    // above gives a starting weapon, below automatically equips it
    this.equippedWeapon = bow;
  }
}

module.exports = Assassin;

},{"../config/classNames":5,"../weapons/bow":18,"./character":2}],2:[function(require,module,exports){
const config = require("../config/classNames");

class Character {
  constructor(name, className, attack, magic, defense, speed, health, mana) {
    this.name = name;
    this.className = className;
    this.level = 1;
    this.attack = attack;
    this.magic = magic;
    this.defense = defense;
    this.speed = speed;
    this.health = health;
    this.mana = mana;
    this.spells = [];
    this.weapons = [];
  }

  // used for GUI character stats
  getStatsString() {
    let str = "";
    str += `Attack: ${this.attack} <br/>`;
    str += `Magic: ${this.magic} <br/>`;
    str += `Defense: ${this.defense} <br/>`;
    str += `Speed: ${this.speed} <br/>`;
    str += `Health: ${this.getHealth()} <br/>`;
    str += `Mana: ${this.mana} <br/>`;
    // space for additional info, if required
    return str;
  }

  // TODO fix this section based on new classes made and order
  levelUp() {
    this.level = this.level + 1;
    if (this.className === config.classNames.WarriorClassName) {
      console.log("leveling up", this.className);
      this.mana = this.mana + 17;
      this.magic = this.magic + 1;
    } else if (this.className === config.classNames.AssassinClassName) {
      console.log("leveling up", this.className);
      this.attack = this.attack + 1;
      this.health = this.health + 11;
      this.mana = this.mana + 2;
    } else if (this.className === config.classNames.MageClassName) {
      console.log("leveling up", this.className);
      this.health = this.health + 29;
      this.mana = this.mana + 11;
      this.spedd = this.speed + 1;
    }
  }

  // this will return characters damage of base stat plus equipment/spell
  getDamage() {
    if (this.damageSpell) {
      const spellDamage = this.damageSpell.power;
      const magicDamage = this.magic;
      return spellDamage + magicDamage;
    } else if (this.equippedWeapon) {
      const weaponDamage = this.equippedWeapon.damage;
      const attackDamage = this.attack;
      return weaponDamage + attackDamage;
    }
  }

  // this is for removing mana from character after using a spell
  useDamageSpell(spellName) {
    for (let i = 0; i < this.spells.length; i++) {
      const spell = this.spells[i];
      if (spell.name === spellName) {
        this.damageSpell = spell;
        this.mana = this.mana - this.damageSpell.mana;
      }
    }
  }

  // NEED? this is to add a new weapon to character
  addWeapon(weapon) {
    this.weapons.push(weapon);
  }

  // NEED? this is to equipment different weapons in a characters inventory
  equipWeapon(weaponName) {
    for (let i = 0; i < this.weapons.length; i++) {
      const weapon = this.weapons[i];
      if (weapon.name === weaponName) {
        this.equippedWeapon = weapon;
      }
    }
  }

  getName() {
    return this.name;
  }

  getClassName() {
    return this.className;
  }

  getLevel() {
    return this.level;
  }

  getHealth() {
    if (this.health <= 0) {
      return "Dead";
    } else {
      return this.health;
    }
  }
}

module.exports = Character;

},{"../config/classNames":5}],3:[function(require,module,exports){
const config = require("../config/classNames");
const fireball = require("../spells/fireball");
const Character = require("./character");

class Mage extends Character {
  constructor(name) {
    super(name, config.classNames.MageClassName, 2, 7, 3, 5, 100, 150);
    this.spells.push(fireball);
    // above is starter spell; below is assigning as default spell at first
    this.damageSpell = fireball;
  }
}

module.exports = Mage;

},{"../config/classNames":5,"../spells/fireball":16,"./character":2}],4:[function(require,module,exports){
const config = require("../config/classNames");
const sword = require("../weapons/sword");
const Character = require("./character");

class Warrior extends Character {
  constructor(name) {
    super(name, config.classNames.WarriorClassName, 5, 1, 10, 2, 150, 100);
    this.weapons.push(sword);
    // above gives a starting weapon, below automatically equips it
    this.equippedWeapon = sword;
  }
}

module.exports = Warrior;

},{"../config/classNames":5,"../weapons/sword":19,"./character":2}],5:[function(require,module,exports){
const config = {
  classNames: {
    WarriorClassName: "Warrior",
    AssassinClassName: "Assassin",
    MageClassName: "Mage",
  },
};

module.exports = config;

},{}],6:[function(require,module,exports){
"use strict";

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
    battleLogic(choice);

    // TODO refactor into a game logic function that changes action per choice
    function battleLogic(choice) {
      if (choice === "fight") {
        toggleChoicesBox();
        setTimeout(() => {
          toggleChoicesBox();
        }, 1000);
        const animationClass = "animation-fight";

        // if to check if character is alive before dealing damage
        // TODO: should end combat if dead (not possible in current stage)
        if (character.health > 0) {
          triggerAnimation(mobImage, animationClass);
          activeMob.health -= myDamage;
          displayMobInfo(activeMob);
        }

        // if to check if mob is dead to prevent damage dealt
        if (activeMob.health > 0) {
          setTimeout(() => {
            triggerAnimation(characterImage, animationClass);
            character.health -= mobDamage;
            displayCharacterInfo(character);
          }, 1000);
        }
      } else if (choice === "power") {
        // TODO: add logic for this choice
      } else if (choice === "heal") {
        // TODO: add logic for this choice
      }
    }
  }

  // TODO: add function to get new mob, levelup after dead mob
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
  container.style.display = container.style.display == "block" ? "none" : "block";
}

// awaiting promise from a button press
function waitForChoice() {
  const fightButton = document.getElementById("fight");
  const powerButton = document.getElementById("power");
  const healButton = document.getElementById("heal");
  return new Promise(function (resolve) {
    fightButton.addEventListener("click", function () {
      resolve("fight");
    });
    // TODO: which game actions I want to use, possibly change name per class selection
    powerButton.addEventListener("click", function () {
      resolve("power");
    });
    // TODO: if using heal, need characters to have potions
    healButton.addEventListener("click", function () {
      resolve("heal");
    });
  });
}

// this function triggers animation by adding the class to the image elemnt
function triggerAnimation(target, animationClass) {
  target.classList.add(animationClass);
  // timeout is set to same time as animation length
  setTimeout(() => {
    target.classList.remove(animationClass);
  }, 500);
}

},{"./mobs/mobs":10,"./modules/chooseClass":11,"./modules/diplayCharacterInfo":12,"./modules/displayMobInfo":13,"./modules/enableCharacterInfoDisplays":14,"./modules/setActiveMob":15}],7:[function(require,module,exports){
const Mob = require("./mob");

const bandit = new Mob("Bandit", 5, 50, "./images/Bandit_male.webp");

module.exports = bandit;

},{"./mob":9}],8:[function(require,module,exports){
const Mob = require("./mob");

const dragon = new Mob("Dragon", 40, 100);

module.exports = dragon;

},{"./mob":9}],9:[function(require,module,exports){
class Mob {
  constructor(name, damage, health, image) {
    this.name = name;
    this.damage = damage;
    this.health = health;
    this.image = image;
  }

  getHealth() {
    if (this.health <= 0) {
      return "Dead";
    } else {
      return this.health;
    }
  }

  getName() {
    return this.name;
  }

  getDamage() {
    return this.damage;
  }
}

module.exports = Mob;

},{}],10:[function(require,module,exports){
const bandit = require("./bandit");
const dragon = require("./dragon");

// TODO need to have 5 mobs for game demo
// list for setting up mob table
const mobs = [bandit, dragon];

module.exports = mobs;

},{"./bandit":7,"./dragon":8}],11:[function(require,module,exports){
const config = require("../config/classNames");
const Warrior = require("../characters/warrior");
const Assassin = require("../characters/assassin");
const Mage = require("../characters/mage");
const characterImage = document.getElementById("character-image");

function chooseClass(classType) {
  if (classType === config.classNames.WarriorClassName) {
    characterImage.src = "./images/ChiefBurguk.webp";
    return new Warrior("Chief Burguk");
  } else if (classType === config.classNames.AssassinClassName) {
    characterImage.src = "./images/Niruin.webp";
    return new Assassin("Niruin");
  } else if (classType === config.classNames.MageClassName) {
    characterImage.src = "./images/Faralda.webp";
    return new Mage("Faralda");
  }
}

module.exports = chooseClass;

},{"../characters/assassin":1,"../characters/mage":3,"../characters/warrior":4,"../config/classNames":5}],12:[function(require,module,exports){
// I know I can use this function to add new things to display
// this function should get EVERY attribute I want to diplay to the page, and add it there
function displayCharacterInfo(character) {
  const container = document.getElementById("character-info");
  let characeterInfoString = `Name: ${character.getName()} <br/>`;
  characeterInfoString += `Level ${character.getLevel()} ${character.getClassName()} <br/>`;
  characeterInfoString += `${character.getStatsString()}`;

  container.innerHTML = characeterInfoString;
}

module.exports = displayCharacterInfo;

},{}],13:[function(require,module,exports){
// displayMobInfo displays the infrmation to the page for the active mob.
function displayMobInfo(mob) {
  const container = document.getElementById("mob-info");
  let mobInfoString = `Name: ${mob.getName()} <br/>`;
  mobInfoString += `Health: ${mob.getHealth()} <br/>`;
  mobInfoString += `Damage: ${mob.getDamage()} <br/>`;

  container.innerHTML = mobInfoString;
}

module.exports = displayMobInfo;

},{}],14:[function(require,module,exports){
// hides the character select container, and unhides the character info container,
// and the mob info container
function enableCharacterInfoDisplays() {
  const selectContainer = document.getElementById("character-select-container");
  selectContainer.style.display = "none";

  const infoContainers = document.getElementById("info-containers");
  infoContainers.style.display = "flex";

  const characterContainer = document.getElementById(
    "character-info-container"
  );
  characterContainer.style.display = "inline-block";

  const mobContainer = document.getElementById("mob-info-container");
  mobContainer.style.display = "inline-block";
}

module.exports = enableCharacterInfoDisplays;

},{}],15:[function(require,module,exports){
const displayMobInfo = require("./displayMobInfo");
const mobImage = document.getElementById("mob-image");

// setActiveMob takes a mob class and sets the activeMob to is, and displays its information to the page
function setActiveMob(mob) {
  mobImage.src = mob.image;
  displayMobInfo(mob);
  return mob;
}

module.exports = setActiveMob;

},{"./displayMobInfo":13}],16:[function(require,module,exports){
const Spell = require("./spell");

const fireball = new Spell("Fireball", 6, 12);

module.exports = fireball;

},{"./spell":17}],17:[function(require,module,exports){
class Spell {
  constructor(name, power, mana) {
    this.name = name;
    this.level = 1;
    this.power = power;
    this.mana = mana;
  }
}

module.exports = Spell;

},{}],18:[function(require,module,exports){
const Weapon = require("./weapon");

const bow = new Weapon("Hunting Bow", 12);

module.exports = bow;

},{"./weapon":20}],19:[function(require,module,exports){
const Weapon = require("./weapon");

const sword = new Weapon("Iron Sword", 5);

module.exports = sword;

},{"./weapon":20}],20:[function(require,module,exports){
class Weapon {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
  }
}

module.exports = Weapon;

},{}]},{},[6]);
