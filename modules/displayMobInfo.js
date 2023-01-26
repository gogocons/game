// displayMobInfo displays the infrmation to the page for the active mob.
function displayMobInfo(mob) {
  const container = document.getElementById('mob-info');
  let mobInfoString = `Name: ${mob.getName()} <br/>`;
  mobInfoString += `Health: ${mob.getHealth()} <br/>`;
  mobInfoString += `Damage: ${mob.getDamage()} <br/>`;

  container.innerHTML = mobInfoString;
}

module.exports = displayMobInfo;