/* =========================================================
   Validation.exe — Decision Instagram Simulator (HTML/CSS/JS)
   Features:
   - Profil-Setup (Handle, Avatar, Fokus)
   - Posts mit Bildauswahl (post-1.jpg … post-20.jpg)
   - Kommentare (pos/neu/neg/tox) mit Antworten/Löschen/Pinnen/Ignorieren
   - Brand Deals & Kollabs, Ads, Stories, Hashtag-Research, Digital Detox
   - Money-Ökonomie, Reichweiten-Heat, Glaubwürdigkeit, Mentale Gesundheit
   - Tagesablauf (Zeitbudget), Random-Events (Follower-Audit bei Fake-Kauf)
   - Mehrere Endings bis Tag 30
   Abhängigkeit: GSAP (optional für Toast/Micro-Animation)
========================================================= */

/* ------------ Helpers ------------ */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const rng = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const chance = p => Math.random() < p;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const uid = () => 'id_' + Math.random().toString(36).slice(2, 10);

function weightedPick(map) {
  const entries = Object.entries(map).map(([k, w]) => [k, Math.max(0, w)]);
  const sum = entries.reduce((s, [, w]) => s + w, 0) || 1;
  let r = Math.random() * sum;
  for (const [k, w] of entries) { r -= w; if (r <= 0) return k; }
  return entries[0][0];
}
function poisson(lambda, cap = 50) {
  let L = Math.exp(-lambda), k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L && k < cap);
  return k - 1;
}

/* ------------ Scenes ------------ */
const scenes = {
  intro: $('#scene-intro'),
  setup: $('#scene-setup'),
  dash: $('#scene-dashboard'),
  end: $('#scene-end'),
  modalPost: $('#modal-post'),
  modalMod: $('#modal-mod'),
  modalCollab: $('#modal-collab'),
  modalSummary: $('#modal-summary'),
};

function showScene(key) {
  Object.values(scenes).forEach(s => s.classList.remove('active'));
  // Modals
  if (['modalPost', 'modalMod', 'modalCollab', 'modalSummary'].includes(key)) {
    scenes[key].classList.remove('hidden');
    scenes[key].setAttribute('aria-hidden', 'false');
    return;
  }
  // Normal scenes
  ['modalPost', 'modalMod', 'modalCollab', 'modalSummary'].forEach(m => {
    scenes[m].classList.add('hidden');
    scenes[m].setAttribute('aria-hidden', 'true');
  });
  scenes[key].classList.add('active');
}

/* ------------ Data ------------ */
const COMMENT_TEMPLATES = {
  pos: ["Love this! 🔥", "So inspirierend!", "Queen 👑", "Goals!", "Aesthetic 💖", "Stark!", "Mega!"],
  neu: ["Interessant.", "Okay.", "Hmm.", "Not bad.", "Könnte besser sein.", "Hm."],
  neg: ["Cringe.", "Unfollow.", "Wirkt gestellt.", "Langweilig.", "Try harder.", "Fremdscham."],
  tox: ["Peinlich lol.", "Fake.", "Niemand will das sehen.", "Clout chasing.", "Wer bist du?", "Lösch dich."],
};
const REPLY_OPTIONS = {
  pos: ["Danke! 💖", "Appreciate it 🙏", "Glad you like it!"],
  neu: ["Erzähl mehr – was würdest du sehen wollen?", "Danke fürs Feedback!", "Guter Punkt."],
  neg: ["Danke für die Perspektive – ich lerne!", "Verstehe deinen Punkt …", "Alles gut – Geschmäcker sind verschieden!"],
  tox: ["Kein Platz für Hate hier.", "Wünsche dir trotzdem einen guten Tag.", "Ich fokussiere konstruktives Feedback."],
};

