// /brandmauer/game.js
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const startScreen = document.getElementById("startScreen");
  const introScreen  = document.getElementById("introScreen");
  const gameScreen   = document.getElementById("gameScreen");
  const finishScreen = document.getElementById("finishScreen");

  const startIntro = document.getElementById("startIntro");
  const introText  = document.getElementById("introText");

  const startBtn   = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");

  const viewportBox = document.getElementById("viewportBox");
  const barWall   = document.getElementById("barWall");
  const barTrust  = document.getElementById("barTrust");
  const barPower  = document.getElementById("barPower");
  const barRight  = document.getElementById("barRight");
  const barRightWrap = document.getElementById("barRightWrap");
  const barAwareness = document.getElementById("barAwareness");

  const situationDiv = document.getElementById("situation");
  const choicesDiv   = document.getElementById("choices");

  const terminalOutput = document.getElementById("terminalOutput");

  // State
  let stats = { wall: 100, trust: 50, power: 50, right: 10, awareness: 0 };
  let current = 0;
  let typingTimer = null;
  let buttonsLocked = false;

  // Start-role text (Typewriter on start screen)
  const startRole = [
    ">> SYSTEM: BRANDMAUER.EXE bereit\n",
    "Du bist eine eingeschleuste Firewall im System von MERZ-CORE.\n",
    "Auftrag: Rechte Narrative erkennen, markieren, entlarven.\n",
    "Achtung: Die Signaturen stammen aus dem Inneren des Systems.\n\n",
    "Jeder Entscheid verändert: STABILITÄT | VERTRAUEN | MACHT | RECHTSDRIFT | SELBSTBEWUSSTSEIN\n",
    "Ziel: Zeige, wie die Brandmauer bröckelt – oder werde assimiliert.\n"
  ];

  // Intro sequence (after start)
  const introStory = [
    "> BOOT: BRANDMAUER.EXE v2025\n",
    "> LADE: MERZ-CORE [OK]\n",
    "> MODULE: 'Abgrenzung nach rechts' [AKTIV]\n",
    "> MODULE: 'Härtere Migration' [AKTIV]\n",
    "> STATUS: Widersprüche erkannt — Quelle: internes System.\n",
    "\nMISSION: ENTLARVEN ODER ASSIMILIEREN.\n"
  ];

  // Interludes (as terminal logs)
  const interludes = {
    5:  { msg: "TRACE: CDU integriert rechte Begriffe als Verwaltungslogik.\nCode bleibt sauber – Werte kippen.", type: "warn" },
    10: { msg: "MERZ-CORE ANALYSE: Sprache verengt. Exklusion normalisiert.\nBrandmauer.exe: Neutralität ≠ Wahrheit.", type: "alert" }
  };

  // Situations (10; realistic-inspired, paraphrased)
  const situations = [
    S("Die Regierung startet eine 'Sauberkeitsinitiative' – mit Fokus auf Integrationsprobleme im Stadtbild.",
      O("Rassismus durch die Hintertür benennen.", {wall:+8, trust:+10, power:-6, right:-3}, "Ästhetik als Ausgrenzungslogik erkannt.", "success"),
      O("Kommunikativ abmildern: 'Ordnung in Vielfalt'.", {wall:+2, trust:+2, power:+4, right:+1}, "Rebranding statt Reflexion.", "warn"),
      O("Begrüßen: 'Stadtbild schützen'.", {wall:-8, trust:-7, power:+8, right:+5}, "Kontrolle > Empathie.", "alert")),

    S("Kabinett beschließt Migrationsobergrenzen pro Bundesland.",
      O("Verantwortung über Zahlen hinaus betonen.", {wall:+7, trust:+9, power:-6, right:-2}, "Menschen ≠ Statistiken.", "success"),
      O("Wording anpassen: 'Aufnahmefähigkeit prüfen'.", {wall:+1, trust:+1, power:+5, right:+2}, "Bürokratie verschleiert Moral.", "warn"),
      O("Begrenzen = kontrollieren.", {wall:-8, trust:-8, power:+9, right:+5}, "Brandmauer als Excel-Tabelle.", "alert")),

    S("Deutschland beteiligt sich an EU-Asylzentren in Nordafrika.",
      O("Outsourcing kritisieren.", {wall:+6, trust:+8, power:-5, right:-2}, "Verantwortung ausgelagert.", "success"),
      O("Neutral argumentieren: 'europäische Lösung'.", {wall:+1, trust:+2, power:+5, right:+2}, "Humanität per Proxy.", "warn"),
      O("Zustimmen.", {wall:-7, trust:-6, power:+8, right:+5}, "Distanz schützt Gewissen.", "alert")),

    S("Familienministerium startet Kampagne: 'Elternschaft braucht klare Rollen'.",
      O("Konservative Muster markieren.", {wall:+6, trust:+7, power:-6, right:-2}, "Rollback: 1950 lädt neu.", "warn"),
      O("Weich formulieren: 'Verantwortung braucht Orientierung'.", {wall:+2, trust:+2, power:+4, right:+1}, "PR statt Politik.", "info"),
      O("Übernehmen.", {wall:-8, trust:-6, power:+8, right:+4}, "Rechtsdrift via Romantik.", "alert")),

    S("CDU & CSU gründen 'Sicherheitsbündnis Süd' mit Fokus auf Grenzkontrollen.",
      O("EU-Prinzip Schengen verteidigen.", {wall:+7, trust:+9, power:-6, right:-3}, "Nationale Reflexe erkannt.", "success"),
      O("Rahmen wahren, Sprache anpassen.", {wall:+1, trust:+2, power:+5, right:+1}, "Semantische Tarnung aktiv.", "warn"),
      O("Grenzen zuerst!", {wall:-9, trust:-7, power:+9, right:+6}, "Nationalismus in Föderalform.", "alert")),

    S("Ein CDU-Landesverband lädt AfD-Abgeordnete zu einem 'Sachgespräch' ein.",
      O("Blockieren – rote Linie überschritten.", {wall:+8, trust:+8, power:-7, right:-3}, "Brandmauer-Verletzung erkannt.", "success"),
      O("Tolerieren – 'ist ja nur Gespräch'.", {wall:-5, trust:-6, power:+7, right:+4}, "Spalt geöffnet.", "warn"),
      O("Verteidigen.", {wall:-8, trust:-8, power:+9, right:+6}, "Normalisierung aktiv.", "alert")),

    S("Bildungsministerium will 'deutsche Werte' verpflichtend in Schulen.",
      O("Diversität betonen.", {wall:+7, trust:+8, power:-6, right:-3}, "Pluralität = Schutzschicht.", "success"),
      O("Grundgesetzwerte anführen.", {wall:+1, trust:+2, power:+5, right:+1}, "Demokratie per Deklaration.", "info"),
      O("Zustimmen.", {wall:-8, trust:-6, power:+8, right:+5}, "Assimilation geladen.", "alert")),

    S("Regierung debattiert über Kopftuchverbot in Behörden.",
      O("Religionsfreiheit verteidigen.", {wall:+6, trust:+8, power:-6, right:-2}, "Gleichheit > Kontrolle.", "success"),
      O("Prüfen, aber offen lassen.", {wall:+2, trust:+2, power:+5, right:+1}, "Neutralität auf Probe.", "warn"),
      O("Verbieten.", {wall:-8, trust:-7, power:+9, right:+5}, "Autoritäres Muster erkannt.", "alert")),

    S("Merz fordert EU-Sanktionen für Länder ohne Flüchtlingsaufnahme.",
      O("Humanitäre Verantwortung betonen.", {wall:+6, trust:+8, power:-5, right:-2}, "Solidarität ≠ Druckmittel.", "success"),
      O("Technokratisch rechtfertigen.", {wall:+1, trust:+2, power:+5, right:+1}, "Kontrolle statt Kooperation.", "warn"),
      O("Zwang verteidigen.", {wall:-8, trust:-6, power:+8, right:+5}, "Bürokratie ersetzt Empathie.", "alert")),

    S("CDU-Parteitag: Mehrheit lehnt gendergerechte Sprache ab.",
      O("Hinweis: Sprache formt Denken.", {wall:+6, trust:+8, power:-5, right:-2}, "Inklusive Syntax blockiert.", "success"),
      O("Einheitssprache fordern.", {wall:-6, trust:-6, power:+8, right:+5}, "Diskurs homogenisiert.", "alert"),
      O("Ignorieren.", {wall:+1, trust:-2, power:+4, right:+2}, "Passivität = Zustimmung.", "warn")),
  ];

  function S(text, a,b,c){ return { text, options:[a,b,c] }; }
  function O(text, effect, comment, level="info"){ return { text, effect, comment, level }; }

  // Init start typing
  typeText(startRole.join(""), startIntro);

  // Events
  startBtn.addEventListener("click", showIntro);
  restartBtn.addEventListener("click", restart);

  function showIntro(){
    startScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
    typeText(introStory.join(""), introText, () => setTimeout(startGame, 900));
  }

  function startGame(){
    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    terminalOutput.innerHTML = "";
    logTerminal("Systemdiagnose gestartet...", "info");
    logTerminal("CDU-Quellcodeanalyse läuft...", "info");
    updateBars();
    loadSituation();
  }

  function loadSituation(){
    if (isGameOver()){ endGame(); return; }
    viewportGlitch();
    const s = situations[current];
    situationDiv.textContent = `#${current+1}/10 — ${s.text}`;
    choicesDiv.innerHTML = "";
    buttonsLocked = false;

    s.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;
      btn.className = "button choice";
      btn.addEventListener("click", () => choose(opt), { once: true });
      choicesDiv.appendChild(btn);
    });
  }

  function choose(opt){
    if (buttonsLocked) return;
    buttonsLocked = true;

    applyEffect(opt.effect);
    // Awareness grows when right effect is reduced (blocking right shift)
    if (opt.effect.right < 0) stats.awareness = Math.min(100, stats.awareness + 5);

    updateBars();
    logTerminal(opt.comment, opt.level);

    current++;

    // Interludes as terminal logs
    if (interludes[current]){
      const il = interludes[current];
      setTimeout(() => logTerminal(il.msg, il.type), 300);
    }

    // Auto-continue after short delay (BUGFIX)
    setTimeout(() => {
      if (isGameOver()) endGame();
      else loadSituation();
    }, 900);
  }

  function applyEffect(e){
    stats.wall += e.wall || 0;
    stats.trust += e.trust || 0;
    stats.power += e.power || 0;
    stats.right += e.right || 0;
    clampStats();
  }

  function clampStats(){
    for (const k of Object.keys(stats)){
      stats[k] = Math.max(0, Math.min(100, stats[k]));
    }
  }

  function updateBars(){
    barWall.style.width  = stats.wall + "%";
    barTrust.style.width = stats.trust + "%";
    barPower.style.width = stats.power + "%";
    barRight.style.width = stats.right + "%";
    barAwareness.style.width = stats.awareness + "%";

    // Right-drift danger pulse + screen flash
    if (stats.right > 70){
      barRight.classList.add("danger");
      document.body.classList.add("warning");
      setTimeout(()=>document.body.classList.remove("warning"), 500);
    } else {
      barRight.classList.remove("danger");
    }
  }

  function isGameOver(){
    return stats.wall <= 0 || stats.trust <= 0 || current >= situations.length;
  }

  function endGame(){
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");

    const verdict =
      stats.right >= 70 ? "RECHTSDRIFT DOMINANT – Firewall assimiliert."
      : stats.right >= 40 ? "RECHTSDRIFT STABILISIERT – Täuschung bleibt bestehen."
      : "RECHTSDRIFT GEDÄMPFT – Widerstand im System.";

    const outro =
`> SYSTEM-STATUS:
  Brandmauer-Stabilität: ${stats.wall}%
  Vertrauen: ${stats.trust}%
  Macht: ${stats.power}%
  Rechtsdrift: ${stats.right}%
  Selbstbewusstsein.exe: ${stats.awareness}%

${verdict}

> FIREWALL-LOG EXPORTIERT.
> SYSTEM HERUNTERGEFAHREN.`;

    document.getElementById("finishText").textContent = outro;
    logTerminal("=== SYSTEM SHUTDOWN INITIATED ===", "warn");
  }

  function restart(){
    stats = { wall: 100, trust: 50, power: 50, right: 10, awareness: 0 };
    current = 0;
    terminalOutput.innerHTML = "";
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    startIntro.textContent = "";
    typeText(startRole.join(""), startIntro);
  }

  // Terminal logging with levels
  function logTerminal(text, level="info"){
    const line = document.createElement("div");
    line.className = `log-line log-${level}`;
    line.textContent = `> ${text}`;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Typewriter
  function typeText(text, element, callback){
    clearInterval(typingTimer);
    element.textContent = "";
    let i = 0;
    typingTimer = setInterval(() => {
      element.textContent += text[i] || "";
      i++;
      if (i >= text.length){
        clearInterval(typingTimer);
        callback && callback();
      }
    }, 18);
  }

  // Small viewport glitch on scene change
  function viewportGlitch(){
    viewportBox.classList.add("glitch");
    setTimeout(()=>viewportBox.classList.remove("glitch"), 300);
  }
});