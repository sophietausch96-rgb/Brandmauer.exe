// /game.js
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const finishScreen = document.getElementById("finishScreen");
  const situationDiv = document.getElementById("situation");
  const choicesDiv = document.getElementById("choices");
  const terminalOut = document.getElementById("terminalOutput");
  const counter = document.getElementById("counter");
  const bars = {
    wall: document.getElementById("barWall"),
    trust: document.getElementById("barTrust"),
    power: document.getElementById("barPower"),
    right: document.getElementById("barRight"),
  };

  // audio
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  function playTone(f, d = 0.09, v = 0.045) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "square"; o.frequency.value = f; g.gain.value = v;
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + d);
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

  // CDU-Statements (10)
  const situations = [
    {
      text: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
      options: [
        { t: "Widersprechen – Kultur ist Vielfalt.", e: { wall:+8, trust:+8, power:-5, right:-3 }, c: "Exklusiver Kulturbegriff erkannt – Diversität verteidigt.", l:"success" },
        { t: "Neutral – Fokus auf Werteunterricht.", e: { wall:+2, trust:+2, power:+2, right:+1 }, c: "Semantische Drift gering.", l:"info" },
        { t: "Beifall – Endlich klare Werte.", e: { wall:-8, trust:-7, power:+9, right:+6 }, c: "Nationalistische Rahmung verstärkt.", l:"alert" }
      ]
    },
    {
      text: "Innenpolitik: 'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
      options: [
        { t: "Humanität betonen.", e: { wall:+6, trust:+8, power:-4, right:-3 }, c: "Autoritäre Semantik zurückgewiesen.", l:"success" },
        { t: "Pragmatisch zustimmen.", e: { wall:+1, trust:+2, power:+4, right:+2 }, c: "Moralische Abkühlung messbar.", l:"warn" },
        { t: "Beifall – Klare Kante.", e: { wall:-10, trust:-8, power:+9, right:+7 }, c: "Brandmauer bröckelt.", l:"alert" }
      ]
    },
    {
      text: "CDU will Obergrenzen bei Asylverfahren und restriktivere Familennachzüge.",
      options: [
        { t: "Widersprechen – Schutz statt Obergrenzen.", e: { wall:+7, trust:+7, power:-5, right:-4 }, c: "Grundrechte priorisiert.", l:"success" },
        { t: "Neutral – Verfahren effizienter.", e: { wall:+2, trust:+2, power:+3, right:+1 }, c: "Technokratische Verschiebung.", l:"info" },
        { t: "Beifall – Druck erhöhen.", e: { wall:-7, trust:-6, power:+8, right:+6 }, c: "Restriktiver Kurs normalisiert.", l:"alert" }
      ]
    },
    {
      text: "CDU schlägt Polizei-Befugnisse für präventive Überwachung vor.",
      options: [
        { t: "Widersprechen – Freiheit vor Überwachung.", e: { wall:+6, trust:+6, power:-4, right:-3 }, c: "Grundrechte gesichert.", l:"success" },
        { t: "Neutral – Richtervorbehalt ausbauen.", e: { wall:+2, trust:+2, power:+3, right:+1 }, c: "Balance bleibt fragil.", l:"warn" },
        { t: "Beifall – Sicherheit zuerst.", e: { wall:-8, trust:-7, power:+8, right:+5 }, c: "Autoritärer Impuls verstärkt.", l:"alert" }
      ]
    },
    {
      text: "Parteitagsrede: 'Deutschland zuerst bei Sozialleistungen.'",
      options: [
        { t: "Widersprechen – Solidarität gilt allen.", e: { wall:+8, trust:+9, power:-6, right:-4 }, c: "Exklusion zurückgewiesen.", l:"success" },
        { t: "Neutral – Priorisierung prüfen.", e: { wall:+1, trust:+1, power:+3, right:+1 }, c: "Diskurs rutscht nach rechts.", l:"warn" },
        { t: "Beifall – Bevorzugung verankern.", e: { wall:-9, trust:-8, power:+9, right:+7 }, c: "Wettbewerb um Härte befeuert.", l:"alert" }
      ]
    },
    {
      text: "CDU fordert härtere Strafen für 'Klima-Kleber' und Demonstrationsauflagen.",
      options: [
        { t: "Widersprechen – Grundrecht Versammlung.", e: { wall:+6, trust:+7, power:-4, right:-3 }, c: "Protestschutz verteidigt.", l:"success" },
        { t: "Neutral – Verhältnismäßigkeit prüfen.", e: { wall:+2, trust:+2, power:+3, right:+1 }, c: "Repressionslogik sickert ein.", l:"warn" },
        { t: "Beifall – Null Toleranz.", e: { wall:-8, trust:-7, power:+7, right:+6 }, c: "Kriminalisierung normalisiert.", l:"alert" }
      ]
    },
    {
      text: "Programm: 'Deutschpflicht auf Schulhöfen' zur Integration.",
      options: [
        { t: "Widersprechen – Mehrsprachigkeit fördern.", e: { wall:+7, trust:+8, power:-4, right:-4 }, c: "Kulturelle Vielfalt geschützt.", l:"success" },
        { t: "Neutral – Förderkurse stärken.", e: { wall:+2, trust:+2, power:+2, right:+1 }, c: "Signal bleibt ausgrenzend.", l:"warn" },
        { t: "Beifall – Zwang ist nötig.", e: { wall:-7, trust:-6, power:+7, right:+6 }, c: "Sprachpolicing verstärkt.", l:"alert" }
      ]
    },
    {
      text: "Forderung nach Grenzkontrollen im Inland per 'Schleierfahndung'.",
      options: [
        { t: "Widersprechen – Bewegungsfreiheit wahren.", e: { wall:+5, trust:+6, power:-3, right:-3 }, c: "Freiheiten priorisiert.", l:"success" },
        { t: "Neutral – Lageabhängig einsetzen.", e: { wall:+2, trust:+1, power:+3, right:+1 }, c: "Normalisierung im Gange.", l:"warn" },
        { t: "Beifall – Dauerhaft einführen.", e: { wall:-7, trust:-5, power:+7, right:+5 }, c: "Grenzregime verfestigt.", l:"alert" }
      ]
    },
    {
      text: "CDU will Gendern in Behörden untersagen.",
      options: [
        { t: "Widersprechen – Sprache frei halten.", e: { wall:+6, trust:+7, power:-4, right:-3 }, c: "Kultureller Kulturkampf entschärft.", l:"success" },
        { t: "Neutral – Leitfaden statt Verbot.", e: { wall:+2, trust:+2, power:+2, right:+1 }, c: "Symbolpolitik bleibt.", l:"info" },
        { t: "Beifall – Verbot sofort.", e: { wall:-6, trust:-6, power:+7, right:+5 }, c: "Identitätspolitische Spaltung verstärkt.", l:"alert" }
      ]
    },
    {
      text: "Slogan-Kampagne: 'Illegale Migration stoppen – Grenzen dicht.'",
      options: [
        { t: "Widersprechen – Fluchtursachen bekämpfen.", e: { wall:+8, trust:+9, power:-6, right:-5 }, c: "Entmenschlichung zurückgewiesen.", l:"success" },
        { t: "Neutral – EU-Asylreform abwarten.", e: { wall:+1, trust:+2, power:+3, right:+1 }, c: "Verschiebung nach rechts hält an.", l:"warn" },
        { t: "Beifall – Durchgreifen.", e: { wall:-10, trust:-8, power:+10, right:+8 }, c: "Rechtsdrift kulminiert.", l:"alert" }
      ]
    }
  ];

  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    terminalOut.innerHTML = "";
    log("Systemstart... Firewall aktiviert.");
    current = 0;
    stats = { wall: 100, trust: 60, power: 50, right: 0 };
    updateBars();
    loadSituation();
  });

  restartBtn.addEventListener("click", () => {
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  });

  function loadSituation() {
    if (current >= situations.length) return endGame();
    const s = situations[current];
    counter.textContent = `Szenario ${current+1}/${situations.length}`;
    situationDiv.textContent = s.text;
    choicesDiv.innerHTML = "";
    s.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt.t;
      btn.className = "choiceBtn";
      btn.dataset.idx = String(i);
      btn.onclick = () => choose(opt);
      choicesDiv.appendChild(btn);
    });
  }

  function choose(opt) {
    playTone(200);
    for (const k of Object.keys(opt.e)) stats[k] = clamp(stats[k] + opt.e[k], 0, 100);
    updateBars();
    log(opt.c, opt.l);
    current++;
    if (stats.wall <= 0 || stats.trust <= 0) return endGame();
    setTimeout(loadSituation, 900);
  }

  function updateBars() {
    for (let k in bars) bars[k].style.width = stats[k] + "%";
    if (stats.right > 60) {
      document.body.classList.add("shake"); // why: warnender Effekt
      setTimeout(() => document.body.classList.remove("shake"), 400);
    }
  }

  function endGame() {
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");
    let msg = "";
    if (stats.right > 70) msg = "Firewall.exe ist vollständig nach rechts gekippt. Die Brandmauer ist gefallen.";
    else if (stats.wall > 70 && stats.trust > 70) msg = "Brandmauer hält. Linke Werte wurden wirksam verteidigt.";
    else msg = "System instabil – Rechtsdrift erkannt. Gegenrede ausbaufähig.";
    document.getElementById("finishText").textContent = msg;
    log("Analyse beendet. Protokoll gespeichert.", "info");
  }

  function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }

  // Shortcuts 1/2/3
  document.addEventListener("keydown", (e) => {
    if (gameScreen.classList.contains("hidden")) return;
    const s = situations[current]; if (!s) return;
    const map = { "1":0, "2":1, "3":2 };
    const idx = map[e.key]; if (idx==null) return;
    const opt = s.options[idx]; if (opt) choose(opt);
  });
});
