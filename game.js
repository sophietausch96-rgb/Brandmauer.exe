const scenes = [
    // WICHTIG: Dateinamen auf szene-X.jpg korrigiert
    // SZENE 1 (Kriminalität)
    {
        statement: "Die Kriminalitätsrate steigt, weil wir zu lasch sind!",
        explanation: "Populistisches Framing. Kriminalität ist oft multi-kausal. Daten zeigen häufig nur leichte, komplexe Verschiebungen, die nicht durch einfache 'Härte' lösbar sind. Der Fokus auf Härte lenkt von sozialen Ursachen ab.",
        response: "Narrativ gekontert. Fokus auf Prävention und Ursachenforschung.",
        image: "szene-1.jpg", 
        log: "Data Packet: 'Kriminalitäts-Härte-Rhetorik' abgewehrt."
    },
    
    // SZENE 2 (Abschiebungen)
    {
        statement: "Innenpolitik: 'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
        explanation: "Abschiebungen als Ordnungspolitik zu tarnen, ist nichts als Angstpolitik. Wer flieht, ist kein Sicherheitsrisiko.",
        response: "Widersprechen – Menschenwürde vor Abschrecktaktiken.",
        image: "szene-2.jpg", 
        log: "Data Packet: 'CDU-Sicherheitsrhetorik' enttarnt."
    },

    // SZENE 3 (Migration/Systemüberlastung)
    {
        statement: "Die Migration überfordert unsere Kommunen und Sozialsysteme!",
        explanation: "Überforderung ist real, aber liegt oft an mangelnder Bundes- und Landesfinanzierung, nicht an der Zahl der Menschen. Fokus auf 'Überforderung' statt 'Infrastrukturdefizite' dient der politischen Mobilisierung.",
        response: "Infrastruktur-Defizite statt Migration thematisieren.",
        image: "szene-3.jpg", 
        log: "Data Packet: 'System-Überlastung' umgeleitet auf 'Finanzierungs-Lücke'."
    },
    
    // SZENE 4 (Leitkultur)
    {
        statement: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
        explanation: "Die CDU möchte kulturelle Homogenität als Bildungsziel. Wer nicht reinpasst, fällt durchs Raster. Willkommen im Werteunterricht 2.0.",
        response: "Widersprechen – Kultur ist Vielfalt, nicht Norm.",
        image: "szene-4.jpg", 
        log: "Data Packet: 'Leitkultur' als Ausschlussrahmen entlarvt."
    },

    // SZENE 5 (ÖRR)
    {
        statement: "Der öffentlich-rechtliche Rundfunk ist ein links-grünes Propaganda-Instrument!",
        explanation: "Pauschale Diffamierung. Der ÖRR ist zu Transparenz verpflichtet und durch Gremien kontrolliert. Fehler sind möglich, aber die Forderung nach Abschaffung dient oft der Beseitigung kritischer Berichterstattung.",
        response: "Faktencheck: Kontrolle und gesetzliche Pflicht zur Objektivität betonen.",
        image: "szene-5.jpg", 
        log: "Data Packet: 'Propaganda-Vorwurf' durch 'Kontrollmechanismen' neutralisiert."
    },

    // SZENE 6 (Klima)
    {
        statement: "Wir müssen uns von der Klimahysterie befreien!",
        explanation: "Einsatz des Begriffs 'Hysterie' relativiert wissenschaftlichen Konsens. Klimawandel ist durch Daten belegt und erfordert entschlossenes Handeln, nicht panikfreie Untätigkeit.",
        response: "Kontern mit wissenschaftlichen Fakten und Notwendigkeit der Energiewende.",
        image: "szene-6.jpg", 
        log: "Data Packet: 'Klimahysterie' entlarvt als 'Wissenschafts-Relativierung'."
    },
    
    // SZENE 7 (Gendern: Sprachverzerrung)
    {
        statement: "CDU sieht Gendern als ideologische Sprachverzerrung und lehnt es grundsätzlich ab.",
        explanation: "Gendern ist kein Zwang, sondern Widerstand gegen patriarchale Sprachgewohnheit. Die CDU bleibt lieber grammatikalisch männlich.",
        response: "Widersprechen – Sprache schafft Sichtbarkeit.",
        image: "szene-7.jpg", 
        log: "Data Packet: Strukturmacht von Sprache betont. CDU-Scheinneutralität enttarnt."
    },
    
    // SZENE 8 (Gendern: Kultur)
    {
        statement: "Gender-Ideologie zerstört die traditionelle Familie und unsere Kultur!",
        explanation: "Das Konzept 'Gender-Ideologie' ist ein Kampfbegriff, der Minderheitenrechte und Gleichstellung als Bedrohung darstellt. Es lenkt von tatsächlichen gesellschaftlichen Herausforderungen ab.",
        response: "Kontern: Fokus auf Gleichberechtigung und Minderheitenschutz legen.",
        image: "szene-8.jpg", 
        log: "Data Packet: 'Kultur-Zersetzung' erfolgreich als 'Angriff auf Gleichstellung' identifiziert."
    },

    // SZENE 9 (Steuern)
    {
        statement: "Steuersenkungen müssen jetzt Priorität haben, um die Wirtschaft anzukurbeln.",
        explanation: "Steuersenkungen führen oft zu Kürzungen im Sozialbereich und bei Investitionen in Bildung und Infrastruktur. Ein sozial gerechter Staat braucht handlungsfähige Kommunen und Investitionen.",
        response: "Fokus auf öffentliche Investitionen und soziale Gerechtigkeit lenken.",
        image: "szene-9.jpg", 
        log: "Data Packet: 'Steuersenkungs-Lobby' umgeleitet auf 'Öffentliche Handlungsfähigkeit'."
    },

    // SZENE 10 (Bürokratie)
    {
        statement: "Bürokratie ist der wahre Standortnachteil Deutschlands. Wir müssen sie radikal abbauen.",
        explanation: "Bürokratie dient oft dem Schutz von Verbrauchern, Arbeitnehmern oder der Umwelt. 'Radikaler Abbau' führt zu Qualitätsverlust und öffnet Tür und Tor für Missbrauch und Korruption.",
        response: "Kontern: Funktion von Regeln und Schutzstandards betonen.",
        image: "szene-10.jpg", 
        log: "Data Packet: 'Deregulierungswunsch' entlarvt als 'Angriff auf Schutzstandards'."
    }
];

