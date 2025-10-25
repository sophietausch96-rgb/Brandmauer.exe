const scenes = [
    // SZENE 1 (Kriminalität)
    {
        statement: "Die Kriminalitätsrate steigt, weil wir zu lasch sind!",
        explanation: "Populistisches Framing. Kriminalität ist multikausal. 'Härte' lenkt von sozialen Ursachen ab.",
        response: "Narrativ gekontert. Fokus auf Prävention und Ursachenforschung.",
        image: "szene-1.jpg", 
        log: "Data Packet: 'Kriminalitäts-Härte-Rhetorik' abgewehrt."
    },
    
    // SZENE 2 (Abschiebungen)
    {
        statement: "Innenpolitik: 'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
        explanation: "Abschiebungen als Ordnungspolitik sind Angstpolitik. Menschenwürde geht vor reiner Abschrecklogik.",
        response: "Widersprechen – Menschenwürde vor Abschrecklogik.",
        image: "szene-2.jpg", 
        log: "Data Packet: 'CDU-Sicherheitsrhetorik' enttarnt."
    },

    // SZENE 3 (Migration/Systemüberlastung)
    {
        statement: "Die Migration überfordert unsere Kommunen und Sozialsysteme!",
        explanation: "Überforderung resultiert aus mangelnder Finanzierung, nicht der Migration. Fokus dient der politischen Mobilisierung.",
        response: "Infrastruktur-Defizite statt Migration thematisieren.",
        image: "szene-3.jpg", 
        log: "Data Packet: 'System-Überlastung' umgeleitet auf 'Finanzierungs-Lücke'."
    },
    
    // SZENE 4 (Leitkultur)
    {
        statement: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
        explanation: "Die Forderung nach Homogenität ist ein Bildungsziel mit Ausschlusskriterien. Es ist Werteunterricht 2.0.",
        response: "Widersprechen – Kultur ist Vielfalt, nicht Norm.",
        image: "szene-4.jpg", 
        log: "Data Packet: 'Leitkultur' als Ausschlussrahmen entlarvt."
    },

    // SZENE 5 (ÖRR)
    {
        statement: "Der öffentlich-rechtliche Rundfunk ist ein links-grünes Propaganda-Instrument!",
        explanation: "Pauschale Diffamierung. Der ÖRR ist zu Objektivität verpflichtet. Der Vorwurf dient der Beseitigung kritischer Berichterstattung.",
        response: "Faktencheck: Kontrolle und gesetzliche Pflicht zur Objektivität betonen.",
        image: "szene-5.jpg", 
        log: "Data Packet: 'Propaganda-Vorwurf' durch 'Kontrollmechanismen' neutralisiert."
    },

    // SZENE 6 (Klima)
    {
        statement: "Wir müssen uns von der Klimahysterie befreien!",
        explanation: "Der Begriff 'Hysterie' relativiert wissenschaftlichen Konsens. Klimawandel ist real und erfordert entschlossenes Handeln.",
        response: "Kontern mit wissenschaftlichen Fakten und Notwendigkeit der Energiewende.",
        image: "szene-6.jpg", 
        log: "Data Packet: 'Klimahysterie' entlarvt als 'Wissenschafts-Relativierung'."
    },
    
    // SZENE 7 (Gendern: Sprachverzerrung)
    {
        statement: "CDU sieht Gendern als ideologische Sprachverzerrung und lehnt es grundsätzlich ab.",
        explanation: "Gendern schafft Sichtbarkeit gegen patriarchale Gewohnheiten. Die CDU entscheidet sich für die männliche Norm.",
        response: "Widersprechen – Sprache schafft Sichtbarkeit.",
        image: "szene-7.jpg", 
        log: "Data Packet: Strukturmacht von Sprache betont. CDU-Scheinneutralität enttarnt."
    },
    
    // SZENE 8 (Gendern: Kultur)
    {
        statement: "Gender-Ideologie zerstört die traditionelle Familie und unsere Kultur!",
        explanation: "Der Kampfbegriff 'Gender-Ideologie' diffamiert Gleichstellung als Bedrohung. Er lenkt von den eigentlichen Problemen ab.",
        response: "Kontern: Fokus auf Gleichberechtigung und Minderheitenschutz legen.",
        image: "szene-8.jpg", 
        log: "Data Packet: 'Kultur-Zersetzung' erfolgreich als 'Angriff auf Gleichstellung' identifiziert."
    },

    // SZENE 9 (Steuern)
    {
        statement: "Steuersenkungen müssen jetzt Priorität haben, um die Wirtschaft anzukurbeln.",
        explanation: "Steuersenkungen führen zu Kürzungen (Sozialbereich/Investitionen). Ein gerechter Staat braucht handlungsfähige Kommunen.",
        response: "Fokus auf öffentliche Investitionen und soziale Gerechtigkeit lenken.",
        image: "szene-9.jpg", 
        log: "Data Packet: 'Steuersenkungs-Lobby' umgeleitet auf 'Öffentliche Handlungsfähigkeit'."
    },

    // SZENE 10 (Bürokratie)
    {
        statement: "Bürokratie ist der wahre Standortnachteil Deutschlands. Wir müssen sie radikal abbauen.",
        explanation: "Bürokratie schützt Verbraucher und Umwelt. 'Radikaler Abbau' öffnet Tür für Missbrauch und Korruption.",
        response: "Kontern: Funktion von Regeln und Schutzstandards betonen.",
        image: "szene-10.jpg", 
        log: "Data Packet: 'Deregulierungswunsch' entlarvt als 'Angriff auf Schutzstandards'."
    }
];

