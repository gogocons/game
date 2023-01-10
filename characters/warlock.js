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