let currentScene = 0;
let terminalLogHistory = ""; 


// Typewriter Effekt Funktion
function typeWriterEffect(elementId, text, speed, isTerminalLog = false) {
    let i = 0;
    const element = document.getElementById(elementId);
    
    if (!element) return; 

    if (!isTerminalLog) {
        element.textContent = '';
    }

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            
            if (isTerminalLog) {
                const terminalBody = document.querySelector('#terminalPermanent .terminal-body');
                if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
            }
            
            setTimeout(typing, speed);
        }
    }
    typing();
}


// Event-Listener für den Startbutton
document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.addEventListener("click", function () {
            document.getElementById("startScreen").style.display = "none";
            document.getElementById("mainWrapper").style.display = "flex"; 
            document.getElementById("permanentTitle").style.display = "flex";

            startGame(); 
        });
    }
});


function startGame() {
    currentScene = 0;
    terminalLogHistory = "> Systemstart... Firewall aktiviert."; 
    
    const logEl = document.getElementById("terminalLog");
    
    if (logEl) {
        logEl.textContent = terminalLogHistory;
    }
    
    const terminalEl = document.getElementById("terminalPermanent");
    if(terminalEl) {
        terminalEl.style.display = "flex"; 
    }
    
    const progressWrapper = document.getElementById("progressWrapper");
    if (progressWrapper) {
        progressWrapper.style.display = "block"; 
        
        document.getElementById("progressFill").style.width = "0%";
        
        progressWrapper.classList.remove('fade-out-fast');
    }

    showScene(currentScene);
}


