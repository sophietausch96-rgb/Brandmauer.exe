const scenes = [
  {
    image: "szene-1.jpg",
    statement: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
    response: "Widersprechen – Kultur ist Vielfalt, nicht Norm.",
    explanation: "Die CDU möchte kulturelle Homogenität als Bildungsziel. Wer nicht reinpasst, fällt durchs Raster. Willkommen im Werteunterricht 2.0.",
    log: "Gegenrede lädt Leitkultur als Ausschlussrahmen um und setzt Pluralität als Verfassungsprinzip. Risiko rechter Homogenitätsfantasien wird benannt."
  },
  {
    image: "szene-2.jpg",
    statement: "Innenpolitik: 'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
    response: "Widersprechen – Menschenwürde vor Abschrecklogik.",
    explanation: "Abschiebungen als Ordnungspolitik zu tarnen, ist nichts als Angstpolitik. Wer flieht, ist kein Sicherheitsrisiko.",
    log: "Humanität wird aktiviert. CDU-Sicherheitsrhetorik wird als menschenrechtlich fragwürdig identifiziert."
  },
  {
    image: "szene-3.jpg",
    statement: "CDU sieht Gendern als ideologische Sprachverzerrung und lehnt es grundsätzlich ab.",
    response: "Widersprechen – Sprache schafft Sichtbarkeit.",
    explanation: "Gendern ist kein Zwang, sondern Widerstand gegen patriarchale Sprachgewohnheit. Die CDU bleibt lieber grammatikalisch männlich.",
    log: "Sprache als Strukturmacht wird ins Bewusstsein geladen. CDU-Scheinneutralität enttarnt."
  },
  {
    image: "szene-4.jpg",
    statement: "Klimapolitik: CDU will Technologieoffenheit statt Verbote.",
    response: "Widersprechen – Klima braucht Taten, nicht Floskeln.",
    explanation: "Technologieoffenheit ist CDU-Kauderwelsch für Stillstand. Das Klima verhandelt nicht.",
    log: "Phrasen-Dekonstruktion abgeschlossen. Technologieoffenheit als Ausweichstrategie identifiziert."
  },
  {
    image: "szene-5.jpg",
    statement: "Familienbild: CDU betont traditionelle Rollenverteilung als bewährtes Modell.",
    response: "Widersprechen – Familie ist dort, wo Liebe wohnt.",
    explanation: "CDU-Familienpolitik riecht nach 1950. Zwischen Herd, Trauschein und Pflichtbewusstsein bleibt kein Platz für Diversität.",
    log: "Familienbild geöffnet. Vielfalt geladen. CDU-Norm aufgebrochen."
  },
  {
    image: "szene-6.jpg",
    statement: "CDU will Migration stärker an ökonomischen Interessen ausrichten.",
    response: "Widersprechen – Menschen sind keine Humankapital-Akten.",
    explanation: "Die CDU würde sogar die Würde tariflich staffeln, wenn es nach Arbeitskraft geht. Menschenrechte? Nur mit Produktivitätsnachweis.",
    log: "Migration entökonomisiert. Menschenrecht ersetzt Verwertungslogik."
  },
  {
    image: "szene-7.jpg",
    statement: "Die CDU spricht sich gegen ein Wahlrecht ab 16 aus.",
    response: "Widersprechen – Demokratie kennt kein Haltbarkeitsdatum.",
    explanation: "Jugendliche sollen laut CDU still bleiben, bis sie steuerlich verwertbar sind. Demokratie ist kein Ü18-Club.",
    log: "Jugend aktiviert. CDU-Demokratieverständnis dekodiert."
  },
  {
    image: "szene-8.jpg",
    statement: "Die CDU nennt die Klimabewegung 'ideologisch verblendet'.",
    response: "Widersprechen – Wissenschaft ist keine Ideologie.",
    explanation: "Fakten stören die konservative Ruhe. Also wird die Realität diskreditiert. Ideologie? Das ist CDU-PR gegen die Zukunft.",
    log: "Faktenresistenz offengelegt. CDU-Schutzbehauptung entfernt."
  },
  {
    image: "szene-9.jpg",
    statement: "CDU fordert Neutralitätspflicht für Lehrkräfte – politisches Engagement sei zu vermeiden.",
    response: "Widersprechen – Bildung braucht Haltung, nicht Beliebigkeit.",
    explanation: "Neutralität ist das Deckmäntelchen für schweigenden Konservatismus. Wer sich gegen rechts nicht positioniert, stellt sich auf ihre Seite.",
    log: "Haltung geladen. CDU-Dogma neutralisiert."
  },
  {
    image: "szene-10.jpg",
    statement: "Digitalpolitik: CDU fordert 'digitale Souveränität' – ohne soziale Netzpolitik.",
    response: "Widersprechen – Digitalisierung braucht Gerechtigkeit.",
    explanation: "Souveränität ohne Solidarität ist neoliberale Netzpolitik. Die CDU installiert lieber Uploadfilter als Chancengleichheit.",
    log: "Digitale Klassenverhältnisse offengelegt. CDU-Souveränitätsfaschismus enttarnt."
  }
];

let currentScene = 0;

function startGame() {
  showScene(currentScene);
}

function showScene(index) {
  const scene = scenes[index];

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
  <!-- Fragmente werden später per JS erzeugt -->
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

  // Animate progress
  const fillBar = document.getElementById("progressFill");
  const progress = ((index + 1) / scenes.length) * 100;
  fillBar.style.width = `${progress}%`;
}

function nextScene() {
  currentScene++;
  if (currentScene < scenes.length) {
    showScene(currentScene);
  } else {
    showFinalScreen();
  }
}

function showFinalScreen() {
  document.getElementById("gameContainer").innerHTML = `
    <div class="final">
      <img src="finish.jpg" alt="Finish">
      <h2>Firewall durchbrochen.</h2>
      <p class="final-statement">
        CDU-Politik ist kein Naturgesetz, sondern eine politische Entscheidung. Wer schweigt, stimmt zu. Wer widerspricht, hackt das System.
      </p>
    </div>
  `;
}
