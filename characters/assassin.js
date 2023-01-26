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