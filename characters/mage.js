const config = require("../config/classNames");
const fireball = require("../spells/fireball");
const Character = require("./character");

class Mage extends Character {
  constructor(name) {
    super(name, config.classNames.MageClassName, 2, 7, 3, 5, 100, 150);
    this.spells.push(fireball);
    // above is starter spell; below is assigning as default spell at first
    this.damageSpell = fireball;
  }
}

module.exports = Mage;
