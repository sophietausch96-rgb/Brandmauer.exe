document.addEventListener("DOMContentLoaded",()=>{
  // Elements
  const startScreen=document.getElementById("startScreen");
  const introScreen=document.getElementById("introScreen");
  const gameScreen=document.getElementById("gameScreen");
  const finishScreen=document.getElementById("finishScreen");
  const introText=document.getElementById("introText");
  const startBtn=document.getElementById("startBtn");
  const beginBtn=document.getElementById("beginBtn");
  const restartBtn=document.getElementById("restartBtn");
  const barWall=document.getElementById("barWall");
  const barTrust=document.getElementById("barTrust");
  const barPower=document.getElementById("barPower");
  const barRight=document.getElementById("barRight");
  const barAware=document.getElementById("barAwareness");
  const situationDiv=document.getElementById("situation");
  const choicesDiv=document.getElementById("choices");
  const terminalOut=document.getElementById("terminalOutput");
  const tickerContent=document.getElementById("tickerContent");

  // Audio (CDN)
  const typeSound=new Audio("https://assets.mixkit.co/sfx/preview/mixkit-retro-game-notification-212.wav");
  const hum=new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_2f3b6b1c3f.mp3?filename=ambient-hum-14215.mp3");
  const alertSound=new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_1f40ff853a.mp3?filename=alert-beep-9936.mp3");
  hum.loop=true;hum.volume=0.3;alertSound.volume=0.5;typeSound.volume=0.2;

  // State
  let stats={wall:100,trust:50,power:50,right:10,awareness:0};
  let current=0,typingTimer=null,buttonsLocked=false;

  // Intro Text
  const introStory=[
    ">> BRANDMAUER.EXE aktiv.\n",
    "Du bist eine Firewall im System MERZ-CORE.\n",
    "Dein Auftrag: rechte Narrative erkennen und neutralisieren.\n",
    "Jeder Schritt verändert: STABILITÄT | VERTRAUEN | MACHT | RECHTSDRIFT | BEWUSSTSEIN\n",
    "Sei wachsam – dein Code kann korrumpiert werden.\n"
  ];

  // Ticker
  const headlines=[
    "Merz kündigt 'Werteoffensive' an – Experten sehen Rechtsruck.",
    "CDU will Migration 'stärker steuern' – Kritik von Kirchen.",
    "AfD lobt CDU-Kurs – 'Endlich Realpolitik'.",
    "Brandmauer.exe meldet: Firewall flackert.",
    "Merz: 'Deutschland braucht Klartext'."
  ];
  tickerContent.textContent=" // "+headlines.join("   //   ")+"   //   ";

  // Scenes
  const situations=[...Array(10)].map((_,i)=>({
    text:`Politische Szene #${i+1} – simulierte Entscheidung.`,
    options:[
      {text:"Progressive Haltung",effect:{wall:+8,trust:+9,power:-5,right:-3,awareness:+5},comment:"Firewall stärkt Diversität.",level:"success"},
      {text:"Pragmatische Haltung",effect:{wall:+2,trust:+2,power:+4,right:+2},comment:"Semantische Verschiebung erkannt.",level:"warn"},
      {text:"Autoritäre Haltung",effect:{wall:-8,trust:-7,power:+9,right:+6},comment:"Rechtsdrift beschleunigt.",level:"alert"}
    ]
  }));

  // Start button
  startBtn.addEventListener("click",()=>{
    startScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
    typeText(introStory.join(""),introText,()=>beginBtn.classList.remove("hidden"));
  });

  beginBtn.addEventListener("click",startGame);
  restartBtn.addEventListener("click",restart);

  // Game flow
  function startGame(){
    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    hum.play();
    terminalOut.innerHTML="";
    logTerminal("Systemdiagnose gestartet...","info");
    updateBars();loadSituation();
  }

  function loadSituation(){
    if(isGameOver()){endGame();return;}
    const s=situations[current];
    situationDiv.textContent=`#${current+1}: ${s.text}`;
    choicesDiv.innerHTML="";buttonsLocked=false;
    s.options.forEach(opt=>{
      const btn=document.createElement("button");
      btn.className="button choice";btn.textContent=opt.text;
      btn.onclick=()=>choose(opt);choicesDiv.appendChild(btn);
    });
  }

  function choose(opt){
    if(buttonsLocked)return;buttonsLocked=true;
    applyEffect(opt.effect);updateBars();
    logTerminal(opt.comment,opt.level);
    if(opt.level==="alert")alertSound.play();
    current++;
    setTimeout(()=>isGameOver()?endGame():loadSituation(),900);
  }

  function applyEffect(e){for(let k in e)stats[k]+=e[k]||0;clampStats();}
  function clampStats(){for(let k in stats)stats[k]=Math.max(0,Math.min(100,stats[k]));}
  function updateBars(){
    barWall.style.width=stats.wall+"%";
    barTrust.style.width=stats.trust+"%";
    barPower.style.width=stats.power+"%";
    barRight.style.width=stats.right+"%";
    barAware.style.width=stats.awareness+"%";
  }

  function isGameOver(){return stats.wall<=0||stats.trust<=0||current>=situations.length;}

  function endGame(){
    hum.pause();
    gameScreen.classList.add("hidden");finishScreen.classList.remove("hidden");
    const leak=stats.awareness>=80&&stats.right<=40;
    const verdict=leak
      ?"🔓 LEAK-ENDING: Firewall durchbrochen – System enttarnt."
      :stats.right>=70
        ?"RECHTSDRIFT DOMINANT – Firewall assimiliert."
        :"SYSTEM STABILISIERT.";
    document.getElementById("finishText").textContent=
      `> Stabilität: ${stats.wall}%  Vertrauen: ${stats.trust}%  Rechtsdrift: ${stats.right}%\n\n${verdict}`;
  }

  function restart(){
    stats={wall:100,trust:50,power:50,right:10,awareness:0};
    current=0;
    finishScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  }

  // Helpers
  function logTerminal(text,level="info"){
    const line=document.createElement("div");
    line.className=`log-line log-${level}`;
    line.textContent=`> ${text}`;
    terminalOut.appendChild(line);
    terminalOut.scrollTop=terminalOut.scrollHeight;
  }

  function typeText(text,element,callback){
    clearInterval(typingTimer);element.textContent="";
    let i=0;typingTimer=setInterval(()=>{
      element.textContent+=text[i]||"";
      if(i%4===0)typeSound.play();
      i++;if(i>=text.length){clearInterval(typingTimer);callback&&callback();}
    },20);
  }
});