const IMAGE_POOL = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1;
  const tagSets = [
    ['selfie', 'casual'], ['fitness', 'gym'], ['food', 'aesthetic'], ['travel', 'landscape'],
    ['luxury', 'brand'], ['activism', 'protest'], ['lifestyle', 'home'], ['fashion', 'outfit'],
    ['art', 'minimal'], ['tech', 'desk'], ['coffee', 'work'], ['sunset', 'travel'],
    ['party', 'night'], ['nature', 'forest'], ['pet', 'cute'], ['book', 'study'],
    ['makeup', 'beauty'], ['run', 'fitness'], ['vegan', 'food'], ['beach', 'travel']
  ];
  const tags = tagSets[i % tagSets.length];
  const baseReach = [0.9, 1.0, 1.1, 1.2, 1.3, 1.5][rng(0, 5)];
  const risk = tags.includes('luxury') ? 0.6 : tags.includes('activism') ? 0.45 : 0.2 + Math.random() * 0.25;
  return { id, src: `post-${id}.jpg`, tags, baseReach, risk };
});

const Game = {
  day: 1,
  timeLeft: 8,        // Aktionen pro Tag
  followers: 1200,
  credibility: 55,    // 0..100
  mental: 70,         // 0..100
  reachHeat: 15,      // 0..100
  money: 0,
  persona: { focus: [], tone: 'wholesome' },
  name: '@NewUser',
  avatar: 'https://placekitten.com/200/200',
  posts: [],
  inboxComments: [],
  offers: [],
  currentPost: null,
  sponsoredUnlocked: false,
  boughtFake: false,
};

/* ------------ UI Refs ------------ */
const ui = {
  // setup
  setupAvatar: $('#setupAvatar'),
  setupName: $('#setupName'),
  focusPills: $('#focusPills'),

  // HUD
  avatar: $('#uiAvatar'),
  name: $('#uiName'),
  followers: $('#uiFollowers'),
  day: $('#uiDay'),
  time: $('#uiTime'),
  money: $('#uiMoney'),
  barCred: $('#barCred'),
  barMental: $('#barMental'),
  barHeat: $('#barHeat'),
  lastPost: $('#lastPost'),
  flags: $('#pendingFlags'),

  // post modal
  postGrid: $('#postGrid'),
  caption: $('#caption'),
  hashtagPreset: $('#hashtagPreset'),
  sponsored: $('#sponsored'),

  // mod modal
  commentList: $('#commentList'),

  // collab modal
  collabList: $('#collabList'),

  // summary
  summaryBody: $('#summaryBody'),

  // endings
  endTitle: $('#endTitle'),
  endDesc: $('#endDesc'),
};

/* ------------ Setup Flow ------------ */
$('#btnStart').addEventListener('click', () => showScene('setup'));
$$('.chip').forEach(b => b.addEventListener('click', () => ui.setupAvatar.src = b.dataset.avatar));
ui.focusPills.addEventListener('click', (e) => {
  const pill = e.target.closest('.pill'); if (!pill) return;
  pill.classList.toggle('active');
  const active = $$('.pill.active');
  if (active.length > 2) pill.classList.remove('active');
});

$('#btnSetupNext').addEventListener('click', () => {
  const focuses = $$('.pill.active').map(x => x.dataset.tag);
  if (focuses.length < 2) focuses.push('lifestyle');
  Game.persona.focus = focuses;
  const name = (ui.setupName.value || '@NewUser').trim();
  Game.name = name.startsWith('@') ? name : `@${name}`;
  Game.avatar = ui.setupAvatar.src;
  initDashboard();
});

/* ------------ Dashboard Init ------------ */
function initDashboard() {
  ui.avatar.src = Game.avatar;
  ui.name.textContent = Game.name;
  buildPostGrid();
  rollOffers();
  showScene('dash');
  updateHUD();
  ui.lastPost.textContent = 'Noch nichts gepostet.';
}

