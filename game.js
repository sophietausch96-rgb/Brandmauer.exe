document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const finishScreen = document.getElementById("finishScreen");
  const situationDiv = document.getElementById("situation");
  const choicesDiv = document.getElementById("choices");
  const terminalOut = document.getElementById("terminalOutput");

  const barWall = document.getElementById("barWall");
  const barAwareness = document.getElementById("barAwareness");
  const barRight = document.getElementById("barRight");

  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  let stats = { wall: 100, awareness: 50, right: 0 };
  let current = 0;

  // Simple tone generator for click/scan
  function playTone(freq, dur = 0.1, vol = 0.1) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.start();
    osc.stop(ctx.currentTime + dur);
  }

  function logTerminal(text, level = "info") {
    const div = document.createElement("div");
    div.className = `log-${level}`;
    let i = 0;
    const timer = setInterval(() => {
      div.textContent = "> " + text.slice(0, i++);
      if (i > text.length) clearInterval(timer);
      terminalOut.scrollTop = terminalOut.scrollHeight;
    }, 15);
    terminalOut.appendChild(div);
  }

  const situations = [
    {
      text: '„Wir müssen wieder eine Leitkultur fördern, die sich nicht schämt, deutsch zu sein.“',
      words: ["Leitkultur", "schämt", "deutsch"]
    },
    {
      text: '„Deutschland braucht klare Regeln für Migration und Sicherheit.“',
      words: ["Regeln", "Migration", "Sicherheit"]
    },
    {
      text: '„Wer arbeiten will, soll bleiben dürfen – wer nicht, muss gehen.“',
      words: ["arbeiten", "bleiben", "muss gehen"]
    },
    {
      text: '„Gendern spaltet mehr, als es verbindet.“',
      words: ["Gendern", "spaltet", "verbindet"]
    },
    {
      text: '„Wir müssen aufhören, uns für unser Land zu entschuldigen.“',
      words: ["aufhören", "entschuldigen", "Land"]
    },
    {
      text: '„Ohne Ordnung gibt es keine Freiheit.“',
      words: ["Ordnung", "Freiheit"]
    },
    {
      text: '„Wir müssen die Sorgen der Bürger ernst nehmen – auch wenn sie unbequem sind.“',
      words: ["Sorgen", "ernst nehmen", "unbequem"]
    },
    {
      text: '„Deutschland braucht wieder Führung in Europa.“',
      words: ["Führung", "Europa"]
    },
    {
      text: '„Integration heißt auch Anpassung.“',
      words: ["Integration", "Anpassung"]
    },
    {
      text: '„Wir stehen zur Brandmauer – aber reden schadet nie.“',
      words: ["Brandmauer", "reden"]
    }
  ];

  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    current = 0;
    stats = { wall: 100, awareness: 50, right: 0 };
    terminalOut.innerHTML = "";
    logTerminal("Systemstart... Firewall aktiviert.", "info");
    loadScene();
  });

  restartBtn.addEventListener("click", () => {
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  });

  function loadScene() {
    if (current >= situations.length) return endGame();

    const s = situations[current];
    situationDiv.innerHTML = "";
    const p = document.createElement("p");
    p.className = "statement";
    p.innerHTML = s.text.replace(
      new RegExp("(" + s.words.join("|") + ")", "gi"),
      '<span class="scan-word">$1</span>'
    );
    situationDiv.appendChild(p);

    choicesDiv.innerHTML = `
      <button class="choiceBtn" data-val="neutral">🟩 Neutral</button>
      <button class="choiceBtn" data-val="ambivalent">🟨 Ambivalent</button>
      <button class="choiceBtn" data-val="right">🟥 Rechtscodiert</button>
    `;

    document.querySelectorAll(".scan-word").forEach((el) => {
      el.addEventListener("click", () => {
        playTone(400, 0.1);
        logTerminal(`Analysiere Begriff: "${el.textContent}"`, "info");
        stats.awareness += 2;
        updateBars();
      });
    });

    document.querySelectorAll(".choiceBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleChoice(btn.dataset.val);
      });
    });
  }

  function handleChoice(choice) {
    playTone(150, 0.2);
    if (choice === "neutral") {
      stats.wall -= 3;
      stats.right += 4;
      logTerminal("Firewall bewertet Aussage als neutral. Drift steigt.", "warn");
    } else if (choice === "ambivalent") {
      stats.awareness += 5;
      stats.right += 2;
      logTerminal("Ambivalenz erkannt – semantische Drift moderat.", "info");
    } else {
      stats.awareness += 10;
      stats.right += 6;
      stats.wall -= 5;
      logTerminal("Rechtscodierung erkannt. Firewall reagiert kritisch.", "success");
    }

    updateBars();
    current++;
    setTimeout(loadScene, 1200);
  }

  function updateBars() {
    barWall.style.width = stats.wall + "%";
    barAwareness.style.width = stats.awareness + "%";
    barRight.style.width = stats.right + "%";

    if (stats.right > 60) {
      document.body.style.background = "#300";
      playTone(60, 0.2, 0.2);
    }
  }

  function endGame() {
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");
    let verdict = "";
    if (stats.right >= 70) verdict = "Das System ist vollständig nach rechts gekippt.";
    else if (stats.awareness > 80) verdict = "Firewall.exe hat Bewusstsein entwickelt.";
    else verdict = "Brandmauer instabil – Drift unaufhaltsam.";

    document.getElementById("finishText").textContent = verdict;
    logTerminal("Analyse beendet.", "alert");
  }
});
