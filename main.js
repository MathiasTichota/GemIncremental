/*
Gem Incremental v1.4.2
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
let robotCost = 100000;
let rocketCost = 1000000;

function formatNumber(num) {
  return num >= 1000 ? num.toExponential(2) : num.toString();
}

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return match ? match.pop() : null;
}

function updateDisplay() {
  document.getElementById('gem-count').textContent = formatNumber(gems);
  document.getElementById('click-power-display').textContent = `Click Power: ${formatNumber(clickPower)}`;
  document.getElementById('help-power-display').textContent = `Help Power: ${formatNumber(helpPower)}`;
  document.getElementById('upgrade-cost').textContent = formatNumber(pickaxeUpgrade);
  document.getElementById('miner-cost').textContent = formatNumber(minerCost);
  document.getElementById('bomb-cost').textContent = formatNumber(bombCost);
  document.getElementById('dynamite-cost').textContent = formatNumber(dynamiteCost);
  document.getElementById('robot-cost').textContent = formatNumber(robotCost);
  document.getElementById('rocket-cost').textContent = formatNumber(rocketCost);

  setCookie('gems', gems);
  setCookie('clickPower', clickPower);
  setCookie('helpPower', helpPower);
  setCookie('pickaxeUpgrade', pickaxeUpgrade);
  setCookie('minerCost', minerCost);
  setCookie('bombCost', bombCost);
  setCookie('dynamiteCost', dynamiteCost);
  setCookie('robotCost', robotCost);
  setCookie('rocketCost', rocketCost);
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
    bombCost = Math.floor(bombCost * 1.25);
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

function buyRobot() {
  if (gems >= robotCost) {
    gems -= robotCost;
    helpPower += 10000;
    robotCost = Math.floor(robotCost * 1.35);
    updateDisplay();
  }
}

function buyRocket() {
  if (gems >= rocketCost) {
    gems -= rocketCost;
    helpPower += 100000;
    rocketCost = Math.floor(rocketCost * 1.40);
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
  const savedRobot = getCookie('robotCost');
  const savedRocket = getCookie('rocketCost');

  if (savedGems) gems = parseInt(savedGems);
  if (savedClick) clickPower = parseInt(savedClick);
  if (savedHelp) helpPower = parseInt(savedHelp);
  if (savedPickaxe) pickaxeUpgrade = parseInt(savedPickaxe);
  if (savedMiner) minerCost = parseInt(savedMiner);
  if (savedBomb) bombCost = parseInt(savedBomb);
  if (savedDynamite) dynamiteCost = parseInt(savedDynamite);
  if (savedRobot) robotCost = parseInt(savedRobot);
  if (savedRocket) rocketCost = parseInt(savedRocket);
}

function applyOfflineProgress() {
  const lastTime = getCookie('lastSavedTime');
  if (lastTime) {
    const secondsPassed = Math.floor((Date.now() - parseInt(lastTime)) / 1000);
    if (helpPower > 0 && secondsPassed > 0) {
      const offlineGems = helpPower * secondsPassed;
      gems += offlineGems;
      showOfflinePopup(offlineGems);
    }
  }
}

function showOfflinePopup(earned) {
  const overlay = document.createElement("div");
  overlay.id = "offline-overlay";
  overlay.innerHTML = `
    <div class="offline-popup">
      <div class="offline-text">While you were away, you mined <strong>${formatNumber(earned)}</strong> gems!</div>
      <button id="offline-ok">Ok</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById("offline-ok").onclick = () => {
    overlay.remove();
    document.getElementById("game-root").classList.remove("blurred");
    updateDisplay();
  };
  document.getElementById("game-root").classList.add("blurred");
}

setInterval(() => {
  if (helpPower > 0) {
    gems += helpPower;
    updateDisplay();
  }
}, 1000);

window.addEventListener("beforeunload", () => {
  setCookie("lastSavedTime", Date.now());
});

window.onload = () => {
  loadSavedData();
  applyOfflineProgress();
  updateDisplay();
};