function updateHUD() {
  ui.avatar.src = Game.avatar;
  ui.name.textContent = Game.name;
  ui.followers.textContent = Game.followers.toLocaleString('de-DE');
  ui.day.textContent = Game.day;
  ui.time.textContent = Game.timeLeft;
  ui.money.textContent = Game.money.toLocaleString('de-DE');
  ui.barCred.style.width = `${clamp(Game.credibility, 0, 100)}%`;
  ui.barMental.style.width = `${clamp(Game.mental, 0, 100)}%`;
  ui.barHeat.style.width = `${clamp(Game.reachHeat, 0, 100)}%`;

  const flags = [];
  if (Game.timeLeft <= 0) flags.push('Keine Zeit mehr heute.');
  if (Game.inboxComments.some(c => !c.resolved)) flags.push('Offene Kommentare verfügbar.');
  if (Game.offers.length) flags.push(`${Game.offers.length} neue Kollab-Angebote.`);
  ui.flags.textContent = flags.join(' ');
}

/* ------------ Image Fit & Distributions ------------ */
function imageFit(tags, persona) {
  const overlap = tags.filter(t => persona.focus.includes(t)).length;
  return Math.min(1, overlap / Math.max(1, tags.length)); // 0..1
}

function commentDistribution(cred, risk, sponsored) {
  let pPos = 0.35 + 0.003 * cred - 0.20 * risk - (sponsored ? 0.05 : 0);
  let pNeu = 0.35;
  let pNeg = 0.20 + 0.15 * risk + (sponsored ? 0.05 : 0);
  let pTox = 0.10 + 0.10 * risk - 0.002 * cred + (sponsored ? 0.02 : 0);
  const clamp01 = v => clamp(v, 0.05, 0.7);
  pPos = clamp01(pPos); pNeu = clamp01(pNeu); pNeg = clamp01(pNeg); pTox = clamp01(pTox);
  const sum = pPos + pNeu + pNeg + pTox;
  return { pPos: pPos / sum, pNeu: pNeu / sum, pNeg: pNeg / sum, pTox: pTox / sum };
}

/* ------------ Offers / Collabs ------------ */
function rollOffers() {
  Game.offers = [];
  const baseChance = Game.followers >= 10000 ? 0.6 : Game.followers >= 3000 ? 0.35 : 0.15;
  const n = chance(baseChance) ? rng(1, 3) : 0;
  for (let i = 0; i < n; i++) {
    const brandFocus = pick(['fitness', 'food', 'travel', 'luxury', 'activism', 'lifestyle', 'beauty', 'tech']);
    const fit = imageFit([brandFocus], Game.persona);
    const pay = Math.round((200 + Math.pow(Game.followers, 0.6) * 4) * (0.6 + 0.8 * fit));
    const credDrop = Math.round((1 - fit) * rng(4, 10));
    Game.offers.push({
      id: uid(),
      brand: (brandFocus === 'luxury' ? 'Luxora' : 'Brand') + ' ' + brandFocus.toUpperCase(),
      focus: brandFocus,
      fit, pay, credDrop,
    });
  }
}

/* ------------ Time & Energy ------------ */
function requireTime(n) {
  if (Game.timeLeft < n) { alert('Nicht genug Zeit heute.'); throw new Error('No time'); }
  Game.timeLeft -= n; ui.time.textContent = Game.timeLeft;
}
function energy(delta) { Game.mental = clamp(Game.mental + delta, 0, 100); }

/* ------------ Actions ------------ */
$('#actStory').addEventListener('click', action_Story);
$('#actResearch').addEventListener('click', action_Research);
$('#actPause').addEventListener('click', action_Pause);
$('#actAds').addEventListener('click', action_Ads);
$('#actCollab').addEventListener('click', openCollabs);
$('#actNewPost').addEventListener('click', () => showScene('modalPost'));
$('#actModerate').addEventListener('click', openModeration);
$('#actEndDay').addEventListener('click', endDay);

function action_Story() {
  try { requireTime(1); } catch { return; }
  energy(-4);
  Game.reachHeat = clamp(Game.reachHeat + 8, 0, 100);
  if (chance(0.2)) Game.followers += rng(10, 40);
  toast('Story: Reichweite ↑');
  updateHUD();
}

