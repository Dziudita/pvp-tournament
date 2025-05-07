'use client';

import { useEffect, useRef, useState } from 'react';

export default function WheelGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [slowingDown, setSlowingDown] = useState(false);
  const [angle, setAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(Math.random() * 2 * Math.PI);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function drawWheel() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);

      // Wheel
      ctx.beginPath();
      ctx.arc(0, 0, 150, 0, 2 * Math.PI);
      ctx.fillStyle = '#333';
      ctx.fill();

      // Pointer
      ctx.beginPath();
      ctx.moveTo(0, -140);
      ctx.lineTo(10, -150);
      ctx.lineTo(-10, -150);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();

      ctx.restore();

      // Target (red dot)
      const targetX = canvas.width / 2 + 150 * Math.cos(targetAngle);
      const targetY = canvas.height / 2 + 150 * Math.sin(targetAngle);
      ctx.beginPath();
      ctx.arc(targetX, targetY, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    let animationId: number;

    function animate() {
      setAngle((prev) => {
        const newAngle = (prev + speed) % (2 * Math.PI);
        return newAngle;
      });

      drawWheel();

      if (spinning) {
        setSpeed((prevSpeed) => {
          if (slowingDown) {
            const newSpeed = prevSpeed * 0.98;
            if (newSpeed < 0.002) {
              setSpinning(false);
              setSlowingDown(false);
              const currentAngle = angle % (2 * Math.PI);
              const diff = Math.abs(currentAngle - targetAngle);
              const distance = Math.min(diff, 2 * Math.PI - diff);
              alert((distance < 0.15 ? '🎯 HIT!' : '💨 Miss') + `\nOffset: ${distance.toFixed(2)} rad`);
              return 0;
            }
            return newSpeed;
          }
          return prevSpeed;
        });
        animationId = requestAnimationFrame(animate);
      }
    }

    if (spinning) {
      animate();
    }

    return () => cancelAnimationFrame(animationId);
  }, [spinning, angle, targetAngle, speed, slowingDown]);

  const handleSpin = () => {
    if (!spinning) {
      setTargetAngle(Math.random() * 2 * Math.PI);
      setSpeed(0.3);
      setSpinning(true);
    } else if (!slowingDown) {
      setSlowingDown(true);
    }
  };

  return (
    <div className="text-center p-6 min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-pink-400">🎯 Wheel of Skill</h1>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="bg-black rounded-full mx-auto mb-6 shadow-lg"
      />
      <button
        onClick={handleSpin}
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded shadow-md"
      >
        {spinning ? (slowingDown ? 'Slowing...' : 'Stop') : 'Spin'}
      </button>
    </div>
  );
}
