// ----- GLOBAL STATE -----
const scenes = {
  intro: document.getElementById('scene-intro'),
  setup: document.getElementById('scene-setup'),
  prep: document.getElementById('scene-prep'),
  game: document.getElementById('scene-game'),
  over: document.getElementById('scene-over'),
};

let state = {
  name: '@NewUser',
  avatar: 'https://placekitten.com/160/160',
  followers: 0,
  ego: 50,
  energy: 70,
  time: 0,
  running: false,
  raf: null,
};

// ----- HELPERS -----
function showScene(key){
  Object.values(scenes).forEach(s => s.classList.remove('active'));
  scenes[key].classList.add('active');
}

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

// ----- INTRO -----
const btnIntroStart = document.getElementById('btnIntroStart');
btnIntroStart.addEventListener('click', () => {
  showScene('setup');
});

// ----- SETUP -----
const avatarPreview = document.getElementById('avatarPreview');
const nameInput = document.getElementById('playerName');
document.querySelectorAll('.chip').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const url = btn.getAttribute('data-avatar');
    avatarPreview.src = url;
  });
});

const btnSetupNext = document.getElementById('btnSetupNext');
btnSetupNext.addEventListener('click', () => {
  const name = (nameInput.value || '').trim();
  state.name = name ? name : '@NewUser';
  state.avatar = avatarPreview.src;
  startPrepAnimation();
});

// ----- PREP (FOLLOWER GROWTH) -----
const followerCount = document.getElementById('followerCount');
const egoBarPrep = document.getElementById('egoBarPrep');
const prepLikeContainer = document.getElementById('prepLikeContainer');

function spawnHeart(container, spread=220){
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤️';
  container.appendChild(heart);

  gsap.fromTo(heart,
    { x: 0, y: 0, scale: 0.8, opacity: 0.9 },
    {
      x: (Math.random() - 0.5) * spread,
      y: -120 - Math.random() * 140,
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: 'power1.out',
      onComplete: ()=>heart.remove()
    }
  );
}

function startPrepAnimation(){
  showScene('prep');
  state.followers = 0;
  state.ego = 40;

  followerCount.textContent = '0';
  egoBarPrep.style.width = `${state.ego}%`;

  const duration = 4.0; // Sekunden
  const heartsInterval = setInterval(()=> spawnHeart(prepLikeContainer, 260), 120);

  gsap.to({}, {
    duration,
    onUpdate: function(){
      // Easing: schneller Start, langsames Auslaufen
      const t = this.progress(); // 0..1
      const eased = gsap.parseEase('power3.out')(t);
      state.followers = Math.floor(1000 + eased * 9000); // 1k → 10k
      state.ego = clamp(40 + eased * 45, 0, 100);        // 40 → ~85

      followerCount.textContent = state.followers.toLocaleString('de-DE');
      egoBarPrep.style.width = `${state.ego}%`;

      // Extra Herzen
      if (Math.random() < 0.5) spawnHeart(prepLikeContainer, 300);
    },
    onComplete: function(){
      clearInterval(heartsInterval);
      // Kurz warten, dann Spiel starten
      setTimeout(initGame, 600);
    }
  });
}

// ----- GAME -----
const egoBar = document.getElementById('egoBar');
const energyBar = document.getElementById('energyBar');
const btnPost = document.getElementById('btnPost');
const likeContainer = document.getElementById('likeContainer');

const uiName = document.getElementById('uiName');
const uiFollowers = document.getElementById('uiFollowers');
const avatarMini = document.getElementById('avatarMini');
const uiTime = document.getElementById('uiTime');
const uiScore = document.getElementById('uiScore');

function updateUI(){
  egoBar.style.width = `${clamp(state.ego,0,100)}%`;
  energyBar.style.width = `${clamp(state.energy,0,100)}%`;
  uiFollowers.textContent = state.followers.toLocaleString('de-DE');
  uiTime.textContent = Math.floor(state.time).toString();
  uiScore.textContent = Math.floor(state.time * (state.followers/100)).toString();
}

function initGame(){
  // prepare scene data
  uiName.textContent = state.name.startsWith('@') ? state.name : `@${state.name}`;
  avatarMini.src = state.avatar;

  state.time = 0;
  // Start mit solider Basis aus der Prep-Phase
  state.energy = 75;
  state.ego = clamp(state.ego, 50, 90);

  showScene('game');
  state.running = true;
  updateUI();
  gameLoop();
}

btnPost.addEventListener('click', ()=>{
  if(!state.running) return;
  // Likes für den Post
  const likes = 30 + Math.floor(Math.random()*60); // 30..90
  state.followers += Math.floor(likes/3);
  state.ego = clamp(state.ego + likes*0.15, 0, 100);
  state.energy = clamp(state.energy - 9, 0, 100);
  spawnHeart(likeContainer, 200);
  updateUI();
});

function gameLoop(){
  if(!state.running) return;

  // Zeit
  state.time += 0.016; // ~60 FPS
  // Passive Dynamik
  state.ego = clamp(state.ego - 0.22, 0, 100);        // Aufmerksamkeit verdampft
  state.energy = clamp(state.energy + 0.06, 0, 100);  // leichte Regeneration

  // sporadisch organische Likes (klein)
  if(Math.random() < 0.02){
    state.followers += 1 + Math.floor(Math.random()*3);
    state.ego = clamp(state.ego + 0.5, 0, 100);
    spawnHeart(likeContainer, 120);
  }

  // Lose-Bedingungen
  if(state.ego <= 0 || state.energy <= 0){
    return endGame();
  }

  updateUI();
  state.raf = requestAnimationFrame(gameLoop);
}

// ----- GAME OVER -----
const finalTime = document.getElementById('finalTime');
const finalFollowers = document.getElementById('finalFollowers');
const btnRestart = document.getElementById('btnRestart');
const btnBackToIntro = document.getElementById('btnBackToIntro');

function endGame(){
  state.running = false;
  cancelAnimationFrame(state.raf);
  finalTime.textContent = Math.floor(state.time).toString();
  finalFollowers.textContent = state.followers.toLocaleString('de-DE');
  showScene('over');
}

btnRestart.addEventListener('click', ()=>{
  // Neustart direkt ins Game mit gleichem Profil
  state.followers = 1200 + Math.floor(Math.random()*800);
  state.ego = 65;
  initGame();
});

btnBackToIntro.addEventListener('click', ()=>{
  // Komplett zurücksetzen
  state = {
    name: '@NewUser',
    avatar: 'https://placekitten.com/160/160',
    followers: 0,
    ego: 50,
    energy: 70,
    time: 0,
    running: false,
    raf: null,
  };
  avatarPreview.src = state.avatar;
  nameInput.value = '';
  showScene('intro');
});
