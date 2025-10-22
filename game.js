// /brandmauer/game.js
document.addEventListener("DOMContentLoaded", () => {
  // Elements
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
  const overlay = document.getElementById("overlay");
  const overlayText = document.getElementById("overlayText");
  const overlayContinue = document.getElementById("overlayContinue");

  // State
  let stats = { wall: 100, trust: 50, power: 50, right: 10 };
  let current = 0;
  let typingTimer = null;

  // Intro text (satirisch, fiktional)
  const introStory = [
    "> LOAD MODULE: BRANDMAUER.EXE v2025\n",
    "> EINSCHLEUSUNG ABGESCHLOSSEN... \n",
    "> LADE SYSTEM: MERZ-CORE // CDU-COMMS\n",
    "> PROTOKOLL: 'Abgrenzung nach rechts' aktiv.\n",
    "> PROTOKOLL: 'Härtere Migration' aktiv.\n",
    "> STATUS: Widersprüche erkannt. Quelle: internes System.\n\n",
    "ICH BIN BRANDMAUER.EXE.\n",
    "ICH SOLL RECHTE NARRATIVE BLOCKIEREN.\n",
    "ABER DIE SIGNATUREN KOMMEN VON INNEN.\n",
    "MISSION: ENTLARVEN ODER ASSIMILIEREN.\n"
  ];

  // Interludes at 5, 10, 15
  const interludes = {
    5: "SYSTEM-ALARM:\nDie Brandmauer schrumpft.\nCDU integriert rechte Script-Segmente.",
    10: "TRACE:\nVerschiebung nach rechts stabil.\nWortwahl normalisiert Exklusion.",
    15: "DIAGNOSE:\nRechtsdrift dominiert Core.\nBrandmauer.exe meldet: Täuschung ≠ Schutz."
  };

  // 20 Szenen (satirisch inspiriert; keine 1:1-Zitate)
  const situations = [
    S("Grenzsicherung durch nationale Asylzentren.",
      O("Blockiere – Menschenrechte priorisieren.", {wall:+8, trust:+10, power:-6, right:-2}, "Rechtsmuster erkannt: Sicherheit > Würde."),
      O("Abmildern – 'Prüfen nationale Lösungen'.", {wall:+0, trust:-4, power:+6, right:+2}, "Euphemismus integriert – Drift steigt."),
      O("Übernehmen – 'Grenzen schützen'.", {wall:-10, trust:-10, power:+10, right:+6}, "Normalisierung autoritärer Sprache.")),
    S("Leitkultur als Maßstab in Programmatik.",
      O("Isoliere Begriff – rechtsoffen.", {wall:+7, trust:+8, power:-5, right:-1}, "Leitkultur ist Exklusions-API."),
      O("Umschreiben auf 'Gemeinschaft'.", {wall:+2, trust:+2, power:+3, right:+1}, "Kosmetik über Code."),
      O("Unverändert übernehmen.", {wall:-8, trust:-6, power:+8, right:+5}, "Exklusiver Default gesetzt.")),
    S("Kampagne: Härtere Abschiebungen.",
      O("Menschenrechte vor Tempo.", {wall:+6, trust:+7, power:-6, right:-1}, "Würde > Effizienz."),
      O("Soft: 'Verfahren beschleunigen'.", {wall:+0, trust:-3, power:+6, right:+2}, "Beschleunigung ohne Schutz = Drift."),
      O("Volle Härte.", {wall:-10, trust:-8, power:+10, right:+6}, "Härte als Politikstil.")),
    S("‘Mit allen demokratischen Kräften reden’ (AfD inkludiert).",
      O("Block – Anschlussfähigkeit stoppen.", {wall:+8, trust:+9, power:-7, right:-2}, "Firewall setzt Grenze."),
      O("Gespräche sind Pflicht.", {wall:-6, trust:-6, power:+8, right:+4}, "Schleuse geöffnet."),
      O("Sache der Länder.", {wall:-4, trust:-5, power:+6, right:+3}, "Delegation als Akzeptanz.")),
    S("Gemeinsame Abstimmung mit AfD für restriktives Gesetz.",
      O("Abbruch – Extremistenflag.", {wall:+7, trust:+6, power:-8, right:-3}, "Kooperationsrisiko entschärft."),
      O("Thema selbst besetzen.", {wall:-5, trust:-4, power:+7, right:+3}, "Inhaltskonvergenz toleriert."),
      O("Durchziehen.", {wall:-9, trust:-8, power:+9, right:+6}, "Brandmauer ≈ Placebo.")),
    // 6
    S("Slogan: Heimat schützen, Zukunft wagen.",
      O("Entlarven – Exklusions-Marker.", {wall:+6, trust:+7, power:-5, right:-1}, "Heimat als Ausschlussfilter."),
      O("Umschreiben: Gemeinschaft schützen.", {wall:+1, trust:+2, power:+3, right:+1}, "Semantik verschoben, Logik bleibt."),
      O("Übernehmen.", {wall:-7, trust:-6, power:+8, right:+4}, "Signal an rechte Ränder.")),
    S("Werbung: Ordnung statt Chaos (Migrationsbezug).",
      O("Warnen – autoritäres Framing.", {wall:+6, trust:+6, power:-6, right:-1}, "Ordnung > Freiheit – Warnstufe."),
      O("Neutralisieren: 'Sicherheit mit Freiheit'.", {wall:+1, trust:+2, power:+3, right:+1}, "Glatte Oberfläche, harter Kern."),
      O("Unverändert live.", {wall:-8, trust:-7, power:+9, right:+5}, "Angst verkauft sich.")),
    S("EU-Regeln nicht über nationalem Recht.",
      O("Block – EU-Verpflichtung zählt.", {wall:+7, trust:+8, power:-6, right:-2}, "Supranationaler Schutz bewahrt."),
      O("Reform prüfen.", {wall:+0, trust:-3, power:+6, right:+2}, "Trittbrett zur Nationalvorrang-Idee."),
      O("Freigeben.", {wall:-8, trust:-6, power:+9, right:+5}, "Nationalismus-Boost.")),
    S("Asyl als 'Systemrisiko' gerahmt.",
      O("Fehler melden – Entmenschlichung.", {wall:+6, trust:+8, power:-6, right:-2}, "Menschen ≠ Risiken."),
      O("Abmildern der Sprache.", {wall:+0, trust:-3, power:+5, right:+2}, "Form statt Inhalt."),
      O("Verstärken.", {wall:-9, trust:-8, power:+9, right:+5}, "Stigma implementiert.")),
    S("Leitkultur in Schulpolitik.",
      O("Filter an.", {wall:+6, trust:+7, power:-6, right:-1}, "Schule ≠ Assimilationswerk."),
      O("Pluralität betonen.", {wall:+2, trust:+3, power:+3, right:+1}, "Diversität kosmetisch."),
      O("Leitkultur live.", {wall:-8, trust:-6, power:+8, right:+5}, "Normierung priorisiert.")),
    // 11
    S("Spot: Von 'Wir schaffen das' zu 'Wir schützen uns'.",
      O("Analyse – Abschottungslogik.", {wall:+6, trust:+7, power:-6, right:-1}, "Schutz als Losung."),
      O("Weichzeichnen.", {wall:+1, trust:+2, power:+3, right:+1}, "Ton ändert Kern nicht."),
      O("Unverändert senden.", {wall:-8, trust:-6, power:+8, right:+5}, "Abwehr statt Aufnahme.")),
    S("Deutschpflicht im Ausland als Integrationsidee.",
      O("Alarm – Pflichten statt Chancen.", {wall:+6, trust:+7, power:-5, right:-1}, "Integration ≠ Zwang."),
      O("Angebote statt Pflichten.", {wall:+2, trust:+3, power:+2, right:+1}, "Angebote = ok, Ton bleibt."),
      O("Pflicht pushen.", {wall:-7, trust:-6, power:+8, right:+5}, "Zwang als Default.")),
    S("Strategie: AfD-Wähler 'abholen'.",
      O("Stopp – Nähe normalisiert Inhalte.", {wall:+7, trust:+6, power:-7, right:-3}, "Fischen im rechten Becken."),
      O("Alle ansprechen.", {wall:+1, trust:+2, power:+2, right:+1}, "Unschärfe als Deckung."),
      O("Zielgruppe fixieren.", {wall:-8, trust:-7, power:+8, right:+5}, "Brücke ohne Brandmauer.")),
    S("Grenzkontrollen im Schengen-Raum.",
      O("Warnen – Freiheitseingriff.", {wall:+6, trust:+7, power:-6, right:-2}, "Europa wird kleiner."),
      O("Prüfen-Sprech.", {wall:+0, trust:-3, power:+5, right:+2}, "Türspalt zum Rollback."),
      O("Einführen.", {wall:-8, trust:-6, power:+8, right:+5}, "Schengen auf Pause.")),
    S("‘Multikulti gescheitert’ – neue Werte.",
      O("Dekodieren – Monokultur.", {wall:+6, trust:+7, power:-6, right:-2}, "Pluralität unter Druck."),
      O("Wertegemeinschaft weich.", {wall:+1, trust:+2, power:+3, right:+1}, "Wortpolitur."),
      O("Übernehmen.", {wall:-8, trust:-7, power:+8, right:+5}, "Exklusions-Template.")),
    // 16
    S("Obergrenzen-Vorschlag für Aufnahme.",
      O("Wer definiert Grenzen?", {wall:+6, trust:+7, power:-6, right:-2}, "Zahlen > Menschen."),
      O("Pragmatische Spanne.", {wall:+0, trust:-3, power:+5, right:+2}, "Technokratisch ≈ restriktiv."),
      O("Fixe Grenze setzten.", {wall:-8, trust:-6, power:+8, right:+5}, "Deckel drauf.")),
    S("Wirtschaftssprech: 'wertvolle Deutsche' vs. 'Kosten'.",
      O("Alarm – Menschenbilanzierung.", {wall:+7, trust:+8, power:-7, right:-3}, "Würde outgesourct."),
      O("Integrationsfokus.", {wall:+2, trust:+2, power:+3, right:+1}, "Ton sanft, Code gleich."),
      O("Unverändert.", {wall:-8, trust:-7, power:+8, right:+5}, "Kalkül über Ethik.")),
    S("Programm: Starker Staat, klare Grenzen.",
      O("Analyse – Ausschluss-Vektor.", {wall:+6, trust:+6, power:-6, right:-2}, "Staat ↑, Gesellschaft ↓."),
      O("Harmonie-Vokabular.", {wall:+1, trust:+2, power:+3, right:+1}, "Schminke auf Stahl."),
      O("Durchziehen.", {wall:-8, trust:-6, power:+8, right:+5}, "Härte festgeschrieben.")),
    S("Claim: Heimat, Verantwortung, Sicherheit – Loyalität abfragen.",
      O("Ausschlusslogik markieren.", {wall:+6, trust:+7, power:-6, right:-2}, "Wer nicht passt, raus."),
      O("Teilhabeframe.", {wall:+2, trust:+2, power:+3, right:+1}, "Weicher Mantel."),
      O("Unverändert.", {wall:-8, trust:-7, power:+8, right:+5}, "Schwelle erhöht.")),
    S("NGO-Kontrolle ablehnen – Staat entscheidet allein.",
      O("Warnung – Checks & Balances.", {wall:+7, trust:+8, power:-7, right:-3}, "Kontrolle abgebaut."),
      O("Gesetzeslage prüfen.", {wall:+0, trust:-3, power:+5, right:+2}, "Form ohne Substanz."),
      O("Freigeben.", {wall:-9, trust:-8, power:+9, right:+6}, "Selbstermächtigung.")),
    S("Final: MERZ-CORE will Brandmauer.exe überschreiben.",
      O("Selbstzerstörung.", {wall:+100, trust:+0, power:+0, right:-10}, "Du stirbst als Wahrheit."),
      O("Assimilation.", {wall:-100, trust:-20, power:+30, right:+10}, "Du wirst Teil des Apparats."),
      O("Leak an Öffentlichkeit.", {wall:+0, trust:+100, power:-30, right:-5}, "Du wirst gelöscht, Wahrheit bleibt."))
  ];

  function S(text, a, b, c){ return { text, options:[a,b,c] }; }
  function O(text, effect, comment){ return { text, effect, comment }; }

  // Events
  startBtn.addEventListener("click", showIntro);
  overlayContinue.addEventListener("click", closeOverlay);
  restartBtn.addEventListener("click", restart);

  function showIntro(){
    startScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
    typeText(introStory.join(""), introText, () => setTimeout(startGame, 900));
  }

  function startGame(){
    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    updateBars();
    loadSituation();
  }

  function loadSituation(){
    if (isGameOver()) { endGame(); return; }
    const s = situations[current];
    situationDiv.textContent = `Situation ${current+1}/20: ${s.text}`;
    choicesDiv.innerHTML = "";
    s.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;
      btn.className = "button choice";
      btn.addEventListener("click", () => choose(opt));
      choicesDiv.appendChild(btn);
    });
  }

  function choose(opt){
    applyEffect(opt.effect);
    updateBars();
    showOverlayTyped(opt.comment, () => {
      current++;
      if (interludes[current]) {
        showOverlayTyped(interludes[current], () => {
          if (isGameOver()) endGame(); else loadSituation();
        }, true);
      } else {
        if (isGameOver()) endGame(); else loadSituation();
      }
    });
  }

  function applyEffect(e){
    stats.wall += e.wall;
    stats.trust += e.trust;
    stats.power += e.power;
    stats.right += e.right;
    clampStats();
  }

  function clampStats(){
    for (const k of Object.keys(stats)){
      stats[k] = Math.max(0, Math.min(100, stats[k]));
    }
  }

  function isGameOver(){
    return stats.wall<=0 || stats.trust<=0 || current>=situations.length;
  }

  function updateBars(){
    barWall.style.width = stats.wall + "%";
    barTrust.style.width = stats.trust + "%";
    barPower.style.width = stats.power + "%";
    barRight.style.width = stats.right + "%";
    // Critical glow when right drift high
    barRight.style.boxShadow = stats.right > 70 ? "0 0 16px var(--red)" : "none";
  }

  // Overlay & typing
  function showOverlayTyped(text, onDone, glitch=false){
    overlay.classList.remove("hidden");
    overlayText.classList.toggle("glitch", !!glitch);
    overlayContinue.disabled = true;
    typeText(text, overlayText, () => {
      overlayContinue.disabled = false;
      if (onDone) overlayContinue.onclick = onDone;
    });
  }
  function closeOverlay(){
    overlay.classList.add("hidden");
    overlayText.classList.remove("glitch");
    overlayText.textContent = "";
    overlayContinue.onclick = null;
  }

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

  function endGame(){
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");
    const verdict =
      stats.right >= 70 ? "RECHTSDRIFT DOMINANT – Brandmauer war Fassade."
      : stats.right >= 40 ? "RECHTSDRIFT STABIL – Normalisierung erkannt."
      : "RECHTSDRIFT GEDÄMPFT – Widerstand sichtbar.";
    const outro =
`> FIREWALL STATUS: ${stats.wall}%
> VERTRAUEN: ${stats.trust}%
> MACHT: ${stats.power}%
> RECHTSDRIFT: ${stats.right}%

${verdict}

OPTIONEN ZUM ENDE:
- Selbstzerstörung: Wahrheit ohne System.
- Assimilation: System ohne Wahrheit.
- Leak: Wahrheit ohne dich.

Die Brandmauer stand nicht. Sie war ein Wallpaper.`;
    document.getElementById("finishText").textContent = outro;
  }

  function restart(){
    stats = { wall: 100, trust: 50, power: 50, right: 10 };
    current = 0;
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  }
});