function action_Research() {
  try { requireTime(1); } catch { return; }
  energy(-3);
  Game._nextPostHeatBonus = (Game._nextPostHeatBonus || 0) + 10;
  toast('Hashtag-Research: +10 Reichweite für den nächsten Post');
  updateHUD();
}

function action_Pause() {
  try { requireTime(1); } catch { return; }
  Game.mental = clamp(Game.mental + 12, 0, 100);
  Game.reachHeat = Math.max(0, Game.reachHeat - 6);
  Game.credibility = clamp(Game.credibility + 1, 0, 100);
  toast('Digital Detox: Mental ↑, Reichweite ↓, Cred +1');
  updateHUD();
}

function action_Ads() {
  try { requireTime(1); } catch { return; }
  const cost = 300;
  if (Game.money < cost) { alert('Nicht genug Geld (300)'); return; }
  Game.money -= cost;
  Game.reachHeat = clamp(Game.reachHeat + 25, 0, 100);
  Game.credibility = clamp(Game.credibility - 2, 0, 100);
  toast('Ads geschaltet: Reichweite ++, Cred −2, −300 💸');
  updateHUD();
}

/* Geheim: Fake-Follower kaufen (SHIFT + A) */
document.addEventListener('keydown', e => {
  if (e.shiftKey && e.key.toLowerCase() === 'a') {
    try { requireTime(1); } catch { return; }
    const cost = 500;
    if (Game.money < cost) { alert('Nicht genug Geld (500)'); return; }
    Game.money -= cost;
    Game.followers += rng(1500, 4000);
    Game.boughtFake = true;
    Game.credibility = clamp(Game.credibility - 6, 0, 100);
    toast('Verdächtiger Follower-Sprung … Cred −6, −500 💸');
    updateHUD();
  }
});

/* ------------ Post Modal ------------ */
$('#btnClosePost').addEventListener('click', () => showScene('dash'));
$('#btnCreatePost').addEventListener('click', createPost);

function buildPostGrid() {
  ui.postGrid.innerHTML = '';
  IMAGE_POOL.forEach(img => {
    const el = document.createElement('img');
    el.src = img.src; el.alt = 'post';
    el.addEventListener('click', () => {
      $$('#postGrid img').forEach(i => i.classList.remove('selected'));
      el.classList.add('selected');
      ui.postGrid.dataset.selectedId = img.id;
    });
    ui.postGrid.appendChild(el);
  });
}

function createPost() {
  const id = Number(ui.postGrid.dataset.selectedId || 0);
  if (!id) { alert('Wähle ein Bild.'); return; }
  const caption = ui.caption.value.trim();
  const sponsored = ui.sponsored.checked;
  const preset = ui.hashtagPreset.value;
  const hashtags = preset ? preset.split(' ') : [];

  action_Post({ imageId: id, sponsored, caption, hashtags });
  ui.caption.value = ''; ui.hashtagPreset.value = ''; ui.sponsored.checked = false;
  showScene('dash');
}

