"use client";

import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden text-white p-6">
      {/* Vyšnios fone */}
      <CherryRain />

      {/* Pagrindinis turinys */}
      <div className="relative z-10 max-w-3xl mx-auto min-h-[120vh]">
        <h1 className="text-4xl font-bold mb-4 text-pink-500 animate-pulse">About Cherzi Arena</h1>

        <p className="mb-6 text-lg">
          Welcome to <span className="text-yellow-400 font-semibold">Cherzi Arena</span>, where neon lights meet fierce PvP battles! 
          Our platform is built for players who crave action, competition, and style. Whether you're flipping coins, climbing leaderboards, 
          or just here for the thrill – we've got you covered.
        </p>

        {/* ... (gali įdėti likusį turinį čia, jei nori) */}

        <p className="mt-8 text-center text-pink-400 font-bold animate-bounce">
          Ready to dominate the arena? Let's go! 🍒
        </p>
      </div>

      {/* Vyšnių animacijos stiliai */}
      <style jsx>{`
        .cherry {
          animation: float 6s ease-in-out infinite, rotate 10s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.8; }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

// Vyšnių komponentas
function CherryRain() {
  const cherries = Array.from({ length: 12 }); // 12 vyšnių

  return (
    <>
      {cherries.map((_, idx) => (
        <Image
          key={idx}
          src="/assets/neon-cherry.png"
          alt="Cherry"
          width={40 + idx * 3}
          height={40 + idx * 3}
          className="absolute cherry"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.5,
            animationDelay: `${Math.random() * 5}s`,
            zIndex: 0, // fonui
          }}
        />
      ))}
    </>
  );
}