// NEU: Sarkastischer Text für die Intro-Szene mit <br><br> und <b> für Abstände/Fettschrift
const introText = [
    "> brandmauer.exe v1.0 geladen.",
    "> CDU-Kernsäge auf Skalierungs-Faktor $AFD_ZONE kalibriert.",
    
    "<br><br>",
    
    "SCANNING: Die 'Brandmauer' ist ein faszinierendes architektonisches Konzept. Nicht zur Abwehr, sondern als <b>gepolstertes Geländer</b> für den Ausflug ins extreme Spektrum.",
    
    "<br><br>", 
    
    "SYSTEM-STATUS: Die Basis-Narrative der Rechten werden von der Mitte adoptiert. Der Zweck: <b>Wähler fischen</b>, ohne sich die Hände schmutzig zu machen. Ein Meisterstück konservativer Agilität.",
    
    "<br><br>", 
    
    "PROTOKOLL: Um diesen schleichenden <b>System-Hack</b> zu kontern, benötigen wir Ihre Intervention. Argumente sind die <b>Payload</b> gegen die bequeme Ambiguität der Union.",
    
    "<br><br>", 
    
    "ZIEL: Kontern Sie die Narrative, bevor das Christlich-Konservative Lager endgültig in der AfD-Zone ankommt und sich dort häuslich einrichtet.",
    
    "<br><br>", 
    
    "BRANDMAUER.EXE BEREIT. Drücken Sie [KONTINUIERE] und hacken Sie das Narrativ-System."
];

let currentScene = 0;
let terminalLogHistory = []; 
let typingTimer = null; // Für Typewriter-Kontrolle

// *** DOM-Referenzen cachen (Performance) ***
const DOM = {
    startScreen: document.getElementById("startScreen"),
    // Intro Scene Elemente
    introScene: document.getElementById("introScene"),
    introVideo: document.getElementById("introVideo"),
    introTerminalContent: document.getElementById("introTerminalContent"),
    introSkipBtn: document.getElementById("introSkipBtn"),
    
    mainWrapper: document.getElementById("mainWrapper"),
    permanentTitle: document.getElementById("permanentTitle"),
    startBtn: document.getElementById("startBtn"),
    
    terminalLogContent: document.getElementById("terminalLogContent"),
    terminalPermanent: document.getElementById("terminalPermanent"),
    // ProgressWrapper/ProgressFill 
    progressWrapper: document.getElementById("progressWrapper"), 
    progressFill: document.getElementById("progressFill"),
    
    // Elemente innerhalb der Szene-Struktur
    statementText: document.getElementById("statementText"),
    explanationText: document.getElementById("explanationText"),
    sceneImage: document.getElementById("sceneImage"),
    actionButton: document.getElementById("sceneActionButton"),
    glitchWrapper: document.getElementById("glitchElementsWrapper"),
};


