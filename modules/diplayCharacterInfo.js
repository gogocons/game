// I know I can use this function to add new things to display
// this function should get EVERY attribute I want to diplay to the page, and add it there
function displayCharacterInfo(character) {
  const container = document.getElementById("character-info");
  let characeterInfoString = `Name: ${character.getName()} <br/>`;
  characeterInfoString += `Level ${character.getLevel()} ${character.getClassName()} <br/>`;
  characeterInfoString += `${character.getStatsString()}`;
  
  container.innerHTML = characeterInfoString;
}

module.exports = displayCharacterInfo;