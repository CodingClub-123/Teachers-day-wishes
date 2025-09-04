
/* ===== UTIL ===== */
const $ = (sel) => document.querySelector(sel);
const teacherNameInput = $('#teacherName');
const createBtn = $('#createBtn');
const resetBtn = $('#resetBtn');
const closeBtn = $('#closeBtn');
const preview = $('#preview');
const wishBody = $('#wishBody');

function titleCase(str){
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
}

/* ===== GLITTER BACKGROUND (canvas) ===== */
(() => {
  const canvas = document.getElementById('glitter');
  const ctx = canvas.getContext('2d', { alpha: true });
  let w, h, particles;
  const density = 0.00018; // particles per pixel
  const TAU = Math.PI * 2;

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    const count = Math.max(120, Math.floor(w * h * density));
    particles = new Array(count).fill(0).map(() => ({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.2 + 0.3,
      tw: Math.random()*TAU,
      spx: (Math.random() - .5) * .06,
      spy: (Math.random() - .5) * .06
    }));
  }

  function step(t){
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation = 'lighter';
    for(const p of particles){
      p.tw += 0.02;
      p.x += p.spx; p.y += p.spy;
      if(p.x < -5) p.x = w+5; if(p.x > w+5) p.x = -5;
      if(p.y < -5) p.y = h+5; if(p.y > h+5) p.y = -5;

      const flicker = (Math.sin(p.tw)*0.5 + 0.5) * 0.8 + 0.2; // 0.2..1.0
      ctx.beginPath();
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 10);
      grd.addColorStop(0, `rgba(255,255,255,${0.9*flicker})`);
      grd.addColorStop(0.3, `rgba(255,240,210,${0.35*flicker})`);
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grd;
      ctx.arc(p.x, p.y, p.r*10, 0, TAU);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  addEventListener('resize', resize);
  resize(); step();
})();

/* ===== CONFETTI BURST ===== */
function confettiBurst() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth; canvas.height = innerHeight;

  const pieces = [];
  for (let i = 0; i < 220; i++) {
    pieces.push({
      x: canvas.width/2,
      y: canvas.height/2 - 40,
      vx: (Math.random()*2-1) * (Math.random()*8+3),
      vy: (Math.random()*-8-4),
      g: 0.22 + Math.random()*0.08,
      size: Math.random()*6+3,
      rot: Math.random()*Math.PI,
      vr: (Math.random()*0.2 - 0.1),
      life: 120 + Math.random()*40,
      shape: Math.random() < 0.3 ? 'circle' : 'rect'
    });
  }

  let frames = 0;
  (function tick(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const p of pieces){
      p.vy += p.g;
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life/160);
      ctx.fillStyle = ['#8ab4ff','#ff7ab6','#6ee7b7','#ffd166','#c4b5fd'][p.size|0 % 5];
      if(p.shape === 'rect'){
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.7);
      } else {
        ctx.beginPath(); ctx.arc(0,0,p.size/1.6,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();
    }
    if(frames < 220) requestAnimationFrame(tick);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  })();
}

/* ===== WISH GENERATION ===== */
function buildWish(name){
  const n = name ? titleCase(name) : 'Teacher';
  return `
  <p>🌸 <strong>Dear ${n}</strong>,</p>
  <p>You are a guide, mentor and inspiration. 🔭</p>
  <p>Wishing you a very <strong>Happy Teachers' Day!</strong> 🎉</p>
  <p>With respect and gratitude,</p>
  <p><strong>Coding Club — BCA Dept</strong><br/>PSVASC</p>`;
}

function openPreview(){
  preview.classList.remove('hidden');
  confettiBurst();
}

function closePreview(){
  preview.classList.add('hidden');
}

createBtn.addEventListener('click', () => {
  const val = teacherNameInput.value.trim();
  wishBody.innerHTML = buildWish(val);
  openPreview();
});

resetBtn.addEventListener('click', () => {
  teacherNameInput.value = '';
  teacherNameInput.focus();
});

closeBtn.addEventListener('click', closePreview);
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closePreview(); });

/* Small polish: press Enter to create */
teacherNameInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){ createBtn.click(); }
});

/* Fake logout button (optional) */
document.getElementById('logoutBtn').addEventListener('click', ()=>{
  alert('Logged out (demo).');
});
