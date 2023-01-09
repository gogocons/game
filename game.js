const Mage = require("./characters/mage");
const Shaman = require("./characters/shaman");
const Warlock = require("./characters/warlock");

const mage = new Mage("Jaina");
console.log(mage);

const shaman = new Shaman("Thrall");
console.log(shaman);

const warlock = new Warlock("Gul'dan");
console.log(warlock)

// define which damage spell to cast for getDamage
mage.useDamageSpell("Fireball");

// define which weapon to equip for getDamage
shaman.equipWeapon("Ironfoe");

// define which pet to summon for getDamage
warlock.summonPet("Imp");

console.log(mage.getDamage());
console.log(shaman.getDamage());
console.log(warlock.getDamage());