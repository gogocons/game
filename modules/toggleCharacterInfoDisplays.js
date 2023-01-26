// hides the character select container, and unhides the character info container,
// and the mob info container
function toggleCharacterInfoDisplays() {
  const selectContainer = document.getElementById("character-select-container");
  selectContainer.style.display = 'none';

  const infoContainer = document.getElementById("character-info-container");
  infoContainer.style.display = 'inline-block';

  const mobContainer = document.getElementById('mob-info-container');
  mobContainer.style.display = 'inline-block';
}

module.exports = toggleCharacterInfoDisplays;