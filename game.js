const Mage = require("./characters/mage");
const Shaman = require("./characters/shaman");
const Warlock = require("./characters/warlock");

const mage = new Mage("Jaina");
console.log(mage);

const shaman = new Shaman("Thrall");
console.log(shaman);

const warlock = new Warlock("Gul'dan");
console.log(warlock)

warlock.summonPet("Imp");

// mage.useDamageSpell("Fireball");

console.log(warlock);