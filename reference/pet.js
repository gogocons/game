class Pet {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }

    getName() {
      return this.name;
    }
}

module.exports = Pet;