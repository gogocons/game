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
