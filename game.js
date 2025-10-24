const scenes = [
  {
    image: "scene1.jpg",
    text: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
    answer: "Widersprechen – Kultur ist Vielfalt, nicht Norm.",
    explanation: "Die CDU romantisiert eine einheitliche Kultur, die es nie gab. Vielfalt ist keine Bedrohung, sondern Realität.",
    terminalLog: "Gegenrede dekonstruiert Kulturbegriff, betont Pluralität und kritisiert Ausgrenzung durch Normsetzung."
  },
  {
    image: "scene2.jpg",
    text: "Innenpolitik: 'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
    answer: "Widersprechen – Menschenwürde vor Abschrecklogik.",
    explanation: "Wer Menschenrechte für 'Ordnung' opfert, opfert am Ende beides. Die CDU kriminalisiert Schutzsuchende.",
    terminalLog: "Firewall erkennt autoritäre Abschiebefantasien. Humanismus aktiviert."
  },
  {
    image: "scene3.jpg",
    text: "Verbot von Gender-Sprache in Landesbehörden gefordert.",
    answer: "Widersprechen – Sprache verändert sich, Unterdrückung nicht.",
    explanation: "Die CDU kämpft gegen Sternchen statt gegen soziale Ungleichheit. Ein Kampf gegen Sichtbarkeit.",
    terminalLog: "Reaktionäre Sprachpolitik blockiert. Firewall setzt Sprachfreiheit durch."
  },
  {
    image: "scene4.jpg",
    text: "'Migration ist die Mutter aller Probleme' – Aussage bleibt unwidersprochen.",
    answer: "Widersprechen – Ursache liegt im System, nicht bei Menschen.",
    explanation: "Rassismus wird zur Staatsräson, wenn man ihn nicht widerspricht. CDU bleibt auf Tauchstation.",
    terminalLog: "Virus erkennt rechte Dogwhistles. Narrative-Scanner aktiv."
  },
  {
    image: "scene5.jpg",
    text: "CDU lehnt Klimakleber als 'kriminelle Vereinigung' ab – schweigt aber zu Lützerath-Räumung.",
    answer: "Widersprechen – Ziviler Ungehorsam ist kein Extremismus.",
    explanation: "Für die CDU ist Protest gefährlicher als Klimakollaps. Ordnung über Überleben.",
    terminalLog: "Firewall meldet: selektive Empörung detektiert. Kontext geladen."
  },
  {
    image: "scene6.jpg",
    text: "Konzepte zur 'wehrhaften Demokratie' zielen auf linke Gruppen.",
    answer: "Widersprechen – Wehret den Anfängen, nicht dem Antifaschismus.",
    explanation: "Wer Antifaschismus kriminalisiert, schützt den Faschismus. CDU betreibt Täter-Opfer-Umkehr.",
    terminalLog: "Schutzwall gegen Faschismus reaktiviert. Antifa.exe ausgeführt."
  },
  {
    image: "scene7.jpg",
    text: "Religiöse Symbole sollen aus Klassenzimmern verschwinden – christliche Kreuze bleiben unberührt.",
    answer: "Widersprechen – Neutralität ist kein Einbahnstraßen-Gebot.",
    explanation: "Kulturelle Hegemonie als 'Tradition' getarnt. CDU liebt Neutralität, solange sie christlich bleibt.",
    terminalLog: "Firewall erkennt doppelte Standards. Kreuzzug-Modus deaktiviert."
  },
  {
    image: "scene8.jpg",
    text: "'Wir sind nicht das Sozialamt der Welt' – CDU-Politiker zur Geflüchtetenhilfe.",
    answer: "Widersprechen – Solidarität endet nicht an Grenzen.",
    explanation: "Menschenrechte sind kein Sparmodell. CDU verwechselt Staatshaushalt mit Mitmenschlichkeit.",
    terminalLog: "Firewall setzt Budgetlogik außer Kraft. Humanität.exe gestartet."
  },
  {
    image: "scene9.jpg",
    text: "CDU sieht 'Frühsexualisierung' durch queere Bildungsinhalte.",
    answer: "Widersprechen – Aufklärung ist Schutz, nicht Gefahr.",
    explanation: "Die CDU schürt Panik statt Wissen. Queerfeindlichkeit im Bildungsschafspelz.",
    terminalLog: "Desinformationsbombe neutralisiert. Faktenfilter aktiv."
  },
  {
    image: "scene10.jpg",
    text: "CDU will 'Remigration' nicht definieren – lehnt aber den Begriff nicht klar ab.",
    answer: "Widersprechen – Wer schweigt, stimmt zu.",
    explanation: "CDU tanzt mit der AfD, solange niemand hinsieht. Brandmauer? Eher Schwingtür.",
    terminalLog: "Firewall erkennt gefährliche Nähe zur extremen Rechten. Systemwarnung ausgelöst."
  }
];

let current = 0;

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const finishScreen = document.getElementById("finishScreen");
const sceneImage = document.getElementById("sceneImage");
const situation = document.getElementById("situation");
const choices = document.getElementById("choices");
const explanationTitle = document.getElementById("explanationTitle");
const explanationText = document.getElementById("explanationText");
const terminalOutput = document.getElementById("terminalOutput");
const barRightFill = document.getElementById("barRightFill");
const finishText = document.getElementById("finishText");

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  showScene();
};

restartBtn.onclick = () => location.reload();

function showScene() {
  const scene = scenes[current];
  sceneImage.src = scene.image;
  situation.textContent = scene.text;
  explanationTitle.textContent = "Analyse";
  explanationText.textContent = scene.explanation;
  terminalOutput.textContent += "> " + scene.terminalLog + "\n";

  choices.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "choiceBtn";
  btn.textContent = "Zerstöre das System: " + scene.answer;
  btn.onclick = () => nextScene();
  choices.appendChild(btn);

  const percent = Math.round(((current + 1) / scenes.length) * 100);
  barRightFill.style.width = percent + "%";
}

function nextScene() {
  current++;
  if (current < scenes.length) {
    showScene();
  } else {
    gameScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");
    finishText.textContent = "Brandmauer.exe infiltriert. Konservative Narrative gebrochen. Zeit für Utopien.";
  }
}
