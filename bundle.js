(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        this.pets = [];
        this.activePet = null;
    }

    getStatsString() {
      let str = "";
      str += `Attack: ${this.attack} <br/>`;
      str += `Magic: ${this.magic} <br/>`;
      str += `Defense: ${this.defense} <br/>`;
      str += `Speed: ${this.speed} <br/>`;
      str += `Health: ${this.getHealth()} <br/>`;
      str += `Mana: ${this.mana} <br/>`;
      if(this.activePet) {
        str += `ActivePet: ${this.activePet.getName()} <br/>`;
      }

      return str;
    }

    levelUp() {
        this.level = this.level + 1;
        if(this.className === config.classNames.MageClassName) {
            console.log("leveling up", this.className);
            this.mana = this.mana + 17;
            this.magic = this.magic + 1;
        } else if(this.className === config.classNames.ShamanClassName) {
            console.log("leveling up", this.className);
            this.attack = this.attack + 1;
            this.health = this.health + 11;
            this.mana = this.mana + 2;
        } else if(this.className === config.classNames.WarlockClassName) {
            console.log("leveling up", this.className);
            this.health = this.health + 29;
            this.mana = this.mana + 11;
            this.spedd = this.speed + 1;
        }
    }

    getDamage() {
        // I need a way to keep track of a users active pet. if they have one, we get the 
        // pets damage and add it to the characters magic damage.
        if(this.activePet) {
            const petDamage = this.activePet.damage;
            const magicDamage = this.magic;
            return petDamage + magicDamage;
        } else if(this.damageSpell) {
            const spellDamage = this.damageSpell.power;
            const magicDamage = this.magic;
            return spellDamage + magicDamage;
        } else if(this.equippedWeapon) {
            const weaponDamage = this.equippedWeapon.damage;
            const attackDamage = this.attack;
            return weaponDamage + attackDamage;
        }

    }

    summonPet(petName) {
        // if we have a pet in our this.pets array, that matches the name passed in as an
        // argument to this function, lets summon it.
        // we can loop over the pets we have to find it.
        for(let i = 0; i < this.pets.length;i++) {
            const pet = this.pets[i];  // this pet is equal to an individual pet element in our pets array
            if (pet.name === petName) {
                this.activePet = pet;
            }
        }
    }

    useDamageSpell(spellName) {
        for(let i = 0; i < this.spells.length;i++) {
            const spell = this.spells[i];
            if (spell.name === spellName) {
                this.damageSpell = spell;
                this.mana = this.mana - this.damageSpell.mana
            }
        }
    }

    useHealingSpell(spellName) {
        for(let i = 0; i < this.spells.length;i++) {
            const spell = this.spells[i];
            if (spell.name === spellName) {
                this.healSpell = spell;
                this.mana = this.mana - this.healSpell.mana;
                this.health = this.health + this.healSpell.power;
            }
        }
    }

    addWeapon(weapon) {
        this.weapons.push(weapon);
    }

    equipWeapon(weaponName) {
        for(let i = 0; i < this.weapons.length;i++) {
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
      if(this.health < 0) {
        return 'Dead';
      } else {
        return this.health;
      }
    }
}

