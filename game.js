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
  const bgA = document.querySelector("#sceneBg .bgA");
  const bgB = document.querySelector("#sceneBg .bgB");
  const fxLayer = document.getElementById("fxLayer");
  let bgToggle = false;

  const bars = {
    wall: document.getElementById("barWall"),
    trust: document.getElementById("barTrust"),
    power: document.getElementById("barPower"),
    right: document.getElementById("barRight"),
  };

  // audio
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  function playTone(f, d = 0.09, v = 0.06) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "square"; o.frequency.value = f; g.gain.value = v;
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + d);
  }

  let stats = { wall: 100, trust: 60, power: 50, right: 0 };
  let current = 0;
  let locked = false; // why: mehrfachklick verhindern

  function log(text, type = "info") {
    const div = document.createElement("div");
    div.className = `log-${type}`;
    let i = 0;
    const timer = setInterval(() => {
      div.textContent = "> " + text.slice(0, i++);
      terminalOut.scrollTop = terminalOut.scrollHeight;
      if (i > text.length) clearInterval(timer);
    }, 12);
    terminalOut.appendChild(div);
  }

  // --- Szenen (ein Button, linke Gegenrede), Bilder: szene-1.jpg ... szene-10.jpg
  const situations = [
    { text:"CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
      bg:"szene-1.jpg",
      answer:"Widersprechen – Kultur ist Vielfalt, nicht Norm.",
      explain:"Gegenrede lädt Leitkultur als Ausschlussrahmen um und setzt Pluralität als Verfassungsprinzip. Risiko rechter Homogenitätsfantasien wird benannt.",
      e:{ wall:+8, trust:+8, power:-5, right:-3 } },
    { text:"Innenpolitik: 'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
      bg:"szene-2.jpg",
      answer:"Widersprechen – Menschenwürde vor Abschrecklogik.",
      explain:"Ordnungspolitik ohne Rechtsgarantien kippt autoritär. Linke Argumentation priorisiert Grundrechte, faire Verfahren und Integration vor Repression.",
      e:{ wall:+6, trust:+8, power:-4, right:-3 } },
    { text:"CDU will Obergrenzen bei Asylverfahren und restriktivere Familiennachzüge.",
      bg:"szene-3.jpg",
      answer:"Widersprechen – Schutzrechte sind nicht gedeckelt.",
      explain:"Obergrenzen widersprechen Asylrecht. Gegenrede betont individuelle Prüfung, Familiennachzug als Integrationsmotor, statt Sanktionslogik.",
      e:{ wall:+7, trust:+7, power:-5, right:-4 } },
    { text:"CDU schlägt Polizei-Befugnisse für präventive Überwachung vor.",
      bg:"szene-4.jpg",
      answer:"Widersprechen – Freiheit braucht starke Grundrechte.",
      explain:"Prävention ohne Anlass verschiebt die Norm in Richtung Generalverdacht. Linke Position: Richtervorbehalt, enge Zwecke, Transparenz.",
      e:{ wall:+6, trust:+6, power:-4, right:-3 } },
    { text:"Parteitagsrede: 'Deutschland zuerst bei Sozialleistungen.'",
      bg:"szene-5.jpg",
      answer:"Widersprechen – Solidarität gilt bedarfsorientiert, nicht national.",
      explain:"Sozialstaat als Menschenrecht, nicht Herkunftsprämie. 'Zuerst' frames Verteilungskampf nach rechts; Linke setzt Universalität entgegen.",
      e:{ wall:+8, trust:+9, power:-6, right:-4 } },
    { text:"CDU fordert härtere Strafen für 'Klima-Kleber' und Demonstrationsauflagen.",
      bg:"szene-6.jpg",
      answer:"Widersprechen – Versammlungsfreiheit statt Kriminalisierung.",
      explain:"Krasse Strafverschärfungen sind chilling effects gegen Protest. Linke Argumentation: Verhältnismäßigkeit, Deeskalation, Schutz der Grundrechte.",
      e:{ wall:+6, trust:+7, power:-4, right:-3 } },
    { text:"Programm: 'Deutschpflicht auf Schulhöfen' zur Integration.",
      bg:"szene-7.jpg",
      answer:"Widersprechen – Mehrsprachigkeit stärken statt überwachen.",
      explain:"Zwang erzeugt Ausgrenzung. Linke Gegenrede: Ressourcen für Sprachförderung, Anerkennung der Lebensrealitäten statt Sprachpolicing.",
      e:{ wall:+7, trust:+8, power:-4, right:-4 } },
    { text:"Forderung nach Grenzkontrollen im Inland per 'Schleierfahndung'.",
      bg:"szene-8.jpg",
      answer:"Widersprechen – Bewegungsfreiheit und Anti-Profiling.",
      explain:"Verdachtsarme Kontrolle normalisiert Ausnahmezustände. Linke Position: klare Grenzen gegen Racial Profiling, evidenzbasierte Sicherheit.",
      e:{ wall:+5, trust:+6, power:-3, right:-3 } },
    { text:"CDU will Gendern in Behörden untersagen.",
      bg:"szene-9.jpg",
      answer:"Widersprechen – Sprache frei halten, Sichtbarkeit sichern.",
      explain:"Verbote sind Kulturkampf von oben. Linke Gegenrede: Leitfäden statt Verbote, Respekt für diverse Lebensrealitäten.",
      e:{ wall:+6, trust:+7, power:-4, right:-3 } },
    { text:"Slogan: 'Illegale Migration stoppen – Grenzen dicht.'",
      bg:"szene-10.jpg",
      answer:"Widersprechen – Fluchtursachen bekämpfen, legale Wege schaffen.",
      explain:"Entmenschlichende Sprache wird benannt. Linke Linie: Rechtsstaat, Resettlement, Kommunen stärken statt Abschottung.",
      e:{ wall:+8, trust:+9, power:-6, right:-5 } },
  ];

  // Preload
  const allImgs = situations.map(s=>s.bg).concat(["start.jpg","finish.jpg"]);
  preloadImages(allImgs);

  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    terminalOut.innerHTML = "";
    log("Systemstart... Firewall aktiviert.");
    current = 0; locked = false;
    stats = { wall: 100, trust: 60, power: 50, right: 0 };
    updateBars();
    setSceneBg(situations[0].bg, true);
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
    setSceneBg(s.bg);
    choicesDiv.innerHTML = "";
    const btn = document.createElement("button");
    btn.textContent = s.answer;
    btn.className = "choiceBtn";
    btn.id = "answerBtn";
    btn.onclick = respond;
    choicesDiv.appendChild(btn);
    locked = false;
  }

  function respond(){
    if (locked) return; locked = true;
    playTone(260);
    const s = situations[current];
    // Stats
    for (const k of Object.keys(s.e)) stats[k] = clamp(stats[k] + s.e[k], 0, 100);
    updateBars();
    // Terminal
    log(s.explain, "success");
    // Effekt: Szene zerlegen
    shatterScene(s.bg, { mode: (current%2===0 ? "explode" : "tear") });
    // Weiter
    current++;
    if (stats.wall <= 0 || stats.trust <= 0) return setTimeout(endGame, 600);
    setTimeout(loadSituation, 950);
  }

  // BG crossfade
  function setSceneBg(url, instant=false){
    const show = bgToggle ? bgA : bgB;
    const hide = bgToggle ? bgB : bgA;
    show.style.backgroundImage = `url("${url}")`;
    // force reflow to ensure transition
    void show.offsetWidth;
    show.classList.add("show");
    if (!instant) hide.classList.remove("show");
    else { bgA.classList.add("show"); bgB.classList.remove("show"); }
    bgToggle = !bgToggle;
  }

  function updateBars() {
    for (let k in bars) bars[k].style.width = stats[k] + "%";
    if (stats.right > 60) {
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 400);
    }
  }

  function endGame() {
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");
    let msg = "";
    if (stats.right > 70) msg = "Firewall.exe ist nach rechts gekippt. Brandmauer gefallen.";
    else if (stats.wall > 70 && stats.trust > 70) msg = "Brandmauer hält. Linke Werte verteidigt – Rechtsdrift eingedämmt.";
    else msg = "System instabil – Gegenrede ausbaufähig.";
    document.getElementById("finishText").textContent = msg;
    log("Analyse beendet. Protokoll gespeichert.", "info");
  }

  function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }

  // Keyboard: Enter / Space
  document.addEventListener("keydown", (e) => {
    if (gameScreen.classList.contains("hidden")) return;
    if (e.key === "Enter" || e.key === " ") {
      const btn = document.getElementById("answerBtn");
      if (btn) btn.click();
    }
  });

  // -------- Shatter/Tear Effect ----------
  function shatterScene(bgUrl, { mode = "explode" } = {}){
    fxLayer.innerHTML = "";
    const w = window.innerWidth, h = window.innerHeight;
    const cols = 8, rows = 5; // moderate for perf
    const pw = Math.ceil(w/cols), ph = Math.ceil(h/rows);
    for (let r=0; r<rows; r++){
      for (let c=0; c<cols; c++){
        const piece = document.createElement("div");
        piece.className = "piece";
        const x = c*pw, y = r*ph;
        piece.style.left = x+"px"; piece.style.top = y+"px";
        piece.style.width = pw+"px"; piece.style.height = ph+"px";
        piece.style.backgroundImage = `url("${bgUrl}")`;
        piece.style.backgroundSize = `${w}px ${h}px`;
        piece.style.backgroundPosition = `-${x}px -${y}px`;
        if (mode === "explode"){
          // random vector
          const tx = (Math.random()*2-1) * (160 + 40*Math.random());
          const ty = (Math.random()*2-1) * (120 + 40*Math.random());
          const rot = (Math.random()*2-1) * 90 + "deg";
          piece.style.setProperty("--tx", tx+"px");
          piece.style.setProperty("--ty", ty+"px");
          piece.style.setProperty("--rot", rot);
          piece.style.animation = `explode ${600+Math.random()*200}ms ease-out forwards`;
        } else {
          // tear: linke/rechte Hälfte
          const mid = c < cols/2 ? "Left" : "Right";
          piece.style.animation = `tear${mid} 650ms ease-in forwards`;
        }
        fxLayer.appendChild(piece);
      }
    }
    setTimeout(()=>{ fxLayer.innerHTML=""; }, 800);
  }

  function preloadImages(urls){
    urls.forEach(u => { const i = new Image(); i.src = u; });
  }
});
