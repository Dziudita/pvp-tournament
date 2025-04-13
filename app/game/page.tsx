"use client";

import Link from "next/link";

export default function GameHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white p-10">
      <h1 className="text-4xl font-bold text-pink-400 text-center mb-8">
        Choose a Game
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Link
          href="/game/lucky-squares"
          className="rounded-xl bg-zinc-800 border border-pink-500 p-6 hover:bg-zinc-700 transition"
        >
          <h2 className="text-2xl font-bold text-pink-300 mb-2">🎯 Lucky Squares</h2>
          <p className="text-sm text-zinc-300">
            Pick a square and hope you’re lucky! Hit the golden square to win!
          </p>
        </Link>

        {/* Galima pridėti daugiau žaidimų čia */}
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
