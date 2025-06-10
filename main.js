/*
Gem Incremental v1.1.2
Author: Mathias Tichota
Licensed under the MIT License
*/
let gems = 0;
let clickPower = 1;
let helpPower = 0;
let pickaxeUpgrade = 10;
let minerCost = 100;
let bombCost = 1000;
let dynamiteCost = 10000;

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
  document.getElementById('bomb-cost').textContent = bombCost;
  document.getElementById('dynamite-cost').textContent = dynamiteCost;

  setCookie('gems', gems);
  setCookie('clickPower', clickPower);
  setCookie('helpPower', helpPower);
  setCookie('pickaxeUpgrade', pickaxeUpgrade);
  setCookie('minerCost', minerCost);
  setCookie('bombCost', bombCost);
  setCookie('dynamiteCost', dynamiteCost);
}

function mineGem() {
  gems += clickPower;
  updateDisplay();
}

function buyUpgrade() {
  if (gems >= pickaxeUpgrade) {
    gems -= pickaxeUpgrade;
    clickPower += 1;
    pickaxeUpgrade = Math.floor(pickaxeUpgrade * 1.15);
    updateDisplay();
  }
}

function buyMiner() {
  if (gems >= minerCost) {
    gems -= minerCost;
    helpPower += 10;
    minerCost = Math.floor(minerCost * 1.20);
    updateDisplay();
  }
}

function buyBomb() {
  if (gems >= bombCost) {
    gems -= bombCost;
    helpPower += 100;
    bombCost = Math.floor(bombCost * 1.25); //
    updateDisplay();
  }
}

function buyDynamite() {
  if (gems >= dynamiteCost) {
    gems -= dynamiteCost;
    helpPower += 1000;
    dynamiteCost = Math.floor(dynamiteCost * 1.30);
    updateDisplay();
  }
}

function loadSavedData() {
  const savedGems = getCookie('gems');
  const savedClick = getCookie('clickPower');
  const savedHelp = getCookie('helpPower');
  const savedPickaxe = getCookie('pickaxeUpgrade');
  const savedMiner = getCookie('minerCost');
  const savedBomb = getCookie('bombCost');
  const savedDynamite = getCookie('dynamiteCost');

  if (savedGems) gems = parseInt(savedGems);
  if (savedClick) clickPower = parseInt(savedClick);
  if (savedHelp) helpPower = parseInt(savedHelp);
  if (savedPickaxe) pickaxeUpgrade = parseInt(savedPickaxe);
  if (savedMiner) minerCost = parseInt(savedMiner);
  if (savedBomb) bombCost = parseInt(savedBomb);
  if (savedDynamite) dynamiteCost = parseInt(savedDynamite);
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
