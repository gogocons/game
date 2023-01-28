class Mob {
  constructor(name, damage, health, image) {
    this.name = name;
    this.damage = damage;
    this.health = health;
    this.image = image;
  }

  getHealth() {
    if (this.health <= 0) {
      return "Dead";
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

module.exports = Mob;
