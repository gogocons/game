const Pet = require("./pet");
const Character = require("./character");
const ironfoe = require("../weapons/ironfoe");
const healingWave = require("../spells/healingWave");
// const lightningBolt = require("../spells/lightningBolt");

class Shaman extends Character {
    constructor(name) {
        super(name, "shaman", 6, 6, 8, 3, 100, 100);
        const totem = new Pet("Stoneskin Totem", 0);
        this.pets.push(totem);
        this.weapons.push(ironfoe);
        this.spells.push(healingWave);
    }
}

module.exports = Shaman;