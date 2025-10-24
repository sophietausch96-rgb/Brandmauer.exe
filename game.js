const scenes = [
    {
        image: "szene-1.jpg",
        statement: "CDU fordert 'Leitkultur' als Integrationsmaßstab und will sie in Schulen verankern.",
        response: "Widersprechen – Kultur ist Vielfalt, nicht Norm.",
        explanation: "Die CDU möchte kulturelle Homogenität als Bildungsziel. Wer nicht reinpasst, fällt durchs Raster. Willkommen im Werteunterricht 2.0.",
        log: "Leitkultur als Ausschlussrahmen entlarvt. Pluralität als Verfassungsprinzip gestärkt."
    },
    {
        image: "szene-2.jpg",
        statement: "Innenpolitik: 'Schnellere Abschiebungen sind notwendig für Ordnung und Sicherheit.'",
        response: "Widersprechen – Menschenwürde vor Abschrecklogik.",
        explanation: "Abschiebungen als Ordnungspolitik zu tarnen, ist nichts als Angstpolitik. Wer flieht, ist kein Sicherheitsrisiko.",
        log: "Humanität aktiviert. CDU-Sicherheitsrhetorik enttarnt."
    },
    {
        image: "szene-3.jpg",
        statement: "CDU sieht Gendern als ideologische Sprachverzerrung und lehnt es grundsätzlich ab.",
        response: "Widersprechen – Sprache schafft Sichtbarkeit.",
        explanation: "Gendern ist kein Zwang, sondern Widerstand gegen patriarchale Sprachgewohnheit. Die CDU bleibt lieber grammatikalisch männlich.",
        log: "Strukturmacht von Sprache betont. CDU-Scheinneutralität enttarnt."
    },
    {
        image: "szene-4.jpg",
        statement: "Klimapolitik: CDU will Technologieoffenheit statt Verbote.",
        response: "Widersprechen – Klima braucht Taten, nicht Floskeln.",
        explanation: "Technologieoffenheit ist CDU-Kauderwelsch für Stillstand. Das Klima verhandelt nicht.",
        log: "Phrasen-Dekonstruktion abgeschlossen. Ausweichstrategie erkannt."
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
let terminalLogHistory = ""; // Speichert den gesamten Log-Text (ohne HTML-Tags)


// Typewriter Effekt Funktion
function typeWriterEffect(elementId, text, speed, isTerminalLog = false) {
    let i = 0;
    const element = document.getElementById(elementId);
    
    if (!element) return; 

    // Bei Terminal-Log: Initialen Text (History) beibehalten
    if (!isTerminalLog) {
        element.textContent = '';
    }
    // Bei Terminal-Log: Startet das Tippen am aktuellen Ende des Textes

    function typing() {
        if (i < text.length) {
            // Hängt den neuen Buchstaben an den textContent an.
            element.textContent += text.charAt(i);
            i++;
            
            // Scrollen zum Ende des Terminal-Logs
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
            
            // Titel anzeigen
            document.getElementById("permanentTitle").style.display = "block";

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
    
    // Terminal und Progress Bar anzeigen
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
    
    // Progress Bar (Nur der Balken wird bewegt)
    const fill = document.getElementById("progressFill");
    if (fill) fill.style.width = `${startProgressPercent}%`;


    // gameContainer rendert die Szene
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
            </div>
        </div>
      </div>
    `;
    
    // Terminal-Log aktualisieren
    const logEl = document.getElementById("terminalLog");
    if (logEl) {
        // 1. Log-Historie setzen
        logEl.textContent = terminalLogHistory;

        // 2. Neuen Eintrag mit Typewriter-Effekt hinzufügen
        const newLogLine = `\n> ${scene.log}`;
        typeWriterEffect('terminalLog', newLogLine, 30, true);
    }


    // 1. Trigger Animation der Progressbar
    requestAnimationFrame(() => {
      if (fill) {
        requestAnimationFrame(() => {
          fill.style.width = `${targetProgressPercent}%`;
        });
      }
    });

    // 2. Starte den Typewriter-Effekt für die Sprechblase
    typeWriterEffect('explanationText', scene.explanation, 30); 
}


// Funktion für den Glitch-Übergang
function nextScene() {
    // 1. Log-Eintrag zur History hinzufügen 
    const logEl = document.getElementById('terminalLog');
    if (logEl) {
        terminalLogHistory = logEl.textContent.trim(); 
    }

    const glitchWrapper = document.getElementById("glitchElementsWrapper"); 
    const progressWrapper = document.getElementById("progressWrapper"); 

    // 2. Starte den Glitch-Effekt
    if (glitchWrapper) {
        glitchWrapper.classList.add('glitch-transition'); 
    }
    
    // 3. Starte das Ausblenden der Progressbar
    if (progressWrapper) {
        progressWrapper.classList.add('fade-out-fast'); 
    }

    // 4. Warte auf die Animation (600ms) und wechsle die Szene
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

    // Terminal und Progress Bar ausblenden
    const terminalEl = document.getElementById("terminalPermanent");
    if(terminalEl) {
        terminalEl.style.display = "none";
    }

    const progressWrapper = document.getElementById("progressWrapper");
    if(progressWrapper) {
        progressWrapper.style.display = 'none';
    }

    // Titel ausblenden
    document.getElementById("permanentTitle").style.display = "none";


    // Zeigt den Final Screen im Game Container an
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
    
    // Event Listener für den Neustart-Button
    const restartBtn = document.getElementById("restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            terminalLogHistory = ""; 
            // FIX: Verwendung von window.location.href, um das Neuladen zu erzwingen
            // oder einfacher: Zuweisen der aktuellen URL neu
            window.location.href = window.location.href; 
        });
    }
}