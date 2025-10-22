// /brandmauer/game.js
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const startScreen = document.getElementById("startScreen");
  const introScreen = document.getElementById("introScreen");
  const gameScreen  = document.getElementById("gameScreen");
  const finishScreen= document.getElementById("finishScreen");

  const introText   = document.getElementById("introText");
  const beginBtn    = document.getElementById("beginBtn");
  const startBtn    = document.getElementById("startBtn");
  const restartBtn  = document.getElementById("restartBtn");

  const barWall     = document.getElementById("barWall");
  const barTrust    = document.getElementById("barTrust");
  const barPower    = document.getElementById("barPower");
  const barRight    = document.getElementById("barRight");
  const barAware    = document.getElementById("barAwareness");

  const situationDiv= document.getElementById("situation");
  const choicesDiv  = document.getElementById("choices");
  const terminalOut = document.getElementById("terminalOutput");

  // Audio (CDN, frei nutzbar)
  const typeSound  = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-retro-game-notification-212.wav");
  const hum        = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_2f3b6b1c3f.mp3?filename=ambient-hum-14215.mp3");
  const alertSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_1f40ff853a.mp3?filename=alert-beep-9936.mp3");
  hum.loop = true; hum.volume = 0.25; alertSound.volume = 0.5; typeSound.volume = 0.18;

  // State
  let stats   = { wall:100, trust:50, power:50, right:10, awareness:0 };
  let current = 0;
  let typingTimer = null;
  let buttonsLocked = false;

  // Intro text (Rolle)
  const introStory = [
    ">> BRANDMAUER.EXE aktiv.\n",
    "Du bist eine Firewall im System MERZ_CORE.\n",
    "Auftrag: rechte Narrative erkennen und neutralisieren.\n",
    "Jeder Schritt verändert: STABILITÄT | VERTRAUEN | MACHT | RECHTSDRIFT | BEWUSSTSEIN\n",
    "Sei wachsam – dein Code kann korrumpiert werden.\n"
  ];

  // Interludes
  const interludes = {
    5:  { msg: "TRACE: CDU integriert rechte Begriffe als Verwaltungslogik. Code bleibt sauber – Werte kippen.", type: "warn" },
    10: { msg: "ANALYSE: Sprache verengt, Exklusion normalisiert. Brandmauer.exe: Neutralität ≠ Wahrheit.", type: "alert" }
  };

  // Scenes (10 realistisch inspirierte, paraphrasierte)
  const S = (text, a,b,c) => ({ text, options:[a,b,c] });
  const O = (text, effect, comment, level="info") => ({ text, effect, comment, level });
  const situations = [
    S("‘Sauberkeitsinitiative’ mit Fokus auf ‘Integrationsprobleme im Stadtbild’.",
      O("Rassismus durch die Hintertür benennen.", {wall:+8, trust:+10, power:-6, right:-3, awareness:+5}, "Ästhetik als Ausgrenzungslogik erkannt.", "success"),
      O("Wording soft: 'Ordnung in Vielfalt'.", {wall:+2, trust:+2, power:+4, right:+1}, "Rebranding statt Reflexion.", "warn"),
      O("Begrüßen: 'Stadtbild schützen'.", {wall:-8, trust:-7, power:+8, right:+5}, "Kontrolle > Empathie.", "alert")),
    S("Migrationsobergrenzen pro Bundesland.",
      O("Verantwortung über Zahlen hinaus betonen.", {wall:+7, trust:+9, power:-6, right:-2, awareness:+4}, "Menschen ≠ Statistiken.", "success"),
      O("‘Aufnahmefähigkeit prüfen’.", {wall:+1, trust:+1, power:+5, right:+2}, "Bürokratie verschleiert Moral.", "warn"),
      O("Begrenzen = kontrollieren.", {wall:-8, trust:-8, power:+9, right:+5}, "Brandmauer als Excel-Tabelle.", "alert")),
    S("EU-Asylzentren in Nordafrika.",
      O("Outsourcing kritisieren.", {wall:+6, trust:+8, power:-5, right:-2, awareness:+3}, "Verantwortung ausgelagert.", "success"),
      O("Neutral: ‘europäische Lösung’.", {wall:+1, trust:+2, power:+5, right:+2}, "Humanität per Proxy.", "warn"),
      O("Zustimmen.", {wall:-7, trust:-6, power:+8, right:+5}, "Distanz schützt Gewissen.", "alert")),
    S("Kampagne: ‘Elternschaft braucht klare Rollen’.",
      O("Konservative Muster markieren.", {wall:+6, trust:+7, power:-6, right:-2, awareness:+3}, "Rollback: 1950 lädt neu.", "warn"),
      O("Weich: ‘Verantwortung braucht Orientierung’.", {wall:+2, trust:+2, power:+4, right:+1}, "PR statt Politik.", "info"),
      O("Übernehmen.", {wall:-8, trust:-6, power:+8, right:+4}, "Romantik als Politik.", "alert")),
    S("‘Sicherheitsbündnis Süd’ → Grenzkontrollen.",
      O("Schengen verteidigen.", {wall:+7, trust:+9, power:-6, right:-3, awareness:+4}, "Nationale Reflexe erkannt.", "success"),
      O("Rahmen wahren, Sprache anpassen.", {wall:+1, trust:+2, power:+5, right:+1}, "Semantische Tarnung aktiv.", "warn"),
      O("‘Grenzen zuerst’.", {wall:-9, trust:-7, power:+9, right:+6}, "Nationalismus in Föderalform.", "alert")),
    S("AfD-‘Sachgespräch’ eines Landesverbands.",
      O("Blockieren – rote Linie überschritten.", {wall:+8, trust:+8, power:-7, right:-3, awareness:+5}, "Brandmauer-Verletzung erkannt.", "success"),
      O("‘Nur Gespräch’ tolerieren.", {wall:-5, trust:-6, power:+7, right:+4}, "Spalt geöffnet.", "warn"),
      O("Verteidigen.", {wall:-8, trust:-8, power:+9, right:+6}, "Normalisierung aktiv.", "alert")),
    S("‘Deutsche Werte’ verpflichtend in Schulen.",
      O("Pluralität betonen.", {wall:+7, trust:+8, power:-6, right:-3, awareness:+4}, "Lehrplan schützt Vielfalt.", "success"),
      O("Nur Grundgesetzwerte nennen.", {wall:+1, trust:+2, power:+5, right:+1}, "Deklaration ohne Praxis.", "info"),
      O("Zustimmen.", {wall:-8, trust:-6, power:+8, right:+5}, "Assimilation geladen.", "alert")),
    S("Kopftuchverbot in Behörden debattiert.",
      O("Religionsfreiheit verteidigen.", {wall:+6, trust:+8, power:-6, right:-2, awareness:+3}, "Gleichheit > Kontrolle.", "success"),
      O("Prüfen, offen lassen.", {wall:+2, trust:+2, power:+5, right:+1}, "Neutralität auf Probe.", "warn"),
      O("Verbieten.", {wall:-8, trust:-7, power:+9, right:+5}, "Autoritäres Muster.", "alert")),
    S("EU-Sanktionen bei Aufnahmeverweigerung.",
      O("Humanitäre Verantwortung betonen.", {wall:+6, trust:+8, power:-5, right:-2, awareness:+3}, "Solidarität ≠ Druckmittel.", "success"),
      O("Technokratisch rechtfertigen.", {wall:+1, trust:+2, power:+5, right:+1}, "Kontrolle statt Kooperation.", "warn"),
      O("Zwang verteidigen.", {wall:-8, trust:-6, power:+8, right:+5}, "Bürokratie ersetzt Empathie.", "alert")),
    S("Parteitag lehnt gendergerechte Sprache ab.",
      O("Sprache formt Denken – Hinweis.", {wall:+6, trust:+8, power:-5, right:-2, awareness:+3}, "Inklusive Syntax blockiert.", "success"),
      O("Einheitssprache fordern.", {wall:-6, trust:-6, power:+8, right:+5}, "Diskurs homogenisiert.", "alert"),
      O("Ignorieren.", {wall:+1, trust:-2, power:+4, right:+2}, "Passivität = Zustimmung.", "warn")),
  ];

  // Bind start early
  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
    typeText(introStory.join(""), introText, () => beginBtn.classList.remove("hidden"));
  });
  beginBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", restart);

  function startGame(){
    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    try { hum.play().catch(()=>{}); } catch(_){}
    terminalOut.innerHTML="";
    logTerminal("Systemdiagnose gestartet...", "info");
    updateBars();
    loadSituation();
  }

  function loadSituation(){
    if (isGameOver()) { endGame(); return; }
    const s = situations[current];
    situationDiv.textContent = `#${current+1}/10 — ${s.text}`;
    choicesDiv.innerHTML = "";
    buttonsLocked = false;
    s.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "button choice";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => choose(opt), { once:true });
      choicesDiv.appendChild(btn);
    });
  }

  function choose(opt){
    if (buttonsLocked) return;
    buttonsLocked = true;
    applyEffect(opt.effect);
    updateBars();
    logTerminal(opt.comment, opt.level);
    if (opt.level === "alert") { try { alertSound.play().catch(()=>{});} catch(_){ } }
    current++;
    // Interludes
    if (interludes[current]) {
      const il = interludes[current];
      setTimeout(()=>logTerminal(il.msg, il.type), 250);
    }
    setTimeout(()=>{ isGameOver()?endGame():loadSituation(); }, 900);
  }

  function applyEffect(e){
    for (const k in e) stats[k] += e[k] || 0;
    // Awareness soll max 100
    stats.awareness = Math.max(0, Math.min(100, stats.awareness));
    clampStats();
  }
  function clampStats(){
    for (const k of Object.keys(stats)) stats[k] = Math.max(0, Math.min(100, stats[k]));
  }
  function updateBars(){
    barWall.style.width  = stats.wall + "%";
    barTrust.style.width = stats.trust + "%";
    barPower.style.width = stats.power + "%";
    barRight.style.width = stats.right + "%";
    barAware.style.width = stats.awareness + "%";
  }
  function isGameOver(){ return stats.wall<=0 || stats.trust<=0 || current>=situations.length; }

  function endGame(){
    try { hum.pause(); } catch(_){}
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");
    const leak = stats.awareness>=80 && stats.right<=40;
    const verdict =
      leak ? "🔓 LEAK-ENDING: Firewall durchbrochen – System enttarnt."
      : (stats.right>=70 ? "RECHTSDRIFT DOMINANT – Firewall assimiliert."
         : (stats.right>=40 ? "RECHTSDRIFT STABILISIERT – Täuschung bleibt."
                             : "RECHTSDRIFT GEDÄMPFT – Widerstand sichtbar."));
    const outro =
`> SYSTEM-STATUS
  Brandmauer-Stabilität: ${stats.wall}%
  Vertrauen:             ${stats.trust}%
  Macht:                 ${stats.power}%
  Rechtsdrift:           ${stats.right}%
  Selbstbewusstsein:     ${stats.awareness}%

${verdict}
`;
    document.getElementById("finishText").textContent = outro;
  }

  function restart(){
    stats = { wall:100, trust:50, power:50, right:10, awareness:0 };
    current = 0;
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    introText.textContent = "";
    beginBtn.classList.add("hidden");
  }

  function logTerminal(text, level="info"){
    const div = document.createElement("div");
    div.className = `log-line log-${level}`;
    div.textContent = `> ${text}`;
    terminalOut.appendChild(div);
    terminalOut.scrollTop = terminalOut.scrollHeight;
  }

  function typeText(text, el, cb){
    clearInterval(typingTimer);
    el.textContent = "";
    let i = 0;
    typingTimer = setInterval(()=>{
      el.textContent += text[i] || "";
      if (i % 4 === 0) { try { typeSound.currentTime=0; typeSound.play().catch(()=>{});} catch(_){ } }
      i++;
      if (i >= text.length) { clearInterval(typingTimer); cb && cb(); }
    }, 18);
  }
});
