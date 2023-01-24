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
        this.pets = [];
        this.activePet = null;
    }

    getStatsString() {
      let str = "";
      str += `Attack: ${this.attack} <br/>`;
      str += `Magic: ${this.magic} <br/>`;
      str += `Defense: ${this.defense} <br/>`;
      str += `Speed: ${this.speed} <br/>`;
      str += `Health: ${this.health} <br/>`;
      str += `Mana: ${this.mana} <br/>`;
      if(this.activePet) {
        str += `ActivePet: ${this.activePet.getName()} <br/>`;
      }

      return str;
    }

    levelUp() {
        this.level = this.level + 1;
        if(this.className === config.classNames.MageClassName) {
            console.log("leveling up", this.className);
            this.mana = this.mana + 17;
            this.magic = this.magic + 1;
        } else if(this.className === config.classNames.ShamanClassName) {
            console.log("leveling up", this.className);
            this.attack = this.attack + 1;
            this.health = this.health + 11;
            this.mana = this.mana + 2;
        } else if(this.className === config.classNames.WarlockClassName) {
            console.log("leveling up", this.className);
            this.health = this.health + 29;
            this.mana = this.mana + 11;
            this.spedd = this.speed + 1;
        }
    }

    getDamage() {
        // I need a way to keep track of a users active pet. if they have one, we get the 
        // pets damage and add it to the characters magic damage.
        if(this.activePet) {
            const petDamage = this.activePet.damage;
            const magicDamage = this.magic;
            return petDamage + magicDamage;
        } else if(this.damageSpell) {
            const spellDamage = this.damageSpell.power;
            const magicDamage = this.magic;
            return spellDamage + magicDamage;
        } else if(this.equippedWeapon) {
            const weaponDamage = this.equippedWeapon.damage;
            const attackDamage = this.attack;
            return weaponDamage + attackDamage;
        }

    }

    summonPet(petName) {
        // if we have a pet in our this.pets array, that matches the name passed in as an
        // argument to this function, lets summon it.
        // we can loop over the pets we have to find it.
        for(let i = 0; i < this.pets.length;i++) {
            const pet = this.pets[i];  // this pet is equal to an individual pet element in our pets array
            if (pet.name === petName) {
                this.activePet = pet;
            }
        }
    }

    useDamageSpell(spellName) {
        for(let i = 0; i < this.spells.length;i++) {
            const spell = this.spells[i];
            if (spell.name === spellName) {
                this.damageSpell = spell;
                this.mana = this.mana - this.damageSpell.mana
            }
        }
    }

    useHealingSpell(spellName) {
        for(let i = 0; i < this.spells.length;i++) {
            const spell = this.spells[i];
            if (spell.name === spellName) {
                this.healSpell = spell;
                this.mana = this.mana - this.healSpell.mana;
                this.health = this.health + this.healSpell.power;
            }
        }
    }

    addWeapon(weapon) {
        this.weapons.push(weapon);
    }

    equipWeapon(weaponName) {
        for(let i = 0; i < this.weapons.length;i++) {
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
}

module.exports = Character