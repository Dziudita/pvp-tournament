'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function WheelGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [spinning, setSpinning] = useState(false);
  const [slowingDown, setSlowingDown] = useState(false);
  const [angle, setAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(Math.random() * 2 * Math.PI);
  const [speed, setSpeed] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    function drawWheel() {
      if (!ctxRef.current || !canvasRef.current) return;
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;

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

      // Target
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
              const hitTolerance = getHitTolerance();

              const message =
                (distance < hitTolerance ? '🎯 HIT!' : '💨 Miss') +
                `\nOffset: ${distance.toFixed(2)} rad\nLevel: ${difficulty.toUpperCase()}`;
              setResultMessage(message);
              setTimeout(() => setResultMessage(null), 3000);
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
  }, [spinning, angle, targetAngle, speed, slowingDown, difficulty]);

  const getSpinSpeed = () => {
    switch (difficulty) {
      case 'easy': return 0.2;
      case 'medium': return 0.35;
      case 'hard': return 0.55;
    }
  };

  const getHitTolerance = () => {
    switch (difficulty) {
      case 'easy': return 0.3;
      case 'medium': return 0.15;
      case 'hard': return 0.07;
    }
  };

  const handleSpin = () => {
    if (!spinning) {
      setTargetAngle(Math.random() * 2 * Math.PI);
      setSpeed(getSpinSpeed());
      setSpinning(true);
    } else if (!slowingDown) {
      setSlowingDown(true);
    }
  };

  return (
    <div className="text-center p-6 min-h-screen bg-gradient-to-b from-black to-zinc-900 relative">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">🎯 Wheel of Skill</h1>

      {/* Difficulty selector */}
      <div className="flex justify-center gap-4 mb-6">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
            className={`px-4 py-2 rounded font-bold border transition ${
              difficulty === level
                ? 'bg-pink-600 text-white border-pink-400'
                : 'bg-zinc-800 text-zinc-300 border-zinc-500'
            }`}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="relative w-[400px] h-[400px] mx-auto mb-6">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="bg-black rounded-full shadow-lg"
        />

        {/* Cherry icon center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Image
  src="/assets/wheel.png"
  alt="Cherry Center"
  width={120}
  height={120}
  className="drop-shadow-[0_0_10px_rgba(255,0,255,0.6)]"
/>

        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={handleSpin}
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded shadow-md"
      >
        {spinning ? (slowingDown ? 'Slowing...' : 'Stop') : 'Spin'}
      </button>

      {/* Result message */}
      {resultMessage && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-zinc-800 border border-pink-500 text-white px-6 py-4 rounded-xl shadow-lg animate-fade-in">
          <pre className="whitespace-pre text-sm font-mono text-pink-300">{resultMessage}</pre>
        </div>
      )}
    </div>
  );
}
