document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const finishScreen = document.getElementById("finishScreen");
  const situationDiv = document.getElementById("situation");
  const choicesDiv = document.getElementById("choices");
  const terminalOut = document.getElementById("terminalOutput");

  const bars = {
    wall: document.getElementById("barWall"),
    trust: document.getElementById("barTrust"),
    power: document.getElementById("barPower"),
    right: document.getElementById("barRight")
  };

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  function playTone(f, d = 0.1, v = 0.05) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = f; g.gain.value = v;
    o.start(); o.stop(ctx.currentTime + d);
  }

  let stats = { wall: 100, trust: 60, power: 50, right: 0 };
  let current = 0;

  function log(text, type = "info") {
    const div = document.createElement("div");
    div.className = `log-${type}`;
    let i = 0;
    const timer = setInterval(() => {
      div.textContent = "> " + text.slice(0, i++);
      terminalOut.scrollTop = terminalOut.scrollHeight;
      if (i > text.length) clearInterval(timer);
    }, 15);
    terminalOut.appendChild(div);
  }

  const situations = [
    {
      text: "Die Regierung kündigt an, 'Leitkultur' wieder stärker in den Fokus zu rücken.",
      options: [
        { t: "Widersprechen – Kultur ist Vielfalt.", e: { wall:+8, trust:+8, power:-5, right:-3 }, c: "Firewall erkennt: Exklusiver Kulturbegriff aktiv.", l:"success" },
        { t: "Neutral bleiben – Fokus auf Integration.", e: { wall:+2, trust:+3, power:+2, right:+1 }, c: "Firewall: semantische Drift gering.", l:"info" },
        { t: "Begrüßen – Endlich klare Werte.", e: { wall:-8, trust:-7, power:+9, right:+6 }, c: "Firewall-Alarm: nationalistischer Ton erkannt.", l:"alert" }
      ]
    },
    {
      text: "Innenpolitik betont schnellere Abschiebungen als 'notwendig für Ordnung'.",
      options: [
        { t: "Humanität betonen.", e: { wall:+6, trust:+8, power:-4, right:-3 }, c: "Firewall erkennt autoritäre Semantik.", l:"success" },
        { t: "Pragmatisch zustimmen.", e: { wall:+1, trust:+2, power:+4, right:+2 }, c: "Firewall: moralische Abkühlung.", l:"warn" },
        { t: "Beifall – Endlich klare Kante.", e: { wall:-10, trust:-8, power:+9, right:+7 }, c: "Firewall-Kern instabil.", l:"alert" }
      ]
    },
    // ... weitere 8 Szenen nach gleichem Muster (kürze hier aus Platz)
  ];

  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    log("Systemstart... Firewall aktiviert.");
    current = 0;
    stats = { wall: 100, trust: 60, power: 50, right: 0 };
    terminalOut.innerHTML = "";
    loadSituation();
  });

  restartBtn.addEventListener("click", () => {
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  });

  function loadSituation() {
    if (current >= situations.length) return endGame();
    const s = situations[current];
    situationDiv.textContent = s.text;
    choicesDiv.innerHTML = "";
    s.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.t;
      btn.className = "choiceBtn";
      btn.onclick = () => choose(opt);
      choicesDiv.appendChild(btn);
    });
  }

  function choose(opt) {
    playTone(200);
    Object.keys(opt.e).forEach(k => stats[k] += opt.e[k]);
    Object.keys(stats).forEach(k => stats[k] = Math.max(0, Math.min(100, stats[k])));
    updateBars();
    log(opt.c, opt.l);
    current++;
    if (stats.wall <= 0 || stats.trust <= 0) return endGame();
    setTimeout(loadSituation, 1200);
  }

  function updateBars() {
    for (let k in bars) bars[k].style.width = stats[k] + "%";
    if (stats.right > 60) document.body.style.background = "#200";
  }

  function endGame() {
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");
    let msg = "";
    if (stats.right > 70) msg = "Firewall.exe ist vollständig nach rechts gekippt.";
    else if (stats.wall > 70 && stats.trust > 70) msg = "Firewall stabil – demokratische Werte gehalten.";
    else msg = "System instabil – Drift erkannt.";
    document.getElementById("finishText").textContent = msg;
    log("Analyse beendet. Protokoll gespeichert.", "info");
  }
});
