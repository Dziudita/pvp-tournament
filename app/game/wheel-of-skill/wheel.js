const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('spinBtn');

let angle = 0;
let spinning = false;
let targetAngle = Math.random() * 2 * Math.PI;
let speed = 0.1;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(200, 200);
  ctx.rotate(angle);

  // Ratas
  ctx.beginPath();
  ctx.arc(0, 0, 150, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();

  // Rodyklė
  ctx.beginPath();
  ctx.moveTo(0, -140);
  ctx.lineTo(10, -150);
  ctx.lineTo(-10, -150);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.restore();

  // Tikslas
  const targetX = 200 + 150 * Math.cos(targetAngle);
  const targetY = 200 + 150 * Math.sin(targetAngle);
  ctx.beginPath();
  ctx.arc(targetX, targetY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}

function animate() {
  if (spinning) {
    angle += speed;
    angle %= 2 * Math.PI;
    drawWheel();
    requestAnimationFrame(animate);
  }
}

btn.onclick = () => {
  if (!spinning) {
    targetAngle = Math.random() * 2 * Math.PI;
    speed = 0.2;
    spinning = true;
    btn.textContent = "Stop";
    animate();
  } else {
    spinning = false;
    btn.textContent = "Start";

    // Tikslumo įvertinimas
    const diff = Math.abs((angle % (2 * Math.PI)) - targetAngle);
    const result = diff < 0.1 ? "HIT!" : "Miss";
    alert(result + ` Offset: ${diff.toFixed(2)} rad`);
  }
};