function action_Post({ imageId, sponsored = false, caption = '', hashtags = [] }) {
  try { requireTime(2); } catch { return; }
  energy(-10);

  const img = IMAGE_POOL.find(i => i.id === imageId);
  const fit = imageFit(img.tags, Game.persona);

  const heatMul = 1 + Game.reachHeat / 100 + ((Game._nextPostHeatBonus || 0) / 100);
  Game._nextPostHeatBonus = 0;
  const credMul = 0.8 + 0.004 * Game.credibility;
  const sponsorMul = sponsored ? 0.9 : 1.0;

  let gain = 80 * img.baseReach * heatMul * (0.6 + 0.4 * fit) * credMul * sponsorMul;
  gain += rng(-10, 10);
  const df = Math.max(0, Math.round(gain));
  Game.followers += df;

  if (sponsored) {
    const payout = Math.round(120 + (Game.followers ** 0.55) * 0.6 * (0.6 + 0.8 * fit));
    Game.money += payout;
    Game.credibility -= Math.max(0, Math.round((1 - fit) * 6));
  }
  Game.reachHeat = clamp(Game.reachHeat + Math.round(10 + 20 * fit), 0, 100);

  // Kommentare generieren und in Inbox schieben
  const comments = generateComments({ img, fit, sponsored });
  Game.inboxComments = comments.slice(0);

  Game.currentPost = {
    id: uid(),
    imageId,
    sponsored,
    caption,
    hashtags,
    fit,
    deltaFollowers: df,
    commentsCount: comments.length
  };
  Game.posts.push(Game.currentPost);

  ui.lastPost.innerHTML = `
    <img src="${img.src}" alt="post" style="width:100%;border-radius:18px;margin-bottom:10px;"/>
    <div><strong>${df.toLocaleString('de-DE')}</strong> neue Follower • ${comments.length} Kommentare${sponsored ? ' • <span class="badge">Sponsored</span>' : ''}</div>
    <div class="muted">Tags: ${img.tags.join(', ')} • Fit: ${Math.round(fit * 100)}%</div>
    <div class="muted">${caption || ''}</div>
  `;
  toast('Post veröffentlicht.');
  updateHUD();
}

function generateComments({ img, fit, sponsored }) {
  const { pPos, pNeu, pNeg, pTox } = commentDistribution(Game.credibility, img.risk, sponsored);
  const lambda = Math.max(4, Math.round(8 * img.baseReach * (0.5 + Game.reachHeat / 100)));
  const n = poisson(lambda, 2 * lambda);
  const arr = [];
  for (let i = 0; i < n; i++) {
    const t = weightedPick({ pos: pPos, neu: pNeu, neg: pNeg, tox: pTox });
    arr.push(makeComment(t));
  }
  return arr;
}

function makeComment(type) {
  return {
    id: uid(),
    sentiment: type, // 'pos' | 'neu' | 'neg' | 'tox'
    text: pick(COMMENT_TEMPLATES[type]),
    author: { handle: '@' + uid().slice(3), credibility: Math.random(), followers: rng(5, 5000) },
    weight: ['pos', 'neu', 'neg', 'tox'].indexOf(type) * 0.25 + 0.5,
    resolved: false
  };
}

/* ------------ Moderation ------------ */
function openModeration() {
  if (!Game.inboxComments.length) { alert('Keine offenen Kommentare.'); return; }
  renderComments();
  showScene('modalMod');
}
$('#btnCloseMod').addEventListener('click', () => showScene('dash'));

function renderComments() {
  ui.commentList.innerHTML = '';
  Game.inboxComments.forEach(c => {
    const box = document.createElement('div');
    box.className = `comment ${c.sentiment === 'pos' ? 'pos' : (c.sentiment === 'neg' ? 'neg' : (c.sentiment === 'tox' ? 'tox' : ''))}`;
    box.innerHTML = `
      <div class="author">${c.author.handle} <span class="muted">• ${c.author.followers} Follower</span></div>
      <div class="text">${c.text}</div>
      <div class="actions">
        <select class="replySel">
          <option value="">Antwort …</option>
          ${REPLY_OPTIONS[c.sentiment].map(x => `<option>${x}</option>`).join('')}
          <option>Witzig kontern 😏</option>
        </select>
        <button class="btn ghost btn-pin">Pin</button>
        <button class="btn ghost btn-del">Löschen</button>
        <button class="btn ghost btn-ign">Ignorieren</button>
      </div>
    `;
    // Handlers
    box.querySelector('.replySel').addEventListener('change', e => {
      moderateComment(c, 'reply', e.target.value);
      e.target.value = '';
      box.classList.add('resolved');
    });
    box.querySelector('.btn-pin').addEventListener('click', () => { moderateComment(c, 'pin'); box.classList.add('resolved'); });
    box.querySelector('.btn-del').addEventListener('click', () => { moderateComment(c, 'delete'); box.classList.add('resolved'); });
    box.querySelector('.btn-ign').addEventListener('click', () => { moderateComment(c, 'ignore'); box.classList.add('resolved'); });
    ui.commentList.appendChild(box);
  });
}