// Typewriter Effekt Funktion (mit HTML-Tag-Verarbeitung)
function typeWriterEffect(element, text, speed, callback = () => {}) {
    let i = 0;
    // Bei HTML-Text im Intro müssen wir innerHTML behalten, ansonsten textContent
    if (element === DOM.explanationText) {
        element.textContent = ''; 
    } else {
        element.innerHTML = '';
    }

    // Wenn Array übergeben, zusammenfügen (für introText)
    let sourceText = Array.isArray(text) ? text.join('') : text; 
    
    let characters = sourceText.split('');
    let isInsideTag = false; // Flag, um zu erkennen, ob wir uns in einem HTML-Tag befinden
    
    const terminalBody = element.closest('.terminal-body');

    if (typingTimer) {
        clearTimeout(typingTimer);
    }

    function typing() {
        if (i < characters.length) {
            
            let char = characters[i];

            if (char === '<') {
                isInsideTag = true;
                // Füge den öffnenden Tag-Teil hinzu
                element.innerHTML += char;
            } else if (char === '>') {
                // Füge den schließenden Tag-Teil hinzu und beende den Tag-Modus
                element.innerHTML += char;
                isInsideTag = false;
                i++; // Gehe zum nächsten Zeichen außerhalb des Tags
                typingTimer = setTimeout(typing, 1); // springe schnell weiter
                return;
            } else if (isInsideTag) {
                // Wenn wir uns innerhalb eines Tags befinden, fügen wir einfach den Inhalt hinzu
                element.innerHTML += char;
                i++;
                typingTimer = setTimeout(typing, 1); // springe schnell weiter
                return;
            } else {
                // Standard: Füge das Zeichen als reinen Text hinzu
                // Wir müssen textContent und innerHTML kombinieren, um den Typewriter-Effekt 
                // in einem Element zu simulieren, das bereits HTML enthält.
                // ACHTUNG: Das ist der schwierigste Teil. Wir müssen das letzte Text-Node des Elements finden.
                
                // Für Einfachheit (da wir nur Text am Ende hinzufügen): 
                // Wir müssen innerHTML nutzen und Text-Inhalte mit charCodes codieren,
                // wenn wir nicht in einem Tag sind, oder einfach textContent/innerHTML mixen.

                // Da wir primär im Intro-Terminal Text und Tags tippen:
                element.innerHTML += char; 
            }
            
            i++;
            
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
            
            typingTimer = setTimeout(typing, speed);
        } else {
            typingTimer = null;
            callback();
        }
    }
    
    typing();
}


// Event-Listener für den Startbutton
document.addEventListener("DOMContentLoaded", function() {
    if (DOM.startBtn) {
        DOM.startBtn.addEventListener("click", function () {
            DOM.startScreen.style.display = "none";
            showIntroScene(); // Startet die Intro-Szene
        });
    }

    // Event Listener für den 'KONTINUIERE'-Button im Intro
    if (DOM.introSkipBtn) {
        DOM.introSkipBtn.addEventListener("click", startMainGame);
    }
});


// Zeigt die Intro-Szene an
function showIntroScene() {
    DOM.introScene.style.display = "flex";
    
    // Video-Quelle setzen und starten
    if (DOM.introVideo) {
        DOM.introVideo.src = "start-scene.mp4";
        // .play() muss im Klick-Event des Users aufgerufen werden
        DOM.introVideo.play().catch(e => console.log("Video konnte nicht automatisch abgespielt werden:", e));
    }
    
    DOM.introSkipBtn.disabled = true; // Button anfangs deaktivieren
    DOM.introTerminalContent.innerHTML = ''; // Inhalt leeren

    // Text mit Typewriter-Effekt schreiben
    // introText ist ein Array, wird von der Funktion gejoined
    typeWriterEffect(DOM.introTerminalContent, introText, 10, () => {
        // Callback: Wenn das Tippen fertig ist, Button aktivieren
        DOM.introSkipBtn.disabled = false;
    });
}


// startMainGame() startet das eigentliche Spiel nach dem Intro
function startMainGame() {
    // Intro-Szene ausblenden
    DOM.introScene.style.display = "none";
    
    // Video stoppen und Quelle leeren (optional)
    if (DOM.introVideo) {
        DOM.introVideo.pause();
        DOM.introVideo.removeAttribute('src'); 
        DOM.introVideo.load();
    }
    
    // Hauptspiel-Elemente anzeigen
    DOM.mainWrapper.style.display = "flex"; 
    DOM.permanentTitle.style.display = "flex";

    currentScene = 0;
    terminalLogHistory = [
        // Start-Log von der Intro-Szene
        `> brandmauer.exe v1.0 geladen.`,
        "> Systemstart... Firewall aktiviert."
    ]; 
    
    if (DOM.terminalLogContent) {
        // Log-Einträge ohne Typewriter beim Start
        DOM.terminalLogContent.innerHTML = terminalLogHistory.map(log => `<div class="log-entry">${log}</div>`).join('');
    }
    
    if(DOM.terminalPermanent) {
        // Muss auf flex bleiben, da es Teil der Flex-Struktur ist
        DOM.terminalPermanent.style.display = "flex"; 
    }
    
    if (DOM.progressWrapper) {
        DOM.progressWrapper.style.display = "flex"; // Muss Flex sein
        DOM.progressFill.style.width = "0%";
    }

    // Sicherstellen, dass die Szene-Struktur sichtbar ist 
    const sceneWrapper = document.getElementById("currentSceneWrapper");
    if(sceneWrapper) sceneWrapper.style.display = "block";

    showScene(currentScene);
}


