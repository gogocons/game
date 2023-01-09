const Spell = require("../spells/spell");
const Weapon = require("../weapons/weapon");

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
        this.activePet = null;
    }

    levelUp() {
        this.level = this.level + 1;
        if(this.className === "mage") {
            console.log("leveling up", this.className);
            this.mana = this.mana + 17;
            this.magic = this.magic + 1;
        } else if(this.className === "shaman") {
            console.log("leveling up", this.className);
            this.attack = this.attack + 1;
            this.health = this.health + 11;
            this.mana = this.mana + 2;
        } else if(this.className === "warlock") {
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
        } else if(this.castSpell) {
            const spellDamage = this.castSpell.power;
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
                this.castSpell = spell;
                this.mana = this.mana - this.castSpell.mana
            }
        }
    }

    equipWeapon(weaponName) {
        for(let i = 0; i < this.weapons.length;i++) {
            const weapon = this.weapons[i];
            if (weapon.name === weaponName) {
                this.equippedWeapon = weapon;
            }
        }
    }
}

module.exports = Character