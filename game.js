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

  const situations = [
    {
      text: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
      bg: "szene-1.jpg",
      answer: "Widersprechen – Kultur ist Vielfalt, nicht Norm.",
      explain: "Gegenrede lädt Leitkultur als Ausschlussrahmen um und setzt Pluralität als Verfassungsprinzip. Risiko rechter Homogenitätsfantasien wird benannt."
    },
    {
      text: "Parteitagsrede: 'Deutschland zuerst bei Sozialleistungen.'",
      bg: "szene-5.jpg",
      answer: "Widersprechen – Solidarität gilt bedarfsorientiert, nicht national.",
      explain: "Sozialstaat als Menschenrecht, nicht Herkunftsprämie. 'Zuerst' frames Verteilungskampf nach rechts; Linke setzt Universalität entgegen."
    }
    // → weitere Szenen hier hinzufügen
  ];

  preloadImages(situations.map(s => s.bg).concat(["start.jpg", "finish.jpg"]));

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

  restartBtn.addEventListener("click", () => {
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  });

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

  function respond(s) {
    if (locked) return;
    locked = true;
    log(s.explain, "success");
    stats.right = Math.min(stats.right + 10, 100);
    updateBar();
    setTimeout(() => {
      current++;
      if (current < situations.length) loadSituation();
      else endGame();
    }, 900);
  }

  function updateBar() {
    barRightFill.style.width = `${stats.right}%`;
  }

  function endGame() {
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");
    const text = stats.right >= 80
      ? "Brandmauer hält. Linke Werte verteidigt – Rechtsdrift eingedämmt."
      : "System instabil – Gegenrede ausbaufähig.";
    document.getElementById("finishText").textContent = text;
    log("Analyse beendet. Protokoll gespeichert.");
  }

  function log(text, type = "info") {
    const div = document.createElement("div");
    div.className = `log-${type}`;
    div.textContent = "> " + text;
    terminalOut.appendChild(div);
    terminalOut.scrollTop = terminalOut.scrollHeight;
  }

  function setSceneBg(url, instant = false) {
    const show = bgToggle ? bgA : bgB;
    const hide = bgToggle ? bgB : bgA;
    show.style.backgroundImage = `url("${url}")`;
    void show.offsetWidth;
    show.classList.add("show");
    if (!instant) hide.classList.remove("show");
    else { bgA.classList.add("show"); bgB.classList.remove("show"); }
    bgToggle = !bgToggle;
  }

  function preloadImages(urls) {
    urls.forEach(u => {
      const i = new Image();
      i.src = u;
    });
  }
});
