let ego = 70;
let energy = 70;
let score = 0;
let gameRunning = true;

const egoBar = document.getElementById('egoBar');
const energyBar = document.getElementById('energyBar');
const postBtn = document.getElementById('postBtn');
const likeContainer = document.getElementById('likeContainer');
const gameOverScreen = document.getElementById('gameOver');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

function updateBars() {
  egoBar.style.width = `${ego}%`;
  energyBar.style.width = `${energy}%`;
}

function spawnHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '❤️';
  likeContainer.appendChild(heart);

  gsap.fromTo(heart,
    { x: 0, y: 0, scale: 1 },
    {
      x: (Math.random() - 0.5) * 200,
      y: -150 - Math.random() * 100,
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "power1.out",
      onComplete: () => heart.remove()
    }
  );
}

function post() {
  if (!gameRunning) return;
  spawnHeart();

  // zufällige Likes (z.B. 5–15)
  const likes = 5 + Math.floor(Math.random() * 10);
  ego = Math.min(ego + likes * 0.5, 100);
  energy = Math.max(energy - 10, 0);

  updateBars();
}

postBtn.addEventListener('click', post);

function gameLoop() {
  if (!gameRunning) return;

  // Ego & Energy langsam verändern
  ego -= 0.3;
  energy += 0.1; // kleine Regeneration
  
  if (ego < 0 || energy <= 0) {
    endGame();
  }

  updateBars();
  score += 0.05;

  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameRunning = false;
  gameOverScreen.classList.remove('hidden');
  scoreDisplay.textContent = Math.floor(score);
}

restartBtn.addEventListener('click', () => {
  ego = 70;
  energy = 70;
  score = 0;
  gameRunning = true;
  gameOverScreen.classList.add('hidden');
  updateBars();
  gameLoop();
});

updateBars();
gameLoop();
