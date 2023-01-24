class Mob {
    constructor(name, damage, health) {
        this.name = name;
        this.damage = damage;
        this.health = health;
    }

    getHealth() {
      return this.health;
    }

    getName() {
      return this.name;
    }

    getDamage() {
      return this.damage;
    }
}

module.exports = Mob