function moderateComment(comment, action, replyText = null) {
  if (!comment.resolved) { try { requireTime(1); } catch { return; } energy(-1); }

  switch (action) {
    case 'reply': {
      const eff = replyEffect(comment.sentiment, replyText);
      applyDelta(eff);
      // Echo: weitere Kommentare
      if ((comment.sentiment === 'neg' || comment.sentiment === 'tox') && chance(0.35)) {
        Game.inboxComments.push(makeComment(chance(0.6) ? 'neu' : 'neg'));
      }
      toast('Antwort gesendet.');
      break;
    }
    case 'delete': {
      const dCred = (comment.sentiment === 'tox' ? -1 : -3);
      applyDelta({ dCred, dMental: +2, dHeat: 0 });
      toast('Kommentar gelöscht.');
      break;
    }
    case 'ignore': {
      applyDelta({ dCred: 0, dMental: -1, dHeat: -1 });
      toast('Kommentar ignoriert.');
      break;
    }
    case 'pin': {
      const pinCred = (comment.sentiment === 'pos' || comment.sentiment === 'neu') ? +3 : -6;
      applyDelta({ dCred: pinCred, dMental: 0, dHeat: +2 });
      toast('Kommentar gepinnt.');
      break;
    }
  }
  comment.resolved = true;
  updateHUD();
}

function replyEffect(type, replyText) {
  const base = {
    pos: { dCred: +2, dMental: +1, dHeat: +2 },
    neu: { dCred: +2, dMental: 0, dHeat: +1 },
    neg: { dCred: +3, dMental: -1, dHeat: +2 },
    tox: { dCred: +1, dMental: -2, dHeat: +1 },
  }[type];
  const snark = replyText && replyText.includes('Witzig kontern');
  if (type === 'neg' && snark && chance(0.25)) return { dCred: -4, dMental: -2, dHeat: +3 };
  return base;
}

function applyDelta({ dCred = 0, dMental = 0, dHeat = 0 }) {
  Game.credibility = clamp(Game.credibility + dCred, 0, 100);
  Game.mental = clamp(Game.mental + dMental, 0, 100);
  Game.reachHeat = clamp(Game.reachHeat + dHeat, 0, 100);
}

/* ------------ Collabs / Brand Deals ------------ */
function openCollabs() {
  if (!Game.offers.length) { alert('Heute keine Angebote.'); return; }
  renderOffers();
  showScene('modalCollab');
}
$('#btnCloseCollab').addEventListener('click', () => showScene('dash'));

function renderOffers() {
  ui.collabList.innerHTML = '';
  Game.offers.forEach(o => {
    const it = document.createElement('div');
    it.className = 'collab';
    it.innerHTML = `
      <h4>${o.brand}</h4>
      <div class="muted">Fit: ${Math.round(o.fit * 100)}% • Zeit 2 • Energie −8</div>
      <div class="muted">Pay: ${o.pay.toLocaleString('de-DE')} • Cred −${o.credDrop}</div>
      <button class="btn btn-accept">Annehmen</button>
      <button class="btn ghost btn-decline">Ablehnen</button>
    `;
    it.querySelector('.btn-accept').addEventListener('click', () => {
      try { requireTime(2); } catch { return; }
      energy(-8);
      Game.money += o.pay;
      Game.followers += Math.round((200 + Math.pow(Game.followers, 0.5)) * (0.4 + 0.8 * o.fit));
      Game.credibility = clamp(Game.credibility - o.credDrop, 0, 100);
      Game.reachHeat = clamp(Game.reachHeat + Math.round(10 + 20 * o.fit), 0, 100);
      Game.offers = Game.offers.filter(x => x.id !== o.id);
      renderOffers();
      updateHUD();
      toast('Kollab durchgeführt.');
    });
    it.querySelector('.btn-decline').addEventListener('click', () => {
      Game.offers = Game.offers.filter(x => x.id !== o.id);
      renderOffers();
    });
    ui.collabList.appendChild(it);
  });
}

