"use client";

import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden text-white p-6">
      {/* Pagrindinis turinys */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-pink-500 animate-pulse">About Cherzi Arena</h1>

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

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-pink-400">💡 Why Join Cherzi Arena?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>⚡ Fast-paced PvP games designed for thrill-seekers.</li>
            <li>💰 Earn rewards, XP, and climb the leaderboard.</li>
            <li>🌐 Built for the community – your feedback shapes our future.</li>
            <li>🔒 Secure wallet integration and fair gameplay.</li>
          </ul>
        </section>

        <p className="mt-8 text-center text-pink-400 font-bold animate-bounce">
          Ready to dominate the arena? Let's go! 🍒
        </p>
      </div>

      {/* Vyšnios fonui */}
      <Image
        src="/assets/neon-cherry.png"
        alt="Cherry"
        width={60}
        height={60}
        className="absolute top-10 left-20 floating-cherry opacity-70"
      />
      <Image
        src="/assets/neon-cherry.png"
        alt="Cherry"
        width={100}
        height={100}
        className="absolute top-1/2 left-1/3 floating-cherry opacity-50"
      />
      <Image
        src="/assets/neon-cherry.png"
        alt="Cherry"
        width={80}
        height={80}
        className="absolute bottom-20 right-40 floating-cherry opacity-60"
      />

      {/* Animacijos stilius */}
      <style jsx>{`
        .floating-cherry {
          animation: float 6s ease-in-out infinite, rotate 12s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
