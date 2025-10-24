document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const finishScreen = document.getElementById("finishScreen");
  const situationDiv = document.getElementById("situation");
  const choicesDiv = document.getElementById("choices");
  const terminalOut = document.getElementById("terminalOutput");
  const barRightFill = document.getElementById("barRightFill");

  const bgA = document.querySelector("#sceneBg .bgA");
  const bgB = document.querySelector("#sceneBg .bgB");
  const fxLayer = document.getElementById("fxLayer");
  let bgToggle = false;

  let stats = { right: 0 };
  let current = 0;
  let locked = false;

  // === Szenenliste ===
  const situations = [
    {
      text: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
      bg: "szene-1.jpg",
      answer: "Widersprechen – Kultur ist Vielfalt, nicht Norm.",
      explain: "Gegenrede lädt Leitkultur als Ausschlussrahmen um und setzt Pluralität als Verfassungsprinzip. Risiko rechter Homogenitätsfantasien wird benannt."
    },
    {
      text: "Innenpolitik: 'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
      bg: "szene-2.jpg",
      answer: "Widersprechen – Menschenwürde vor Abschrecklogik.",
      explain: "Ordnungspolitik ohne Rechtsgarantien kippt autoritär. Linke Argumentation priorisiert Grundrechte, faire Verfahren und Integration vor Repression."
    },
    {
      text: "CDU will Obergrenzen bei Asylverfahren und restriktivere Familiennachzüge.",
      bg: "szene-3.jpg",
      answer: "Widersprechen – Schutzrechte sind nicht gedeckelt.",
      explain: "Obergrenzen widersprechen Asylrecht. Gegenrede betont individuelle Prüfung, Familiennachzug als Integrationsmotor, statt Sanktionslogik."
    },
    {
      text: "CDU schlägt Polizei-Befugnisse für präventive Überwachung vor.",
      bg: "szene-4.jpg",
      answer: "Widersprechen – Freiheit braucht starke Grundrechte.",
      explain: "Prävention ohne Anlass verschiebt die Norm in Richtung Generalverdacht. Linke Position: Richtervorbehalt, enge Zwecke, Transparenz."
    },
    {
      text: "Parteitagsrede: 'Deutschland zuerst bei Sozialleistungen.'",
      bg: "szene-5.jpg",
      answer: "Widersprechen – Solidarität gilt bedarfsorientiert, nicht national.",
      explain: "Sozialstaat als Menschenrecht, nicht Herkunftsprämie. 'Zuerst' frames Verteilungskampf nach rechts; Linke setzt Universalität entgegen."
    },
    {
      text: "CDU fordert härtere Strafen für 'Klima-Kleber' und Demonstrationsauflagen.",
      bg: "szene-6.jpg",
      answer: "Widersprechen – Versammlungsfreiheit statt Kriminalisierung.",
      explain: "Krasse Strafverschärfungen sind chilling effects gegen Protest. Linke Argumentation: Verhältnismäßigkeit, Deeskalation, Schutz der Grundrechte."
    },
    {
      text: "Programm: 'Deutschpflicht auf Schulhöfen' zur Integration.",
      bg: "szene-7.jpg",
      answer: "Widersprechen – Mehrsprachigkeit stärken statt überwachen.",
      explain: "Zwang erzeugt Ausgrenzung. Linke Gegenrede: Ressourcen für Sprachförderung, Anerkennung der Lebensrealitäten statt Sprachpolicing."
    },
    {
      text: "Forderung nach Grenzkontrollen im Inland per 'Schleierfahndung'.",
      bg: "szene-8.jpg",
      answer: "Widersprechen – Bewegungsfreiheit und Anti-Profiling.",
      explain: "Verdachtsarme Kontrolle normalisiert Ausnahmezustände. Linke Position: klare Grenzen gegen Racial Profiling, evidenzbasierte Sicherheit."
    },
    {
      text: "CDU will Gendern in Behörden untersagen.",
      bg: "szene-9.jpg",
      answer: "Widersprechen – Sprache frei halten, Sichtbarkeit sichern.",
      explain: "Verbote sind Kulturkampf von oben. Linke Gegenrede: Leitfäden statt Verbote, Respekt für diverse Lebensrealitäten."
    },
    {
      text: "Slogan: 'Illegale Migration stoppen – Grenzen dicht.'",
      bg: "szene-10.jpg",
      answer: "Widersprechen – Fluchtursachen bekämpfen, legale Wege schaffen.",
      explain: "Entmenschlichende Sprache wird benannt. Linke Linie: Rechtsstaat, Resettlement, Kommunen stärken statt Abschottung."
    }
  ];

  // === Bilder vorladen ===
  preloadImages(situations.map(s => s.bg).concat(["start.jpg", "finish.jpg"]));

  // === Start-Button ===
  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    terminalOut.innerHTML = "";
    current = 0;
    locked = false;
    stats.right = 0;
    updateBar();
    log("Systemstart... Firewall aktiviert.");
    setSceneBg(situations[0].bg, true);
    loadSituation();
  });

  // === Neustart-Button ===
  restartBtn.addEventListener("click", () => {
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  });

  // === Szene anzeigen ===
  function loadSituation() {
    if (current >= situations.length) return endGame();

    const s = situations[current];
    situationDiv.textContent = s.text;
    choicesDiv.innerHTML = "";

    const btn = document.createElement("button");
    btn.className = "choiceBtn";
    btn.textContent = s.answer;
    btn.onclick = () => respond(s);
    choicesDiv.appendChild(btn);

    setSceneBg(s.bg);
    locked = false;
  }

  // === Antwortverarbeitung ===
  function respond(s) {
    if (locked) return;
    locked = true;

    log(s.explain, "success");
    stats.right = Math.min(stats.right + 10, 100); // +10 pro Antwort
    updateBar();

    setTimeout(() => {
      current++;
      if (current < situations.length) loadSituation();
      else endGame();
    }, 1000);
  }

  // === Fortschrittsbalken aktualisieren ===
  function updateBar() {
    barRightFill.style.width = `${stats.right}%`;
  }

  // === Spielende ===
  function endGame() {
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");

    const text = `Zwischen Leitkultur und Grenzzaun: Eure Firewall bröckelt.\nDoch wir debuggen weiter – pixel für pixel.`;
    document.getElementById("finishText").textContent = text;

    log("Analyse beendet. Protokoll gespeichert.");
  }

  // === Terminal-Ausgabe ===
  function log(text, type = "info") {
    const div = document.createElement("div");
    div.className = `log-${type}`;
    div.textContent = "> " + text;
    terminalOut.appendChild(div);
    terminalOut.scrollTop = terminalOut.scrollHeight;
  }

  // === Hintergrundbild wechseln ===
  function setSceneBg(url, instant = false) {
    const show = bgToggle ? bgA : bgB;
    const hide = bgToggle ? bgB : bgA;
    show.style.backgroundImage = `url("${url}")`;
    void show.offsetWidth;
    show.classList.add("show");

    if (!instant) hide.classList.remove("show");
    else {
      bgA.classList.add("show");
      bgB.classList.remove("show");
    }

    bgToggle = !bgToggle;
  }

  // === Bilder vorladen ===
  function preloadImages(urls) {
    urls.forEach(u => {
      const img = new Image();
      img.src = u;
    });
  }

  // === Tastatursteuerung (Enter/Space) ===
  document.addEventListener("keydown", (e) => {
    if (gameScreen.classList.contains("hidden")) return;
    if (e.key === "Enter" || e.key === " ") {
      const btn = choicesDiv.querySelector("button");
      if (btn) btn.click();
    }
  });
});
