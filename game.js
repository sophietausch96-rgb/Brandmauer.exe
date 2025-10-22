document.addEventListener("DOMContentLoaded", () => {

  // === ELEMENT REFERENCES ===
  const startScreen = document.getElementById("startScreen");
  const introScreen = document.getElementById("introScreen");
  const gameScreen = document.getElementById("gameScreen");
  const finishScreen = document.getElementById("finishScreen");

  const introText = document.getElementById("introText");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");

  const barWall = document.getElementById("barWall");
  const barTrust = document.getElementById("barTrust");
  const barPower = document.getElementById("barPower");
  const situationDiv = document.getElementById("situation");
  const choicesDiv = document.getElementById("choices");

  let stats = { wall: 100, trust: 50, power: 50 };
  let current = 0;

  // === INTRO STORY TEXT ===
  const introStory = [
    "> LOAD MODULE: BRANDMAUER.EXE v2025\n",
    "> INITIALISIERE FIREWALL-PROTOKOLL...\n",
    "> PROTOKOLL: „Keine Kooperation mit der AfD!“ geladen.\n",
    "> PROTOKOLL: „Wir müssen mit allen demokratischen Kräften reden.“ geladen.\n",
    "> STATUS: Widersprüche erkannt.\n\n",
    "DU BIST EIN FIREWALL-PROGRAMM IM POLITISCHEN SYSTEM DER CDU.\n",
    "DEINE AUFGABE: Rechte Narrative abwehren – aber dein CODE IST WIDERSPRÜCHLICH.\n",
    "JEDER SCHRITT VERÄNDERT: STABILITÄT | VERTRAUEN | MACHTBALANCE.\n",
    "ZIEL: Rechte Narrative der CDU aufdecken.\n"
  ];

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
    }
  ];

  // === EVENT HANDLERS ===
  startBtn.addEventListener("click", showIntro);
  restartBtn.addEventListener("click", restart);

  // === FUNCTIONS ===
  function showIntro() {
    startScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
    typeText(introStory.join(""), introText, () => {
      setTimeout(startGame, 1500);
    });
  }

  function typeText(text, element, callback) {
    let i = 0;
    element.textContent = "";
    const timer = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        if (callback) callback();
      }
    }, 25);
  }

  function startGame() {
    introScreen.classList.add("hidden");
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

});