module.exports = Character
},{"../config/classNames":7}],2:[function(require,module,exports){
const config = require("../config/classNames");
const fireball = require("../spells/fireball");
const Character = require("./character");

class Mage extends Character {
    constructor(name) {
        super(name, config.classNames.MageClassName, 2, 7, 3, 5, 50, 200);
        this.spells.push(fireball);
        // above is starter spell; below is assigning as default spell at first
        this.damageSpell = fireball;
    }
}

module.exports = Mage;
},{"../config/classNames":7,"../spells/fireball":16,"./character":1}],3:[function(require,module,exports){
class Pet {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }

    getName() {
      return this.name;
    }
}

module.exports = Pet;
},{}],4:[function(require,module,exports){
const config = require("../config/classNames");
const Pet = require("./pet");
const Character = require("./character");
const ironfoe = require("../weapons/ironfoe");
const healingWave = require("../spells/healingWave");
// const lightningBolt = require("../spells/lightningBolt");

class Shaman extends Character {
    constructor(name) {
        super(name, config.classNames.ShamanClassName, 6, 6, 8, 3, 100, 100);
        const totem = new Pet("Stoneskin Totem", 0);
        this.pets.push(totem);
        this.weapons.push(ironfoe);
        // above gives a starting weapon, below automatically equips it
        this.equippedWeapon = ironfoe;
        this.spells.push(healingWave);
    }
}

module.exports = Shaman;
},{"../config/classNames":7,"../spells/healingWave":17,"../weapons/ironfoe":20,"./character":1,"./pet":3}],5:[function(require,module,exports){
const config = require("../config/classNames");
const Pet = require("./pet");
const Character = require("./character");

class Warlock extends Character {
    constructor(name) {
        super(name, config.classNames.WarlockClassName, 3, 3, 7, 5, 200, 100);
        // every warlock starts with an imp as its first pet!
        const demon = new Pet("Imp", 4);
        this.pets.push(demon);
        // above gives a starter pet, below summons pet automatically (temporary solution)
        this.activePet = demon;
    }
}

module.exports = Warlock;
},{"../config/classNames":7,"./character":1,"./pet":3}],6:[function(require,module,exports){
const config = require("./config/classNames");
const Mage = require("./characters/mage");
const Shaman = require("./characters/shaman");
const Warlock = require("./characters/warlock");

function chooseClass(classType) {
  if(classType === config.classNames.MageClassName) {
    return new Mage("Jaina");
  } else if(classType === config.classNames.ShamanClassName) {
    return new Shaman("Thrall");
  } else if(classType === config.classNames.WarlockClassName) {
    return new Warlock("Gul'dan")
  }
}

module.exports = chooseClass;
},{"./characters/mage":2,"./characters/shaman":4,"./characters/warlock":5,"./config/classNames":7}],7:[function(require,module,exports){
const config = {
    classNames: {
        MageClassName: "Mage",
        ShamanClassName: "Shaman",
        WarlockClassName: "Warlock"
    }
}

module.exports = config;
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
// displayMobInfo displays the infrmation to the page for the active mob.
function displayMobInfo(mob) {
  const container = document.getElementById('mob-info');
  let mobInfoString = `Name: ${mob.getName()} <br/>`;
  mobInfoString += `Health: ${mob.getHealth()} <br/>`;
  mobInfoString += `Damage: ${mob.getDamage()} <br/>`;

  container.innerHTML = mobInfoString;
}

module.exports = displayMobInfo;
},{}],10:[function(require,module,exports){
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
},{"./chooseClass":6,"./diplayCharacterInfo":8,"./displayMobInfo":9,"./mobs/mobs":14,"./setActiveMob":15,"./toggleCharacterInfoDisplays":19}],11:[function(require,module,exports){
const Mob = require("./mob");

const dragon = new Mob("dragon", 40, 60);

module.exports = dragon;
},{"./mob":13}],12:[function(require,module,exports){
const Mob = require("./mob");

const goblin = new Mob("goblin", 10, 29);

module.exports = goblin
},{"./mob":13}],13:[function(require,module,exports){
class Mob {
    constructor(name, damage, health) {
        this.name = name;
        this.damage = damage;
        this.health = health;
    }

    getHealth() {
      if(this.health < 0) {
        return 'Dead';
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

module.exports = Mob
},{}],14:[function(require,module,exports){
const goblin = require("./goblin");
const dragon = require("./dragon");

const mobs = [goblin, dragon];

module.exports = mobs;
},{"./dragon":11,"./goblin":12}],15:[function(require,module,exports){
const displayMobInfo = require("./displayMobInfo");

// setActiveMob takes a mob class and sets the activeMob to is, and displays its information to the page
function setActiveMob(mob) {
  displayMobInfo(mob);
  return mob;
}

module.exports = setActiveMob;
},{"./displayMobInfo":9}],16:[function(require,module,exports){
const Spell = require("./spell");

const fireball = new Spell("Fireball", 6, 12);

module.exports = fireball;
},{"./spell":18}],17:[function(require,module,exports){
const Spell = require("./spell");

const healingWave = new Spell("Healing Wave", 7, 15);

module.exports = healingWave;
},{"./spell":18}],18:[function(require,module,exports){
class Spell {
    constructor(name, power, mana) {
        this.name = name;
        this.level = 1;
        this.power = power;
        this.mana = mana;
    }
}

module.exports = Spell;
},{}],19:[function(require,module,exports){
// hides the character select container, and unhides the character info container,
// and the mob info container
function toggleCharacterInfoDisplays() {
  const selectContainer = document.getElementById("character-select-container");
  selectContainer.style.display = 'none';

  const infoContainer = document.getElementById("character-info-container");
  infoContainer.style.display = 'inline-block';

  const mobContainer = document.getElementById('mob-info-container');
  mobContainer.style.display = 'inline-block';
}

module.exports = toggleCharacterInfoDisplays;
},{}],20:[function(require,module,exports){
const Weapon = require("./weapon");

const ironfoe = new Weapon("Ironfoe", 5);

module.exports = ironfoe;
},{"./weapon":21}],21:[function(require,module,exports){
class Weapon {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }
}

module.exports = Weapon;
},{}]},{},[10]);
