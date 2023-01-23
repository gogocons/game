// this our main game loop file

// 1. I want to let a user create a character from alist of my given classes.

let character;

function chooseClass(text) {
  console.log("You picked", text);
}

const mageButton = document.getElementById("mage");
const shamanButton = document.getElementById("shaman");
const warlockButton = document.getElementById("warlock");

mageButton.addEventListener('click', function() {
  chooseClass("mage");
});

shamanButton.addEventListener('click', function() {
  chooseClass("shaman");
});

warlockButton.addEventListener('click', function() {
  chooseClass("warlock");
});