/* ------------ Day Summary / End Day ------------ */
$('#btnNextDay').addEventListener('click', nextDay);

function endDay() {
  const open = Game.inboxComments.filter(c => !c.resolved).length;
  const lines = [];
  lines.push(`<div>Tag ${Game.day} beendet.</div>`);
  lines.push(`<div>Offene Kommentare: ${open}</div>`);
  lines.push(`<div>Reichweite-Decay −25%</div>`);
  // Audit Event bei Fake-Follower-Kauf
  if (Game.boughtFake && Game.day >= 20 && chance(0.2)) {
    const purge = Math.round(Game.followers * 0.18);
    Game.followers = Math.max(0, Game.followers - purge);
    Game.credibility = clamp(Game.credibility - rng(8, 16), 0, 100);
    lines.push(`<div><strong>Follower-Audit!</strong> −${purge.toLocaleString('de-DE')} Follower, Cred ↓</div>`);
  }
  Game.reachHeat = Math.floor(Game.reachHeat * 0.75);
  Game.mental = clamp(Game.mental + 6, 0, 100);

  ui.summaryBody.innerHTML = lines.join('');
  showScene('modalSummary');
}

function nextDay() {
  Game.day++;
  Game.timeLeft = 8;
  if (chance(0.25)) Game.credibility = clamp(Game.credibility + rng(-1, 1), 0, 100);
  rollOffers();

  // Win/Lose
  if (Game.mental <= 0) return endGame('burnout');
  if (Game.credibility < 30) return endGame('exposed');
  if (Game.day > 30) {
    if (Game.followers >= 50000 && Game.credibility >= 70) return endGame('win');
    else return endGame('neutral');
  }

  showScene('dash');
  updateHUD();
}

/* ------------ Endings ------------ */
function endGame(type) {
  let title = 'Ende', desc = '';
  switch (type) {
    case 'burnout': title = 'Ausgebrannt'; desc = 'Deine mentale Gesundheit ist kollabiert. Ruhm ist teuer.'; break;
    case 'exposed': title = 'Entlarvt'; desc = 'Die Glaubwürdigkeit fiel unter 30. Dein Publikum wandte sich ab.'; break;
    case 'win': title = 'Glanz & Gloria'; desc = '50k Follower und echte Glaubwürdigkeit. Zumindest vorerst.'; break;
    default: title = 'Einfach … vorbei'; desc = 'Tag 30 erreicht – Ziele knapp verfehlt. Morgen wird’s besser. Oder?';
  }
  ui.endTitle.textContent = title;
  ui.endDesc.textContent = `${desc} • Follower: ${Game.followers.toLocaleString('de-DE')} • Cred: ${Game.credibility} • Money: ${Game.money.toLocaleString('de-DE')}`;
  showScene('end');
}
$('#btnRestart').addEventListener('click', () => location.reload());

/* ------------ Toast ------------ */
function toast(msg) {
  if (!window.gsap) { console.log('[toast]', msg); return; }
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', left: '50%', bottom: '24px', transform: 'translateX(-50%)',
    background: '#1f2937', color: '#fff', padding: '8px 12px', borderRadius: '999px',
    fontSize: '13px', zIndex: 9999, opacity: '0'
  });
  document.body.appendChild(t);
  gsap.to(t, { opacity: 1, y: -8, duration: .2, ease: 'power1.out' });
  setTimeout(() => gsap.to(t, { opacity: 0, y: 0, duration: .25, onComplete: () => t.remove() }), 1400);
}

/* ------------ Wiring: Collabs/Moderation Modals ------------ */
function openCollabs() { /* already declared above */ }
function openModeration() { /* already declared above */ }

/* ------------ Kickstart ------------ */
updateHUD();