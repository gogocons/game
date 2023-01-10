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