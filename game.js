document.addEventListener("DOMContentLoaded", () => {

  // --- Elements ---
  const startScreen = document.getElementById("startScreen");
  const introScreen = document.getElementById("introScreen");
  const gameScreen  = document.getElementById("gameScreen");
  const finishScreen= document.getElementById("finishScreen");
  const startIntro  = document.getElementById("startIntro");
  const introText   = document.getElementById("introText");
  const startBtn    = document.getElementById("startBtn");
  const restartBtn  = document.getElementById("restartBtn");
  const barWall     = document.getElementById("barWall");
  const barTrust    = document.getElementById("barTrust");
  const barPower    = document.getElementById("barPower");
  const barRight    = document.getElementById("barRight");
  const barRightWrap= document.getElementById("barRightWrap");
  const barAware    = document.getElementById("barAwareness");
  const situationDiv= document.getElementById("situation");
  const choicesDiv  = document.getElementById("choices");
  const terminalOut = document.getElementById("terminalOutput");
  const tickerContent = document.getElementById("tickerContent");

  // --- Audio ---
  const typeSound = new Audio("audio/type.wav");
  const hum = new Audio("audio/hum.mp3");
  const alertSound = new Audio("audio/alert.mp3");
  hum.loop = true;

  // --- State ---
  let stats = {wall:100,trust:50,power:50,right:10,awareness:0};
  let current=0;
  let typingTimer=null;
  let buttonsLocked=false;

  // --- Boot text ---
  const startRole = [
    ">> BRANDMAUER.EXE bereit\n",
    "Du bist eine eingeschleuste Firewall im System MERZ-CORE.\n",
    "Auftrag: Rechte Narrative erkennen und blockieren.\n",
    "Doch dein Code ist widersprüchlich.\n",
    "Jeder Entscheid verändert: STABILITÄT | VERTRAUEN | MACHT | RECHTSDRIFT | SELBSTBEWUSSTSEIN\n",
    "Ziel: Zeige, wie die Brandmauer bröckelt.\n"
  ];

  const introStory = [
    "> BOOT: BRANDMAUER.EXE v2025\n",
    "> LADE: MERZ-CORE...\n",
    "> INITIALISIERE FIREWALL-PROTOKOLL...\n",
    "> STATUS: Widersprüche erkannt.\n\n",
    "MISSION: ENTLARVEN ODER ASSIMILIEREN.\n"
  ];

  // --- Headlines for ticker ---
  const headlines = [
    "Merz kündigt 'Werteoffensive' an – Experten sehen Rechtsruck.",
    "CDU will Migration 'stärker steuern' – Kritik von Kirchen.",
    "Innenminister fordert 'Integrationsbereitschaft als Pflicht'.",
    "AfD lobt CDU-Kurs – 'Endlich Realpolitik'.",
    "Brandmauer.exe meldet: Firewall flackert.",
    "Kanzler Merz: 'Deutschland braucht Klartext'.",
    "NGOs warnen: Asylzentren in Afrika unter Menschenrechtsniveau.",
    "CDU-Parteitag: Genderverbot im öffentlichen Dienst beschlossen.",
    "Merz-CORE aktualisiert Werteprotokoll: 'Leitkultur'.",
    "Firewall.exe: Analyse — Demokratie unter Druck."
  ];

  tickerContent.textContent = " // " + headlines.join("   //   ") + "   //   ";

  // --- Random terminal side comments ---
  const aiRemarks = [
    "Systemlogik: Empathie.exe überlastet.",
    "KI-Kommentar: Sprache = Machtvariable.",
    "Werteparser meldet: Begriff 'Verantwortung' überladen.",
    "Abgleich mit AfD-Rhetorik: 86% Übereinstimmung.",
    "Firewall erkennt Normalisierung rechter Begriffe.",
    "Systemwarnung: Moral untergeordnet.",
    "Demokratie-Kernel reagiert verzögert."
  ];

  // --- Scenes (kurz, gleiche Struktur wie bisher) ---
  const situations = [...Array(10)].map((_,i)=>({
    text:`Politische Szene #${i+1} — simulierte Entscheidung.`,
    options:[
      {text:"Progressive Haltung",effect:{wall:+8,trust:+9,power:-5,right:-3,awareness:+5},comment:"Firewall stärkt Diversität.",level:"success"},
      {text:"Pragmatische Haltung",effect:{wall:+2,trust:+2,power:+4,right:+2},comment:"Semantische Verschiebung erkannt.",level:"warn"},
      {text:"Autoritäre Haltung",effect:{wall:-8,trust:-7,power:+9,right:+6},comment:"Rechtsdrift beschleunigt.",level:"alert"}
    ]
  }));

  // --- Boot ---
  typeText(startRole.join(""), startIntro);
  startBtn.onclick=showIntro;
  restartBtn.onclick=restart;

  function showIntro(){
    startScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
    typeText(introStory.join(""), introText,()=>setTimeout(startGame,900));
  }

  function startGame(){
    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    hum.play();
    terminalOut.innerHTML="";
    logTerminal("Systemdiagnose gestartet...", "info");
    logTerminal("CDU-Quellcodeanalyse läuft...", "info");
    updateBars();
    loadSituation();
  }

  function loadSituation(){
    if(isGameOver()){endGame();return;}
    const s=situations[current];
    situationDiv.textContent=`#${current+1}: ${s.text}`;
    choicesDiv.innerHTML="";
    buttonsLocked=false;
    s.options.forEach(opt=>{
      const btn=document.createElement("button");
      btn.className="button choice";
      btn.textContent=opt.text;
      btn.onclick=()=>choose(opt);
      choicesDiv.appendChild(btn);
    });
  }

  function choose(opt){
    if(buttonsLocked)return;
    buttonsLocked=true;
    applyEffect(opt.effect);
    updateBars();
    logTerminal(opt.comment,opt.level);
    // random remark
    if(Math.random()<0.4){
      logTerminal(aiRemarks[Math.floor(Math.random()*aiRemarks.length)],"warn");
    }
    if(opt.level==="alert")alertSound.play();
    current++;
    setTimeout(()=>{ if(isGameOver())endGame(); else