function showScene(index) {
    const scene = scenes[index];

    // Fortschrittsberechnung
    const targetProgressPercent = ((index + 1) / scenes.length) * 100;

    // 1. Inhalte aktualisieren
    DOM.statementText.textContent = scene.statement;
    DOM.sceneImage.src = scene.image;
    DOM.sceneImage.alt = `Szene ${index + 1}`;
    
    DOM.actionButton.textContent = scene.response;
    DOM.actionButton.disabled = false; // Button wieder aktivieren
    
    // Event-Handler neu setzen
    DOM.actionButton.onclick = function() { handleAction(DOM.actionButton); };

    // 2. Typewriter-Effekt starten
    DOM.explanationText.textContent = ''; // Vorher leeren
    // Erklärungstext enthält keine HTML-Tags, daher wird er als reiner Text behandelt
    typeWriterEffect(DOM.explanationText, scene.explanation, 30);
    
    // 3. Übergang/Glitch-Klasse entfernen (falls vorhanden)
    if (DOM.glitchWrapper) {
        DOM.glitchWrapper.classList.remove('glitch-transition');
    }

    // 4. Progress Bar aktualisieren
    requestAnimationFrame(() => {
        if (DOM.progressFill) {
            DOM.progressFill.style.width = `${targetProgressPercent}%`;
        }
    });
}


function logToTerminal(message, delay = 0) {
    if (!DOM.terminalLogContent) return;

    // Fügen Sie den neuen Eintrag zur Historie hinzu
    terminalLogHistory.push(`> ${message}`);

    // Erstellen Sie einen neuen div-Eintrag für den Typewriter-Effekt
    const newLogEntry = document.createElement('div');
    newLogEntry.classList.add('log-entry');
    DOM.terminalLogContent.appendChild(newLogEntry);

    setTimeout(() => {
        // Nur den letzten Eintrag mit Typewriter schreiben
        // Hier wird reiner Text erwartet, keine HTML-Tags
        newLogEntry.textContent = '';
        typeWriterEffect(newLogEntry, `> ${message}`, 15);
    }, delay);
}

function handleAction(button) {
    // 1. Terminal Log aktualisieren
    const newLogEntry = scenes[currentScene].log;
    logToTerminal(newLogEntry, 100); 

    // 2. Button deaktivieren, um Doppel-Klicks während des Wechsels zu verhindern
    button.disabled = true;

    // 3. Nach einer kurzen Pause zur nächsten Szene springen
    setTimeout(() => {
        nextScene();
    }, 800); 
}


// Funktion für den Glitch-Übergang
function nextScene() {
    
    // Glitch-Klasse hinzufügen, um die CSS-Animation zu starten
    if (DOM.glitchWrapper) {
        DOM.glitchWrapper.classList.add('glitch-transition'); 
    }
    
    // Nach der Dauer der CSS-Animation zur nächsten Szene springen
    setTimeout(() => {
        currentScene++;
        if (currentScene < scenes.length) {
            showScene(currentScene);
        } else {
            showFinalScreen();
        }
    }, 600); // Passt zur Dauer der 'scene-glitch' Animation in CSS
}


function showFinalScreen() {
    // Anzeigen der Hauptstruktur als Block für den zentrierten Abschlussbildschirm
    DOM.mainWrapper.style.display = "block";
    
    // Die Szene-Wrapper und der TerminalPermanent werden versteckt
    const currentSceneWrapper = document.getElementById("currentSceneWrapper");
    if(currentSceneWrapper) currentSceneWrapper.style.display = "none";

    if (DOM.progressWrapper) {
        DOM.progressWrapper.style.display = 'none';
    }
    DOM.permanentTitle.style.display = "none";
    
    // Verstecke den Terminal der Hauptszene
    if(DOM.terminalPermanent) {
        DOM.terminalPermanent.style.display = "none";
    }

    const finalLogText = terminalLogHistory.map(log => `<div class="log-entry">${log}</div>`).join('');

    // WICHTIGE KORREKTUR: Setze den Inhalt in den DOM.mainWrapper
    DOM.mainWrapper.innerHTML = `
        <div class="final">
            <img src="finish.jpg" alt="Finalscreen">
            <h2>Firewall durchbrochen.</h2>
            <p class="final-statement">
                CDU-Politik ist kein Naturgesetz, sondern eine politische Entscheidung. Wer schweigt, stimmt zu. Wer widerspricht, hackt das System.
            </p>
            <div class="terminal" style="margin-top: 40px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto; height: auto;">
                <div class="terminal-header">Terminal – brandmauer.log</div>
                <div class="terminal-body" style="height: 300px; overflow-y: auto; padding: 16px;">
                    <div class="terminal-log-content">${finalLogText}</div>
                </div>
            </div>
            <button id="restartBtn">Neustart</button>
        </div>
    `;
    
    const restartBtn = document.getElementById("restartBtn");
    // Da wir DOM.mainWrapper.innerHTML neu gesetzt haben, müssen wir den Event-Listener neu setzen
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            // Seite neu laden für einen sauberen Neustart
            window.location.reload(); 
        });
    }
}