Game

In our game, you can choose a class, level up, cast spells, and attack mobs until you die.

# Day 1 of game

I want to be able to level up a character, and increases its stats.

The stats of each character are:
Level
Attack
Magic
Defense
Speed
Health
Mana

In our game, 10 is a very strong stat, the max to start with, 1 is the lowest.
These are the boundaries we are going to define.

Health and mana are different, they have no bounds.

Mage is a high mana, high mana, but low HP character that starts with the fireball spell.

Shaman is a mid-range allrounder that starts with Earthbound totem, the weapon thunderfury, and spell lightHeal.

Warlock is a high HP, weak character that will deal most of its damage with summons, ans start with an Imp pet.

## Game Rules

Our game logic dictates a character's damage is calculated using this algorithm:

- If a character has an activePet, we the the activePet's damage as starting value, and add it to the character's magic damage.
- If a character is casting a spell, we take the spell's damage and add it to character's magic damage.
- If a character has neither an activePet, nor a spell, we take their weapons damage and add it to the characters attack damage.

## Pet Logic

A character can have an array of pets, but can only have a single active pet. They have to summon the pet.