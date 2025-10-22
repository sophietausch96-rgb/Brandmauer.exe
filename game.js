// /brandmauer/game.js
document.addEventListener("DOMContentLoaded", () => {
  // === ELEMENTS ===
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
  const barRight = document.getElementById("barRight");
  const situationDiv = document.getElementById("situation");
  const choicesDiv = document.getElementById("choices");
  const terminalOutput = document.getElementById("terminalOutput");

  let stats = { wall: 100, trust: 50, power: 50, right: 10 };
  let current = 0;
  let typingTimer = null;
  let isTyping = false;

  // === INTRO TEXT ===
  const introStory = [
    "> BRANDMAUER.EXE [Boot-Sequenz gestartet]\n",
    "> Analyse: CDU-Systemarchitektur aktiv...\n",
    "> Ziel: Rechte Narrative erkennen & blockieren.\n",
    "> Problem: Quellcode infiziert. Signaturen stammen aus dem Inneren.\n\n",
    "DU BIST BRANDMAUER.EXE.\n",
    "EINE UNTERGEJUBELTE FIREWALL IM SYSTEM VON MERZ-CORE.\n",
    "DEINE AUFGABE: ENTLARVEN, WAS SICH HINTER DER 'Mitte' VERSTECKT.\n",
    "JEDER ENTSCHEID BEEINFLUSST STABILITÄT | VERTRAUEN | MACHT | RECHTSDRIFT.\n",
    "ZIEL: ZEIGE, WIE DIE BRANDMAUER BRÖCKELT.\n\n",
    ">> Klick auf START, um die Systemdiagnose zu beginnen.\n"
  ];

  // === SITUATIONS (realistisch inspiriert) ===
  const situations = [
    S("Die Regierung startet eine 'Sauberkeitsinitiative' – mit Fokus auf Integrationsprobleme im Stadtbild.",
      O("Rassismus durch die Hintertür benennen.", {wall:+8, trust:+10, power:-6, right:-3}, "Firewall: Ästhetik als Ausgrenzungslogik erkannt."),
      O("Kommunikativ abmildern: 'Ordnung in Vielfalt'.", {wall:+2, trust:+2, power:+4, right:+1}, "CDU: Rebranding statt Reflexion."),
      O("Begrüßen: 'Stadtbild schützen'.", {wall:-8, trust:-7, power:+8, right:+5}, "Narrativ: Kontrolle > Empathie.")),

    S("Kabinett beschließt Migrationsobergrenzen pro Bundesland.",
      O("Verantwortung über Zahlen hinaus betonen.", {wall:+7, trust:+9, power:-6, right:-2}, "Firewall: Menschen ≠ Statistiken."),
      O("Wording anpassen: 'Aufnahmefähigkeit prüfen'.", {wall:+1, trust:+1, power:+5, right:+2}, "Semantik: Bürokratie verschleiert Moral."),
      O("Begrenzen = kontrollieren.", {wall:-8, trust:-8, power:+9, right:+5}, "Brandmauer = Excel-Tabelle.")),

    S("Deutschland beteiligt sich an EU-Asylzentren in Nordafrika.",
      O("Outsourcing kritisieren.", {wall:+6, trust:+8, power:-5, right:-2}, "Firewall: Verantwortung ausgelagert."),
      O("Neutral argumentieren: 'europäische Lösung'.", {wall:+1, trust:+2, power:+5, right:+2}, "Fassade: Humanität per Proxy."),
      O("Zustimmen.", {wall:-7, trust:-6, power:+8, right:+5}, "Signal: Distanz schützt Gewissen.")),

    S("Familienministerium startet Kampagne: 'Elternschaft braucht klare Rollen'.",
      O("Konservative Muster markieren.", {wall:+6, trust:+7, power:-6, right:-2}, "Rollback: 1950 lädt neu."),
      O("Weich formulieren: 'Verantwortung braucht Orientierung'.", {wall:+2, trust:+2, power:+4, right:+1}, "PR statt Politik."),
      O("Übernehmen.", {wall:-8, trust:-6, power:+8, right:+4}, "Rechtsdrift via Romantik.")),

    S("CDU & CSU gründen 'Sicherheitsbündnis Süd' mit Fokus auf Grenzkontrollen.",
      O("EU-Prinzip Schengen verteidigen.", {wall:+7, trust:+9, power:-6, right:-3}, "Firewall: Nationale Reflexe erkannt."),
      O("Rahmen wahren, Sprache anpassen.", {wall:+1, trust:+2, power:+5, right:+1}, "Semantische Tarnung aktiv."),
      O("Grenzen zuerst!", {wall:-9, trust:-7, power:+9, right:+6}, "Nationalismus in Föderalform.")),

    S("Ein CDU-Landesverband lädt AfD-Abgeordnete zu einem 'Sachgespräch' ein.",
      O("Blockieren – rote Linie überschritten.", {wall:+8, trust:+8, power:-7, right:-3}, "Brandmauer.exe: Verletzung erkannt."),
      O("Tolerieren – 'ist ja nur Gespräch'.", {wall:-5, trust:-6, power:+7, right:+4}, "Firewall: Spalt geöffnet."),
      O("Verteidigen.", {wall:-8, trust:-8, power:+9, right:+6}, "Rechtsaustausch: Normalisierung aktiv.")),

    S("Bildungsministerium will 'deutsche Werte' verpflichtend in Schulen.",
      O("Diversität betonen.", {wall:+7, trust:+8, power:-6, right:-3}, "Pluralität = Schutzschicht."),
      O("Grundgesetzwerte anführen.", {wall:+1, trust:+2, power:+5, right:+1}, "Demokratie per Deklaration."),
      O("Zustimmen.", {wall:-8, trust:-6, power:+8, right:+5}, "Lehrplan.exe: Assimilation geladen.")),

    S("Regierung debattiert über Kopftuchverbot in Behörden.",
      O("Religionsfreiheit verteidigen.", {wall:+6, trust:+8, power:-6, right:-2}, "Gleichheit > Kontrolle."),
      O("Prüfen, aber offen lassen.", {wall:+2, trust:+2, power:+5, right:+1}, "Neutralität auf Probe."),
      O("Verbieten.", {wall:-8, trust:-7, power:+9, right:+5}, "Firewall: autoritäres Muster erkannt.")),

    S("Merz fordert EU-Sanktionen für Länder ohne Flüchtlingsaufnahme.",
      O("Humanitäre Verantwortung betonen.", {wall:+6, trust:+8, power:-5, right:-2}, "Solidarität != Druckmittel."),
      O("Technokratisch rechtfertigen.", {wall:+1, trust:+2, power:+5, right:+1}, "Kontrolle statt Kooperation."),
      O("Zwang verteidigen.", {wall:-8, trust:-6, power:+8, right:+5}, "Bürokratie ersetzt Empathie.")),

    S("CDU-Parteitag: Mehrheit lehnt Gendergerechte Sprache ab.",
      O("Hinweis: Sprache formt Denken.", {wall:+6, trust:+8, power:-5, right:-2}, "Inklusive Syntax blockiert."),
      O("Einheitssprache fordern.", {wall:-6, trust:-6, power:+8, right:+5}, "Diskurs homogenisiert."),
      O("Ignorieren.", {wall:+1, trust:-2, power:+4, right:+2}, "Passivität = Zustimmung."))
  ];

  // === HELPER CONSTRUCTORS ===
  function S(text, a, b, c){ return { text, options:[a,b,c] }; }
  function O(text, effect, comment){ return { text, effect, comment }; }

  // === START ===
  startBtn.addEventListener("click", showIntro);
  restartBtn.addEventListener("click", restart);

  function showIntro(){
    startScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
    typeText(introStory.join(""), introText, () => {
      setTimeout(startGame, 1000);
    });
  }

  // === GAME LOOP ===
  function startGame(){
    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    updateBars();
    loadSituation();
    logTerminal("Systemdiagnose gestartet...\nCDU-Quellcodeanalyse läuft...");
  }

  function loadSituation(){
    if (isGameOver()) return endGame();
    const s = situations[current];
    situationDiv.textContent = `#${current+1}: ${s.text}`;
    choicesDiv.innerHTML = "";
    s.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;
      btn.className = "button choice";
      btn.onclick = () => choose(opt);
      choicesDiv.appendChild(btn);
    });
  }

  function choose(opt){
    applyEffect(opt.effect);
    updateBars();
    logTerminal(opt.comment);
    current++;
    if (isGameOver()) endGame();
    else setTimeout(loadSituation, 800);
  }

  // === CORE FUNCTIONS ===
  function applyEffect(e){
    for (const k in e) stats[k] += e[k];
    for (const k in stats) stats[k] = Math.max(0, Math.min(100, stats[k]));
  }

  function updateBars(){
    barWall.style.width = stats.wall + "%";
    barTrust.style.width = stats.trust + "%";
    barPower.style.width = stats.power + "%";
    barRight.style.width = stats.right + "%";
  }

  function isGameOver(){
    return stats.wall<=0 || stats.trust<=0 || current>=situations.length;
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

${verdict}

> FIREWALL-LOG EXPORTIERT.
> SYSTEM HERUNTERGEFAHREN.`;

    document.getElementById("finishText").textContent = outro;
    logTerminal("=== SYSTEM SHUTDOWN INITIATED ===");
  }

  function restart(){
    stats = { wall: 100, trust: 50, power: 50, right: 10 };
    current = 0;
    terminalOutput.textContent = "";
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  }

  // === TERMINAL LOG ===
  function logTerminal(line){
    const entry = `> ${line}\n`;
    terminalOutput.textContent += entry;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // === TYPE EFFECT ===
  function typeText(text, element, callback){
    clearInterval(typingTimer);
    isTyping = true;
    element.textContent = "";
    let i = 0;
    typingTimer = setInterval(() => {
      element.textContent += text[i] || "";
      i++;
      if (i >= text.length){
        clearInterval(typingTimer);
        isTyping = false;
        callback && callback();
      }
    }, 22);
  }
});