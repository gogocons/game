const config = require("../config/classNames");

class Character {
  constructor(name, className, attack, magic, defense, speed, health, mana) {
    this.name = name;
    this.className = className;
    this.level = 1;
    this.attack = attack;
    this.magic = magic;
    this.defense = defense;
    this.speed = speed;
    this.health = health;
    this.mana = mana;
    this.spells = [];
    this.weapons = [];
  }

  // used for GUI character stats
  getStatsString() {
    let str = "";
    str += `Attack: ${this.attack} <br/>`;
    str += `Magic: ${this.magic} <br/>`;
    str += `Defense: ${this.defense} <br/>`;
    str += `Speed: ${this.speed} <br/>`;
    str += `Health: ${this.getHealth()} <br/>`;
    str += `Mana: ${this.mana} <br/>`;
    // space for additional info, if required
    return str;
  }

  // TODO fix this section based on new classes made and order
  levelUp() {
    this.level = this.level + 1;
    if (this.className === config.classNames.WarriorClassName) {
      console.log("leveling up", this.className);
      this.mana = this.mana + 17;
      this.magic = this.magic + 1;
    } else if (this.className === config.classNames.AssassinClassName) {
      console.log("leveling up", this.className);
      this.attack = this.attack + 1;
      this.health = this.health + 11;
      this.mana = this.mana + 2;
    } else if (this.className === config.classNames.MageClassName) {
      console.log("leveling up", this.className);
      this.health = this.health + 29;
      this.mana = this.mana + 11;
      this.spedd = this.speed + 1;
    }
  }

  // this will return characters damage of base stat plus equipment/spell
  getDamage() {
    if (this.damageSpell) {
      const spellDamage = this.damageSpell.power;
      const magicDamage = this.magic;
      return spellDamage + magicDamage;
    } else if (this.equippedWeapon) {
      const weaponDamage = this.equippedWeapon.damage;
      const attackDamage = this.attack;
      return weaponDamage + attackDamage;
    }
  }

  // this is for removing mana from character after using a spell
  useDamageSpell(spellName) {
    for (let i = 0; i < this.spells.length; i++) {
      const spell = this.spells[i];
      if (spell.name === spellName) {
        this.damageSpell = spell;
        this.mana = this.mana - this.damageSpell.mana;
      }
    }
  }

  // NEED? this is to add a new weapon to character
  addWeapon(weapon) {
    this.weapons.push(weapon);
  }

  // NEED? this is to equipment different weapons in a characters inventory
  equipWeapon(weaponName) {
    for (let i = 0; i < this.weapons.length; i++) {
      const weapon = this.weapons[i];
      if (weapon.name === weaponName) {
        this.equippedWeapon = weapon;
      }
    }
  }

  getName() {
    return this.name;
  }

  getClassName() {
    return this.className;
  }

  getLevel() {
    return this.level;
  }

  getHealth() {
    if (this.health <= 0) {
      return "Dead";
    } else {
      return this.health;
    }
  }
}

module.exports = Character;
