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

// === REALISTISCHE 10 SZENEN, paraphrasiert & satirisch analysierend ===
const situations = [
  {
    text: "Nach einer Reihe von Messerangriffen fordert der Kanzler eine „deutsche Leitkultur“, um Zusammenhalt zu stärken. Die Opposition wirft ihm vor, rechte Narrative zu bedienen.",
    options: [
      { text: "Leitkultur? Erinnerung an koloniale Muster.", effect: { wall:+8, trust:+10, power:-6, right:-4, awareness:+6 }, comment: "Firewall erkennt kulturelle Überheblichkeit hinter dem Begriff.", level: "success" },
      { text: "Leitkultur betonen, aber mit demokratischen Werten füllen.", effect: { wall:+3, trust:+3, power:+4, right:+2 }, comment: "Firewall warnt: Semantik getarnt als Toleranz.", level: "warn" },
      { text: "Leitkultur verteidigen als nationale Identität.", effect: { wall:-10, trust:-9, power:+10, right:+6 }, comment: "Brandmauer wankt: Diskurs kippt ins Exklusive.", level: "alert" }
    ]
  },
  {
    text: "Innenministerin kündigt 'schnellere Abschiebungen' an – besonders für Menschen aus Nordafrika. Menschenrechtsorganisationen sprechen von Symbolpolitik.",
    options: [
      { text: "Menschrechte betonen, Abschiebungen kritisch prüfen.", effect: { wall:+6, trust:+8, power:-5, right:-3, awareness:+4 }, comment: "Firewall: Effizienz ersetzt Empathie.", level: "success" },
      { text: "„Schnellere Verfahren“ unterstützen, aber Fairness einfordern.", effect: { wall:+2, trust:+2, power:+5, right:+2 }, comment: "Firewall meldet: Bürokratie als Moralersatz.", level: "warn" },
      { text: "Härteres Vorgehen fordern.", effect: { wall:-8, trust:-7, power:+9, right:+6 }, comment: "Firewall überlastet: Abschottung als Staatsräson.", level: "alert" }
    ]
  },
  {
    text: "Die CDU kündigt ein neues 'Sicherheitsgesetz' an, das Polizei mehr Überwachungsrechte gibt. Kritiker warnen vor Eingriffen in die Grundrechte.",
    options: [
      { text: "Bürgerrechte priorisieren – Freiheit vor Angst.", effect: { wall:+7, trust:+8, power:-6, right:-3, awareness:+5 }, comment: "Firewall stärkt demokratische Resilienz.", level: "success" },
      { text: "Zustimmen, aber unabhängige Kontrolle fordern.", effect: { wall:+2, trust:+3, power:+4, right:+2 }, comment: "Firewall registriert: Kontrolle ≠ Vertrauen.", level: "warn" },
      { text: "Mehr Überwachung befürworten – Sicherheit zuerst.", effect: { wall:-9, trust:-8, power:+9, right:+5 }, comment: "Firewall-Alarm: Autorität ersetzt Freiheit.", level: "alert" }
    ]
  },
  {
    text: "Auf einem Parteitag ruft ein Landesverband zur 'Kooperation mit allen demokratischen Kräften' auf – einschließlich der AfD.",
    options: [
      { text: "Klare Grenze ziehen: AfD ≠ demokratisch.", effect: { wall:+10, trust:+9, power:-8, right:-5, awareness:+5 }, comment: "Brandmauer stabilisiert sich – klare Haltung.", level: "success" },
      { text: "Gespräche auf Landesebene offen lassen.", effect: { wall:-5, trust:-6, power:+6, right:+4 }, comment: "Firewall: Öffnung unter Vorwand der Vernunft.", level: "warn" },
      { text: "Kooperation befürworten, um „Pragmatismus zu zeigen“.", effect: { wall:-10, trust:-9, power:+9, right:+7 }, comment: "Brandmauer.exe meldet: Rechtsaustritt erkannt.", level: "alert" }
    ]
  },
  {
    text: "Der Kanzler bezeichnet in einem Interview Seenotrettung als 'Migrationsmagnet'. NGOs reagieren empört.",
    options: [
      { text: "Öffentlich widersprechen – Humanität ist kein Magnet.", effect: { wall:+8, trust:+9, power:-6, right:-4, awareness:+4 }, comment: "Firewall erkennt Zynismus hinter Statistik.", level: "success" },
      { text: "Thema relativieren – Fokus auf EU-Regelung.", effect: { wall:+1, trust:+2, power:+5, right:+2 }, comment: "Firewall verzeichnet semantische Kühlung.", level: "warn" },
      { text: "Aussage stützen – Abschreckung schützt.", effect: { wall:-9, trust:-8, power:+9, right:+6 }, comment: "Firewall schmilzt – Empathie deaktiviert.", level: "alert" }
    ]
  },
  {
    text: "In einer Talkshow nennt ein CDU-Generalsekretär den Begriff 'Gendern' eine 'Verunstaltung der Sprache'.",
    options: [
      { text: "Sprache als Spiegel der Realität verteidigen.", effect: { wall:+7, trust:+8, power:-5, right:-3, awareness:+5 }, comment: "Firewall erkennt: Sprache formt Demokratie.", level: "success" },
      { text: "Neutral bleiben – 'beide Seiten verstehen'.", effect: { wall:+2, trust:+1, power:+4, right:+2 }, comment: "Firewall-Status: Passivität = Akzeptanz.", level: "warn" },
      { text: "Beifall: 'Endlich Klartext!'", effect: { wall:-9, trust:-7, power:+9, right:+6 }, comment: "Firewall-Kern beschädigt – Rechtsdrift aktiv.", level: "alert" }
    ]
  },
  {
    text: "Ein CDU-Minister bezeichnet Klimaproteste als 'wohlstandsverwöhnt und antidemokratisch'.",
    options: [
      { text: "Demokratische Teilhabe betonen.", effect: { wall:+7, trust:+8, power:-5, right:-3, awareness:+5 }, comment: "Firewall erkennt: Protest = Demokratie.", level: "success" },
      { text: "Kritik akzeptieren, aber Radikalisierung betonen.", effect: { wall:+2, trust:+2, power:+5, right:+2 }, comment: "Firewall meldet: Diskurs verschoben.", level: "warn" },
      { text: "Angriff unterstützen: Ordnung vor Freiheit.", effect: { wall:-9, trust:-8, power:+9, right:+6 }, comment: "Firewall: Autoritärer Ton akzeptiert.", level: "alert" }
    ]
  },
  {
    text: "Der Kanzler fordert bei einem Parteitag: 'Wir müssen uns von der AfD nicht abgrenzen, sondern sie entlarven, indem wir ihre Themen übernehmen.'",
    options: [
      { text: "Ablehnen – Themenübernahme stärkt Gegner.", effect: { wall:+10, trust:+9, power:-7, right:-5, awareness:+6 }, comment: "Firewall blockiert rechte Mimese.", level: "success" },
      { text: "Strategisch zustimmen – Inhalte „neutralisieren“.", effect: { wall:-4, trust:-4, power:+6, right:+4 }, comment: "Firewall warnt: Sprachinfektion erkannt.", level: "warn" },
      { text: "Voll zustimmen – Themen sind Volksnähe.", effect: { wall:-10, trust:-9, power:+9, right:+8 }, comment: "Brandmauer.exe: ideologische Assimilation vollständig.", level: "alert" }
    ]
  },
  {
    text: "Die CDU schlägt eine 'Verfassungsänderung zum Schutz traditioneller Familienwerte' vor.",
    options: [
      { text: "Kritisch prüfen – Gleichheit gilt für alle.", effect: { wall:+8, trust:+8, power:-6, right:-4, awareness:+5 }, comment: "Firewall erkennt: Moralpolitik statt Menschenrechte.", level: "success" },
      { text: "Symbolik akzeptieren – gesellschaftlichen Frieden betonen.", effect: { wall:+1, trust:+2, power:+4, right:+2 }, comment: "Firewall: Anpassung an Mehrheiten.", level: "warn" },
      { text: "Begrüßen – Tradition als Schutzschild.", effect: { wall:-9, trust:-8, power:+9, right:+6 }, comment: "Firewall-Fehler: Patriarchat.exe aktiviert.", level: "alert" }
    ]
  },
  {
    text: "In seiner Neujahrsansprache spricht Merz von 'deutscher Führungskraft in Europa' – Kommentatoren sehen Anklänge an alte Größenfantasien.",
    options: [
      { text: "Warnen – Verantwortung statt Führungsanspruch.", effect: { wall:+9, trust:+9, power:-7, right:-4, awareness:+6 }, comment: "Firewall erkennt imperialen Unterton.", level: "success" },
      { text: "Diplomatisch einordnen – 'nur ökonomisch gemeint'.", effect: { wall:+2, trust:+3, power:+5, right:+2 }, comment: "Firewall registriert semantische Glättung.", level: "warn" },
      { text: "Bejubeln – Endlich „starke Nation“.", effect: { wall:-10, trust:-8, power:+10, right:+7 }, comment: "Firewall-Kern instabil – Nationalstolz überschreibt Ethik.", level: "alert" }
    ]
  }
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
