const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('spinBtn');

let angle = 0;
let spinning = false;
let targetAngle = 0;
let speed = 0;
let slowingDown = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
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

  // Tikslas (raudonas taškas)
  const targetX = canvas.width / 2 + 150 * Math.cos(targetAngle);
  const targetY = canvas.height / 2 + 150 * Math.sin(targetAngle);
  ctx.beginPath();
  ctx.arc(targetX, targetY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}

function animate() {
  if (!spinning) return;

  angle += speed;
  angle %= 2 * Math.PI;

  if (slowingDown) {
    speed *= 0.98; // ease-out efektas
    if (speed < 0.002) {
      spinning = false;
      slowingDown = false;
      btn.textContent = "Start";

      const diff = Math.abs((angle % (2 * Math.PI)) - targetAngle);
      const distance = Math.min(diff, 2 * Math.PI - diff); // trumpiausias atstumas

      const result = distance < 0.15 ? "🎯 HIT!" : "💨 Miss";
      alert(`${result}\nOffset: ${distance.toFixed(2)} rad`);
      return;
    }
  }

  drawWheel();
  requestAnimationFrame(animate);
}

btn.onclick = () => {
  if (!spinning) {
    // Start
    targetAngle = Math.random() * 2 * Math.PI;
    angle = 0;
    speed = 0.3;
    spinning = true;
    btn.textContent = "Stop";
    drawWheel();
    animate();
  } else if (!slowingDown) {
    // Stop
    slowingDown = true;
    btn.textContent = "Slowing...";
  }
};
