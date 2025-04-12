// app/game/page.tsx
"use client";

import LuckySquares from "../../components/LuckySquares";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex items-center justify-center p-10">
      <div className="max-w-screen-lg w-full">
        <h1 className="text-4xl font-bold text-center text-pink-500 mb-6">
          🎯 Lucky Squares
        </h1>
        <p className="text-center text-zinc-300 mb-10">
          Pick a square and test your luck!
        </p>
        <LuckySquares />
      </div>
    </div>
  );
}
