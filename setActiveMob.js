const displayMobInfo = require("./displayMobInfo");

// setActiveMob takes a mob class and sets the activeMob to is, and displays its information to the page
function setActiveMob(mob) {
  displayMobInfo(mob);
  return mob;
}

module.exports = setActiveMob;