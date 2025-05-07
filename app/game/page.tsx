"use client";

import Link from "next/link";

export default function GameHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white p-10">
      
      {/* ✨ Švytinti Antraštė */}
      <div className="text-center mb-12 mt-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
          🎮 Welcome to Cherry Arena
        </h1>
        <p className="mt-3 text-lg text-zinc-300 drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">
          Select a game below and test your luck 🍒
        </p>
      </div>

      {/* 🎲 Žaidimų pasirinkimas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        
        {/* 🎯 Lucky Squares */}
        <Link
         href="/game/wheel-of-skill"
          className="rounded-xl bg-zinc-800 border border-pink-500 p-6 hover:bg-zinc-700 transition shadow-lg hover:shadow-pink-500/20"
        >
          <h2 className="text-2xl font-bold text-pink-300 mb-2">🎯 Lucky Squares</h2>
          <p className="text-sm text-zinc-300">
            Pick a square and hope you’re lucky! Hit the golden square to win!
          </p>
        </Link>

        {/* 🌀 Wheel of Skill */}
        <Link
          href="/game/wheel"
          className="rounded-xl bg-zinc-800 border border-blue-500 p-6 hover:bg-zinc-700 transition shadow-lg hover:shadow-blue-500/20"
        >
          <h2 className="text-2xl font-bold text-blue-300 mb-2">🌀 Wheel of Skill</h2>
          <p className="text-sm text-zinc-300">
            Spin the wheel and try to hit the red marker. Precision matters!
          </p>
        </Link>

        {/* 🔒 Coin Flip */}
        <Link
          href="#"
          className="rounded-xl bg-zinc-800 border border-zinc-600 p-6 opacity-40 cursor-not-allowed"
        >
          <h2 className="text-2xl font-bold text-gray-400 mb-2">🪙 Coin Flip (soon)</h2>
          <p className="text-sm text-gray-500">1v1 coin duel coming soon...</p>
        </Link>
      </div>
    </div>
  );
}
