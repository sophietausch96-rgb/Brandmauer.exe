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

// Stark strukturierter Text für die Intro-Szene
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
let typingTimer = null; 

// *** DOM-Referenzen cachen ***
const DOM = {
    startScreen: document.getElementById("startScreen"),
    introScene: document.getElementById("introScene"),
    introVideo: document.getElementById("introVideo"),
    introTerminalContent: document.getElementById("introTerminalContent"),
    introSkipBtn: document.getElementById("introSkipBtn"),
    
    mainWrapper: document.getElementById("mainWrapper"),
    permanentTitle: document.getElementById("permanentTitle"),
    startBtn: document.getElementById("startBtn"),
    
    terminalLogContent: document.getElementById("terminalLogContent"),
    terminalMain: document.getElementById("terminalPermanent"), // Hauptterminal
    progressWrapper: document.getElementById("progressWrapper"), 
    progressFill: document.getElementById("progressFill"),
    
    statementText: document.getElementById("statementText"),
    explanationText: document.getElementById("explanationText"),
    sceneImage: document.getElementById("sceneImage"),
    actionButton: document.getElementById("sceneActionButton"),
    glitchWrapper: document.getElementById("glitchElementsWrapper"),

    // Für das Glitch-Overlay (Browser-Fenster)
    browserWindow: document.querySelector('.browser-window-container'),
};


// Typewriter Effekt Funktion (mit Pausen-Erkennung für <br><br>)
function typeWriterEffect(element, text, speed, callback = () => {}) {
    let i = 0;
    
    element.innerHTML = ''; 
    
    let sourceText = Array.isArray(text) ? text.join('') : text; 
    sourceText = sourceText.replace(/<br><br>/g, '¤BR¤'); 
    
    let characters = sourceText.split('');
    let isInsideTag = false; 
    let tagContent = ''; 
    
    const terminalBody = element.closest('.terminal-body');

    if (typingTimer) {
        clearTimeout(typingTimer);
    }

    function typing() {
        if (i < characters.length) {
            
            let char = characters[i];

            if (char === '<' || isInsideTag) {
                // FALL 1: HTML-Tag (schnell einfügen)
                tagContent += char;
                isInsideTag = true;

                if (char === '>') {
                    element.innerHTML += tagContent;
                    tagContent = '';
                    isInsideTag = false;
                    i++;
                    typingTimer = setTimeout(typing, 1); 
                    return;
                }
            } else if (char === '¤' && characters.slice(i, i + 4).join('') === '¤BR¤') {
                 // FALL 2: Spezieller Zeilenumbruch-Platzhalter (Pause)
                element.innerHTML += '<br><br>'; 
                i += 4; 
                
                typingTimer = setTimeout(typing, 300); // Pause von 300ms
                return;
            } 
            else {
                // FALL 3: Normales Zeichen
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
            showIntroScene(); 
        });
    }

    // Event Listener für den 'KONTINUIERE'-Button im Intro
    if (DOM.introSkipBtn) {
        DOM.introSkipBtn.addEventListener("click", startMainGame);
    }
});


function showIntroScene() {
    DOM.introScene.style.display = "flex";
    
    if (DOM.introVideo) {
        DOM.introVideo.src = "start-scene.mp4";
        DOM.introVideo.play().catch(e => console.log("Video konnte nicht automatisch abgespielt werden:", e));
    }
    
    DOM.introSkipBtn.disabled = true; 
    DOM.introTerminalContent.innerHTML = ''; 

    typeWriterEffect(DOM.introTerminalContent, introText, 10, () => {
        DOM.introSkipBtn.disabled = false;
    });
}


function startMainGame() {
    DOM.introScene.style.display = "none";
    
    if (DOM.introVideo) {
        DOM.introVideo.pause();
        DOM.introVideo.removeAttribute('src'); 
        DOM.introVideo.load();
    }
    
    DOM.mainWrapper.style.display = "flex"; 
    DOM.permanentTitle.style.display = "flex";

    currentScene = 0;
    terminalLogHistory = [
        `> brandmauer.exe v1.0 geladen.`,
        "> Systemstart... Firewall aktiviert."
    ]; 
    
    // Terminal im Desktop-Modus anzeigen
    if (window.innerWidth > 768) {
        if (DOM.terminalLogContent) {
            DOM.terminalLogContent.innerHTML = terminalLogHistory.map(log => `<div class="log-entry">${log}</div>`).join('');
        }
        if(DOM.terminalMain) {
            DOM.terminalMain.style.display = "flex"; 
        }
    } else {
        // Auf Mobilgeräten Terminal-Anzeige im Hauptspiel unterdrücken
        if(DOM.terminalMain) {
            DOM.terminalMain.style.display = "none"; 
        }
    }
    
    if (DOM.progressWrapper) {
        DOM.progressWrapper.style.display = "flex"; 
        DOM.progressFill.style.width = "0%";
    }

    const sceneWrapper = document.getElementById("currentSceneWrapper");
    if(sceneWrapper) sceneWrapper.style.display = "block";

    showScene(currentScene);
}


