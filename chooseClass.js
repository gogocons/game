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