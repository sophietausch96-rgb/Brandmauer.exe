const scenes = [
  {
    image: "szene-1.jpg",
    statement: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
    response: "Widersprechen – Kultur ist Vielfalt, nicht Norm.",
    explanation: "Die CDU möchte kulturelle Homogenität als Bildungsziel. Wer nicht reinpasst, fällt durchs Raster.",
    log: "Leitkultur als Ausschlussrahmen entlarvt. Pluralität als Verfassungsprinzip gestärkt."
  },
  {
    image: "szene-2.jpg",
    statement: "'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
    response: "Widersprechen – Menschenwürde vor Abschrecklogik.",
    explanation: "Abschiebungen als Ordnungspolitik sind Angstmanagement mit Menschenleben.",
    log: "Grundrechte gegen Abschottung aktiviert. CDU-Rhetorik dekonstruiert."
  },
  {
    image: "szene-3.jpg",
    statement: "CDU sieht Gendern als ideologische Sprachverzerrung und lehnt es grundsätzlich ab.",
    response: "Widersprechen – Sprache schafft Sichtbarkeit.",
    explanation: "Die CDU verteidigt das generische Maskulinum wie ein Museumsstück.",
    log: "Genderdiskurs geöffnet. Sichtbarkeit gegen Stagnation verteidigt."
  },
  {
    image: "szene-4.jpg",
    statement: "CDU will Technologieoffenheit statt Verbote in der Klimapolitik.",
    response: "Widersprechen – Klima braucht Taten, nicht Floskeln.",
    explanation: "Technologieoffenheit ist der CDU-Joker für Nichtstun.",
    log: "Klimawandel priorisiert. CDU-Ausreden neutralisiert."
  },
  {
    image: "szene-5.jpg",
    statement: "Parteitagsrede: 'Deutschland zuerst bei Sozialleistungen.'",
    response: "Widersprechen – Solidarität kennt keine Herkunft.",
    explanation: "Sozialpolitik à la CDU: Wer arm ist, aber nicht deutsch, bleibt arm.",
    log: "Solidarität gestärkt. Nationalistische Rhetorik zurückgewiesen."
  },
  {
    image: "szene-6.jpg",
    statement: "CDU fordert härtere Strafen für 'Klima-Kleber' und Demonstrationsauflagen.",
    response: "Widersprechen – Versammlungsfreiheit statt Kriminalisierung.",
    explanation: "Die CDU macht Grundrechte abhängig vom Gehorsam.",
    log: "Grundrechtsschutz aktiviert. CDU-Repressionsfantasie blockiert."
  },
  {
    image: "szene-7.jpg",
    statement: "CDU will Deutschpflicht auf Schulhöfen einführen.",
    response: "Widersprechen – Mehrsprachigkeit ist kein Makel.",
    explanation: "Die CDU bekämpft Sprachenvielfalt mit Schulhofverboten.",
    log: "Sprachpolizei abgewehrt. Lebensrealitäten anerkannt."
  },
  {
    image: "szene-8.jpg",
    statement: "Forderung nach Schleierfahndung im Inland zur Bekämpfung illegaler Migration.",
    response: "Widersprechen – Bewegungsfreiheit ist kein Risiko.",
    explanation: "Die CDU normalisiert anlasslose Kontrollen als Sicherheit.",
    log: "Profiling erkannt. Überwachungsideologie enttarnt."
  },
  {
    image: "szene-9.jpg",
    statement: "CDU will Gendern in Behörden untersagen.",
    response: "Widersprechen – Sprache frei halten, Sichtbarkeit sichern.",
    explanation: "Die CDU erklärt Vielfalt zur Ideologie und regelt Sprache per Dekret.",
    log: "Sprachfreiheit verteidigt. CDU-Verordnung zerlegt."
  },
  {
    image: "szene-10.jpg",
    statement: "Slogan: 'Illegale Migration stoppen – Grenzen dicht.'",
    response: "Widersprechen – Fluchtursachen bekämpfen, legale Wege schaffen.",
    explanation: "Die CDU will Grenzen schließen statt Perspektiven öffnen.",
    log: "Entmenschlichung erkannt. Abschottungspolitik zerlegt."
  }
];

let currentScene = 0;

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("gameContainer").style.display = "block";
  currentScene = 0;
  showScene(currentScene);
}

function showScene(index) {
  const scene = scenes[index];
  const fill = document.getElementById("progressFill");
  fill.style.width = `${((index + 1) / scenes.length) * 100}%`;

  document.getElementById("gameContainer").innerHTML = `
    <div class="scene-wrapper">
      <div class="scene-text">
        <p class="statement">${scene.statement}</p>
        <h3 class="respond-title">Zerstöre das System:</h3>
        <button onclick="nextScene()">${scene.response}</button>
        <p class="explanation-title">Erklärung:</p>
        <p class="explanation">${scene.explanation}</p>
      </div>
      <div class="scene-image" id="sceneImage" data-img="${scene.image}">
        <img src="${scene.image}" alt="Szene ${index + 1}" />
      </div>
      <div class="terminal">
        <div class="terminal-header">Terminal – Firewall.log</div>
        <div class="terminal-body">
          <p class="terminal-line">> Systemstart... Firewall aktiviert.</p>
          <p class="terminal-line">> ${scene.log}</p>
        </div>
      </div>
    </div>
  `;
}

function nextScene() {
  const imageContainer = document.getElementById("sceneImage");

  if (imageContainer) {
    explodeImage(imageContainer, () => {
      currentScene++;
      if (currentScene < scenes.length) {
        showScene(currentScene);
      } else {
        showFinalScreen();
      }
    });
  }
}

function explodeImage(container, callback) {
  const imageUrl = container.getAttribute("data-img");
  container.innerHTML = "";
  container.style.position = "relative";
  const size = 10;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const piece = document.createElement("div");
      piece.className = "fragment";
      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundSize = `${size * 100}% ${size * 100}%`;
      piece.style.backgroundPosition = `${-x * 100}% ${-y * 100}%`;
      piece.style.left = `${(x / size) * 100}%`;
      piece.style.top = `${(y / size) * 100}%`;
      container.appendChild(piece);
    }
  }

  const pieces = container.querySelectorAll(".fragment");
  setTimeout(() => {
    pieces.forEach(piece => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 200 + Math.random() * 200;
      const rotate = Math.random() * 720 - 360;

      piece.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${rotate}deg)`;
      piece.style.opacity = 0;
    });

    setTimeout(callback, 1200);
  }, 50);
}

function showFinalScreen() {
  document.getElementById("progressWrapper").style.display = "none";
  document.getElementById("gameContainer").innerHTML = `
    <div class="final">
      <img src="start.jpg" alt="Finish" />
      <h2>Firewall durchbrochen.</h2>
      <p class="final-statement">
        CDU-Politik ist kein Naturgesetz, sondern eine politische Entscheidung.<br>
        Wer schweigt, stimmt zu. Wer widerspricht, hackt das System.
      </p>
    </div>
  `;
}

// Starte das Spiel beim Klick auf Start
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", startGame);
  }
});
