// app/game/page.tsx
"use client";

import Link from "next/link";

export default function GameHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white p-10">
      <h1 className="text-4xl font-bold text-center text-pink-500 mb-10">
        🎮 Choose Your Game
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Lucky Squares */}
        <Link href="/game/lucky-squares">
          <div className="rounded-xl p-6 bg-zinc-800 hover:bg-zinc-700 transition text-center shadow-xl border border-pink-500 cursor-pointer">
            <h2 className="text-2xl text-pink-400 font-bold mb-2">🎯 Lucky Squares</h2>
            <p className="text-white">Click a square and test your luck!</p>
          </div>
        </Link>

        {/* Coin Flip Duel */}
        <Link href="/game/coinflip">
          <div className="rounded-xl p-6 bg-zinc-800 hover:bg-zinc-700 transition text-center shadow-xl border border-yellow-400 cursor-pointer">
            <h2 className="text-2xl text-yellow-300 font-bold mb-2">🪙 Coin Flip Duel</h2>
            <p className="text-white">Heads or Tails? Bet and win!</p>
          </div>
        </Link>

        {/* More games can be added here later */}
      </div>
    </div>
  );
}
