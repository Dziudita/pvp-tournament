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
        <h1 className="text-4xl font-bold mb-4 text-pink-500">About Cherzi Arena</h1>

        <p className="mb-6 text-lg">
          Welcome to <span className="text-yellow-400 font-semibold">Cherzi Arena</span>, where neon lights meet fierce PvP battles! 
          Our platform is built for players who crave action, competition, and style. Whether you're flipping coins, climbing leaderboards, 
          or just here for the thrill – we've got you covered.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-pink-400">🌟 Our Mission</h2>
          <p>
            At Cherzi Arena, we believe in creating a unique PvP experience where every player has a chance to shine.
            We're dedicated to building a fair, exciting, and community-driven environment. The arena is your stage – show us what you've got!
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-pink-400">🔥 What Makes Us Different?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>🍒 <span className="text-yellow-400">Cherry-Themed Action</span> – games with vibrant neon cherry vibes.</li>
            <li>🏆 <span className="text-yellow-400">Leaderboards</span> – earn XP, level up, and unlock rare avatars.</li>
            <li>🎁 <span className="text-yellow-400">Daily Bonuses</span> – log in and grab free rewards every day!</li>
            <li>💎 <span className="text-yellow-400">Custom Avatars</span> – show your mood with angry, happy, or crazy cherries.</li>
            <li>⚔️ <span className="text-yellow-400">Provably Fair</span> – transparent gameplay with verified results.</li>
          </ul>
        </section>
{/* 💡 Why Join Cherzi Arena? sekcija */}
<section className="mt-8">
  <h2 className="text-2xl font-semibold mb-2 text-pink-400">💡 Why Join Cherzi Arena?</h2>
  <ul className="list-disc list-inside space-y-2">
    <li>⚡ Fast-paced PvP games designed for thrill-seekers.</li>
    <li>💰 Earn rewards, XP, and climb the leaderboard.</li>
    <li>🌐 Built for the community – your feedback shapes our future.</li>
    <li>🔒 Secure wallet integration and fair gameplay.</li>
  </ul>
</section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-pink-400">🚀 Future Plans</h2>
          <p>
            We're just getting started! Soon, expect to see:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>🌐 Tournaments with big prize pools.</li>
            <li>💰 $CHERZI token integration for staking and rewards.</li>
            <li>🎮 More PvP games to test your skills.</li>
            <li>📱 Mobile version for gaming on the go.</li>
          </ul>
        </section>

        <p className="mt-8 text-center text-pink-400 font-bold">
          Ready to dominate the arena? Let's go! 🍒
        </p>
      </div>
    </main>
  );
}

// Vyšnių komponentas be animacijos
function CherryRain() {
  const cherries = Array.from({ length: 15 }); // 15 vyšnių

  return (
    <>
      {cherries.map((_, idx) => (
        <Image
          key={idx}
          src="/assets/neon-cherry.png"
          alt="Cherry"
          width={40 + (idx % 3) * 10}
          height={40 + (idx % 3) * 10}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.1 + Math.random() * 0.2,
            zIndex: 0, // fone
          }}
        />
      ))}
    </>
  );
}
