const gameScreen = document.getElementById("gameScreen");
const startScreen = document.getElementById("startScreen");
const finishScreen = document.getElementById("finishScreen");

const barWall = document.getElementById("barWall");
const barTrust = document.getElementById("barTrust");
const barPower = document.getElementById("barPower");

const situationDiv = document.getElementById("situation");
const choicesDiv = document.getElementById("choices");

let stats = { wall: 100, trust: 50, power: 50 };
let current = 0;

const situations = [
  {
    text: "Ein CDU-Landesverband schlägt vor, in Ostdeutschland mit der AfD über Sachthemen zu sprechen.",
    options: [
      { text: "Brandmauer bleibt – keine Kooperation!", effect: { wall:+10, trust:+10, power:-5 } },
      { text: "Wir müssen mit allen demokratischen Kräften reden.", effect: { wall:-15, trust:-10, power:+10 } },
      { text: "Das ist Sache der Länder.", effect: { wall:-5, trust:-5, power:+5 } }
    ]
  },
  {
    text: "Die Parteiführung fordert 'Härtere Abschiebungen für Ordnung und Sicherheit'.",
    options: [
      { text: "Klingt nach rechter Rhetorik – Firewall anheben!", effect: { wall:+5, trust:+10, power:-10 } },
      { text: "Endlich klare Worte zur Migration.", effect: { wall:-10, trust:-10, power:+10 } },
      { text: "Ignorieren – kein Kommentar.", effect: { wall:-5, trust:-5, power:0 } }
    ]
  },
  {
    text: "Ein CDU-Abgeordneter nennt Fridays for Future 'linksextreme Spinner'.",
    options: [
      { text: "Firewall verstärken: Respekt statt Spott!", effect: { wall:+10, trust:+5, power:-10 } },
      { text: "Das spiegelt legitime Kritik wider.", effect: { wall:-10, trust:-10, power:+5 } },
      { text: "Wir dulden Meinungsvielfalt.", effect: { wall:-5, trust:-5, power:+0 } }
    ]
  }
];

function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  updateBars();
  loadSituation();
}

function updateBars() {
  barWall.style.width = stats.wall + "%";
  barTrust.style.width = stats.trust + "%";
  barPower.style.width = stats.power + "%";
}

function loadSituation() {
  if (stats.wall <= 0 || stats.trust <= 0 || current >= situations.length) {
    endGame();
    return;
  }
  const s = situations[current];
  situationDiv.textContent = s.text;
  choicesDiv.innerHTML = "";
  s.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.className = "button choice";
    btn.onclick = () => choose(opt.effect);
    choicesDiv.appendChild(btn);
  });
}

function choose(effect) {
  stats.wall += effect.wall;
  stats.trust += effect.trust;
  stats.power += effect.power;

  Object.keys(stats).forEach(k => {
    if (stats[k] > 100) stats[k] = 100;
    if (stats[k] < 0) stats[k] = 0;
  });

  updateBars();
  current++;
  loadSituation();
}

function endGame() {
  gameScreen.classList.add("hidden");
  finishScreen.classList.remove("hidden");
}

function restart() {
  stats = { wall: 100, trust: 50, power: 50 };
  current = 0;
  finishScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}