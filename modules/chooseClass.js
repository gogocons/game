const config = require("../config/classNames");
const Warrior = require("../characters/warrior");
const Assassin = require("../characters/assassin");
const Mage = require("../characters/mage");
const characterImage = document.getElementById("character-image");

function chooseClass(classType) {
  if(classType === config.classNames.WarriorClassName) {
    characterImage.src = "./images/ChiefBurguk.webp";
    return new Warrior("Chief Burguk");
  } else if(classType === config.classNames.AssassinClassName) {
    characterImage.src = "./images/Niruin.webp";
    return new Assassin("Niruin");
  } else if(classType === config.classNames.MageClassName) {
    characterImage.src = "./images/Wuunferth.webp";
    return new Mage("Wuunferth the Unliving")
  }
}

module.exports = chooseClass;