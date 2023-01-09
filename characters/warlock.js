const Pet = require("./pet");
const Character = require("./character");

class Warlock extends Character {
    constructor(name) {
        super(name, "warlock", 3, 3, 7, 5, 200, 100);
        // every warlock starts with an imp as its first pet!
        const demon = new Pet("Imp", 4);
        this.pets.push(demon);
    }
}

module.exports = Warlock;