const config = require("../config/classNames");
const Warrior = require("../characters/warrior");
const Assassin = require("../characters/assassin");
const Mage = require("../characters/mage");
const characterImage = document.getElementById("character-image");

function chooseClass(classType) {
  if(classType === config.classNames.WarriorClassName) {
    characterImage.src = "./images/ChiefBurguk.png";
    return new Warrior("Burguk");
  } else if(classType === config.classNames.AssassinClassName) {
    characterImage.src = "./images/Niruin.png";
    return new Assassin("Niruin");
  } else if(classType === config.classNames.MageClassName) {
    characterImage.src = "./images/Wuunferth.png";
    return new Mage("Wuunferth")
  }
}

module.exports = chooseClass;