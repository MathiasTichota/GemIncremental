/*
Gem Incremental v1.0.0
Author: Mathias Tichota
Licensed under the MIT License
*/
let gems = 0;
let clickPower = 1;
let helpPower = 0;
let pickaxeUpgrade = 10;
let minerCost = 100;

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return match ? match.pop() : null;
}

function updateDisplay() {
  document.getElementById('gem-count').textContent = gems;
  document.getElementById('click-power-display').textContent = `Click Power: ${clickPower}`;
  document.getElementById('help-power-display').textContent = `Help Power: ${helpPower}`;
  document.getElementById('upgrade-cost').textContent = pickaxeUpgrade;
  document.getElementById('miner-cost').textContent = minerCost;

  setCookie('gems', gems);
  setCookie('clickPower', clickPower);
  setCookie('helpPower', helpPower);
  setCookie('pickaxeUpgrade', pickaxeUpgrade);
  setCookie('minerCost', minerCost);
}

function mineGem() {
  gems += clickPower;
  updateDisplay();
}

function buyUpgrade() {
  if (gems >= pickaxeUpgrade) {
    gems -= pickaxeUpgrade;
    clickPower += 1;
    pickaxeUpgrade = Math.floor(pickaxeUpgrade * 1.35);
    updateDisplay();
  }
}

function buyMiner() {
  if (gems >= minerCost) {
    gems -= minerCost;
    helpPower += 10;
    minerCost = Math.floor(minerCost * 1.45);
    updateDisplay();
  }
}

function loadSavedData() {
  const savedGems = getCookie('gems');
  const savedClick = getCookie('clickPower');
  const savedHelp = getCookie('helpPower');
  const savedPickaxe = getCookie('pickaxeUpgrade');
  const savedMiner = getCookie('minerCost');

  if (savedGems) gems = parseInt(savedGems);
  if (savedClick) clickPower = parseInt(savedClick);
  if (savedHelp) helpPower = parseInt(savedHelp);
  if (savedPickaxe) pickaxeUpgrade = parseInt(savedPickaxe);
  if (savedMiner) minerCost = parseInt(savedMiner);
}

setInterval(() => {
  if (helpPower > 0) {
    gems += helpPower;
    updateDisplay();
  }
}, 1000);

window.onload = () => {
  loadSavedData();
  updateDisplay();
};