function showScene(index) {
    const scene = scenes[index];
    const gameContainer = document.getElementById("gameContainer");
    
    const targetProgressPercent = ((index + 1) / scenes.length) * 100;
    const startProgressPercent = (index / scenes.length) * 100;
    
    const fill = document.getElementById("progressFill");
    
    if (fill) fill.style.width = `${startProgressPercent}%`;


    gameContainer.innerHTML = `
      <div class="scene-wrapper" id="currentSceneWrapper">
        
        <div class="glitch-elements-wrapper" id="glitchElementsWrapper">
            <div class="scene-text">
              <p class="statement">${scene.statement}</p>
              
              <div class="explanation-container">
                <img src="erklaerung.png" alt="Erklärung" class="explanation-icon" />
                <div class="explanation">
                    <p id="explanationText" class="typed-text"></p>
                </div>
              </div>
              
              <button onclick="nextScene()">${scene.response}</button>
              
            </div>

            <div class="scene-image">
              <img src="${scene.image}" alt="Szene ${index + 1}" class="scene-img" />
              <div class="tv-frame"></div> 
            </div>
        </div>
      </div>
    `;
    
    const logEl = document.getElementById("terminalLog");
    if (logEl) {
        terminalLogHistory = logEl.textContent.trim(); 
        logEl.textContent = terminalLogHistory;

        const newLogLine = `\n> ${scene.log}`;
        typeWriterEffect('terminalLog', newLogLine, 30, true);
    }


    requestAnimationFrame(() => {
      if (fill) {
        requestAnimationFrame(() => {
          fill.style.width = `${targetProgressPercent}%`;
        });
      }
    });

    typeWriterEffect('explanationText', scene.explanation, 30); 
}


// Funktion für den Glitch-Übergang
function nextScene() {
    const logEl = document.getElementById('terminalLog');
    if (logEl) {
        terminalLogHistory = logEl.textContent.trim(); 
    }

    const glitchWrapper = document.getElementById("glitchElementsWrapper"); 
    const progressWrapper = document.getElementById("progressWrapper"); 

    if (glitchWrapper) {
        glitchWrapper.classList.add('glitch-transition'); 
    }
    
    if (progressWrapper) {
        progressWrapper.classList.add('fade-out-fast'); 
    }

    setTimeout(() => {
        currentScene++;
        if (currentScene < scenes.length) {
            if (progressWrapper) {
                progressWrapper.classList.remove('fade-out-fast');
            }
            showScene(currentScene);
        } else {
            showFinalScreen();
        }
    }, 600); 
}


function showFinalScreen() {
    const gameContainer = document.getElementById("gameContainer");

    const terminalEl = document.getElementById("terminalPermanent");
    if(terminalEl) {
        terminalEl.style.display = "none";
    }

    const progressWrapper = document.getElementById("progressWrapper");
    if(progressWrapper) {
        progressWrapper.style.display = 'none';
    }

    document.getElementById("permanentTitle").style.display = "none";


    // Final Screen HTML
    gameContainer.innerHTML = `
        <div class="final">
            <img src="finish.jpg" alt="Finalscreen">
            <h2>Firewall durchbrochen.</h2>
            <p class="final-statement">
                CDU-Politik ist kein Naturgesetz, sondern eine politische Entscheidung. Wer schweigt, stimmt zu. Wer widerspricht, hackt das System.
            </p>
            <div class="terminal" style="margin-top: 40px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
                <div class="terminal-header">Final Log Report</div>
                <div class="terminal-body">
                    <p class="terminal-log">${terminalLogHistory.trim().replace(/\n/g, '<br>')}</p>
                </div>
            </div>
            <button id="restartBtn">Neustart</button>
        </div>
    `;
    
    const restartBtn = document.getElementById("restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            // FIX: Container wieder anzeigen und Spiel neu starten
            document.getElementById("mainWrapper").style.display = "flex";
            document.getElementById("permanentTitle").style.display = "flex";
            
            startGame(); 
        });
    }
}