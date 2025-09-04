<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teachers' Day Wishes</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: #fff;
      text-align: center;
    }
    #preview {
      margin: 20px auto;
      padding: 20px;
      max-width: 500px;
      border-radius: 12px;
      background: #1e293b;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    canvas#confetti {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
  </style>
</head>
<body>

  <h2>🌸 Teachers' Day Wishes 🌸</h2>
  <button onclick="openPreview()">Create Wish</button>

  <div id="preview" class="hidden">
    <h3>🎁 Your Wish</h3>
    <p>🌸 <b>Dear Teacher,</b></p>
    <p>Your lessons go beyond books and last a lifetime. 📖</p>
    <p>Wishing you a very <b>Happy Teachers' Day!</b> 🎉</p>
    <p>With respect and gratitude,<br><b>Coding Club — Department of Computer Applications</b></p>
  </div>

  <canvas id="confetti"></canvas>

<script>
function openPreview(){
  document.getElementById("preview").classList.remove("hidden");
  confettiBurst(); // 🎉 fire crackers immediately
}

function confettiBurst() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const pieces = [];
  const colors = ['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93','#ff7ab6'];

  // 💥 Big burst
  for (let i = 0; i < 200; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 6; // more speed for explosion
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      g: 0.3,
      size: Math.random() * 8 + 4,
      life: 80 + Math.random() * 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() * 0.2 - 0.1),
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
        ctx.globalAlpha = Math.max(0, p.life / 100);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size*0.7);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
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
</body>
</html>
