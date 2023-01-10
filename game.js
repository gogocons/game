const Mage = require("./characters/mage");
const Shaman = require("./characters/shaman");
const Warlock = require("./characters/warlock");

const prompt = require("prompt-promise");

const config = require("./config/classNames");
const mobs = require("./mobs/mobs")

// gameLoop will start and run our game, initializing everything it needs
// to spawn an instance of our game.
// we want to prompt the user to make decisions, so we need to use a prompting library.
async function gameLoop() {
    // in my game loop, at the start, I want to get the class choice from the user.
    // they can pick mage, shaman, or warlock.

    // im going to store my character in this variable, once I pick a class,
    // I will create that class and put it in the character variable.
    let character;

    const classChoice = await prompt("Select your class: Mage, Shaman, or Warlock: ");
    console.log("My class choice is", classChoice);
    if(classChoice === config.classNames.MageClassName) {
        character = new Mage("Jaina");
    } else if(classChoice === config.classNames.ShamanClassName) {
        character = new Shaman("Thrall");
    } else if(classChoice === config.classNames.WarlockClassName) {
        character = new Warlock("Gul'dan");
    } else {
        throw Error("You typed a class that does not exist!")
    }

    // spawn a random mob, then let's prompt to fight it
    // lets just take the first mob in the array, then if we beat it, we can fight
    // the second one
    let mob = mobs[0]; // this should be the goblin
    console.log("A wild " + mob.name + " appears.");
    console.log("The " + mob.name + " has " + mob.health + " health.");

    while(character.health > 0 && mob.health > 0) {
        // while BOTH my character AND the mob I'm fighting have health, we fight.
        // when ONE of them stops having health, this block with stop running.
        console.log("Your character's spells:");
        console.log(character.spells);
        const move = await prompt("Select a move: fight, or spell: ");
        console.log("You selected " + move);
        const damage = character.getDamage(move);
        console.log("You attack for " + damage);
        const mobDamage = mob.damage;
        console.log(mob.name + " hits you for " + mob.damage);
        mob.health = mob.health - damage;
        character.health = character.health - mobDamage;
        console.log("Your health is " + character.health);
        console.log(mob.name + "'s health is " + mob.health);
    }

    console.log("Fight Over")
}

gameLoop();