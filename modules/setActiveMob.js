const displayMobInfo = require("./displayMobInfo");
const mobImage = document.getElementById("mob-image");

// setActiveMob takes a mob class and sets the activeMob to is, and displays its information to the page
function setActiveMob(mob) {
  mobImage.src = mob.image;
  displayMobInfo(mob);
  return mob;
}

module.exports = setActiveMob;