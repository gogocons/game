class Mob {
    constructor(name, damage, health) {
        this.name = name;
        this.damage = damage;
        this.health = health;
    }

    getHealth() {
      if(this.health < 0) {
        return 'Dead';
      } else {
        return this.health;
      }
    }

    getName() {
      return this.name;
    }

    getDamage() {
      return this.damage;
    }
}

module.exports = Mob