// NEU/GEÄNDERT: Funktion zum Ein-/Ausblenden der Browser-Inhalte
function toggleMainContentVisibility(isVisible) {
    if (window.innerWidth <= 768) {
        // Mobile Geräte: Glitch-Steuerung über dem Bild
        if (DOM.browserWindow) {
            DOM.browserWindow.style.opacity = isVisible ? '1' : '0';
            DOM.browserWindow.style.pointerEvents = isVisible ? 'auto' : 'none'; 
        }
    } else {
        // Desktop-Geräte: Alles ist sichtbar
        if (DOM.browserWindow) {
            DOM.browserWindow.style.opacity = '1';
            DOM.browserWindow.style.pointerEvents = 'auto';
        }
        if (DOM.terminalMain) {
             DOM.terminalMain.style.opacity = '1';
             DOM.terminalMain.style.pointerEvents = 'auto';
        }
    }
}


function showScene(index) {
    const scene = scenes[index];

    const targetProgressPercent = ((index + 1) / scenes.length) * 100;

    // 1. Inhalte aktualisieren
    DOM.statementText.textContent = scene.statement;
    DOM.sceneImage.src = scene.image;
    DOM.sceneImage.alt = `Szene ${index + 1}`;
    
    DOM.actionButton.textContent = scene.response;
    DOM.actionButton.disabled = false; 
    
    DOM.actionButton.onclick = function() { handleAction(DOM.actionButton); };

    // 2. Typewriter-Effekt für die Erklärung 
    DOM.explanationText.textContent = ''; 
    typeWriterEffect(DOM.explanationText, scene.explanation, 30);
    
    // 3. Übergang/Glitch-Klasse entfernen
    if (DOM.glitchWrapper) {
        DOM.glitchWrapper.classList.remove('glitch-transition');
    }

    // 4. Sichtbarkeit steuern: Auf Mobile ist der Inhalt zuerst AUSGEBLENDET
    if (window.innerWidth <= 768) {
        toggleMainContentVisibility(false); 
    } else {
        toggleMainContentVisibility(true); 
    }

    // 5. Progress Bar aktualisieren
    requestAnimationFrame(() => {
        if (DOM.progressFill) {
            DOM.progressFill.style.width = `${targetProgressPercent}%`;
        }
    });
}


function logToTerminal(message, delay = 0) {
    if (!DOM.terminalLogContent || window.innerWidth <= 768) return; // Kein Log auf Mobile

    terminalLogHistory.push(`> ${message}`);

    const newLogEntry = document.createElement('div');
    newLogEntry.classList.add('log-entry');
    DOM.terminalLogContent.appendChild(newLogEntry);

    setTimeout(() => {
        newLogEntry.textContent = ''; 
        typeWriterEffect(newLogEntry, `> ${message}`, 15, () => {
            const terminalBody = DOM.terminalLogContent.closest('.terminal-body');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }, delay);
}

function handleAction(button) {
    // 1. Terminal Log aktualisieren
    const newLogEntry = scenes[currentScene].log;
    logToTerminal(newLogEntry, 100); 

    // 2. Button deaktivieren
    button.disabled = true;

    // NEU: Für mobile Ansicht: Browser-Fenster einblenden nach Aktion
    if (window.innerWidth <= 768) {
        toggleMainContentVisibility(true);
    }

    // 3. Zur nächsten Szene springen
    setTimeout(() => {
        nextScene();
    }, 800); 
}


function nextScene() {
    
    if (DOM.glitchWrapper) {
        DOM.glitchWrapper.classList.add('glitch-transition'); 
    }
    
    // NEU: Für mobile Ansicht: Inhalt vor Glitch ausblenden
    if (window.innerWidth <= 768) {
        toggleMainContentVisibility(false); // Browserfenster/Statement ausblenden
    }

    setTimeout(() => {
        currentScene++;
        if (currentScene < scenes.length) {
            showScene(currentScene);
        } else {
            showFinalScreen();
        }
    }, 600); 
}


// Final Screen Funktion
function showFinalScreen() {
    
    DOM.mainWrapper.style.display = "block";
    
    const currentSceneWrapper = document.getElementById("currentSceneWrapper");
    if(currentSceneWrapper) currentSceneWrapper.style.display = "none";

    if (DOM.progressWrapper) {
        DOM.progressWrapper.style.display = 'none';
    }
    DOM.permanentTitle.style.display = "none";
    
    if(DOM.terminalMain) {
        DOM.terminalMain.style.display = "none"; // Terminal im Final Screen (falls Desktop) ausblenden
    }

    const finalLogText = terminalLogHistory.map(log => `<div class="log-entry">${log}</div>`).join('');

    // Final Screen Layout
    DOM.mainWrapper.innerHTML = `
        <div class="final">
            
            <div class="start-box" style="max-width: 600px; margin: 40px auto; animation: none;">
                <h2>Firewall durchbrochen.</h2>
                <p style="font-size: 18px; line-height: 1.6; margin: 0;">
                    CDU-Politik ist kein Naturgesetz, sondern eine politische Entscheidung. Wer schweigt, stimmt zu. Wer widerspricht, hackt das System.
                </p>
            </div>
            
            <button id="restartBtn">Neustart</button>
            
            <div class="terminal" style="margin-top: 40px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto; height: auto;">
                <div class="terminal-header">Terminal – brandmauer.log</div>
                <div class="terminal-body" style="height: 300px; overflow-y: auto; padding: 16px;">
                    <div class="terminal-log-content">${finalLogText}</div>
                </div>
            </div>
            
        </div>
    `;
    
    const restartBtn = document.getElementById("restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            window.location.reload(); 
        });
    }
}