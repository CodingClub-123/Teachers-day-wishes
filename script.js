<script>
function confettiBurst() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const colors = ['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93','#ff7ab6'];
  const pieces = [];

  // 🔥 Multi burst - crackers effect
  function addBurst(x, y, count = 120) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      pieces.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        g: 0.2,
        size: Math.random() * 6 + 3,
        rot: Math.random() * Math.PI,
        vr: (Math.random() * 0.2 - 0.1),
        life: 100 + Math.random() * 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() < 0.5 ? 'rect' : 'circle'
      });
    }
  }

  // 🎇 Add 4 cracker-style bursts
  addBurst(canvas.width/2, canvas.height/2); // center
  addBurst(canvas.width/4, canvas.height/2); // left
  addBurst(canvas.width*3/4, canvas.height/2); // right
  addBurst(canvas.width/2, canvas.height/4); // top

  // 🌧️ Plus some rain confetti
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 2,
      g: 0.05,
      size: Math.random() * 5 + 2,
      rot: Math.random() * Math.PI,
      vr: (Math.random() * 0.1 - 0.05),
      life: 200,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() < 0.5 ? 'rect' : 'circle'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    for (const p of pieces) {
      if (p.life > 0) {
        alive = true;
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life--;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life / 200);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.7);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size/2, 0, Math.PI*2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    if (alive) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  animate();
}
</script>
