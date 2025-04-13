// app/game/page.tsx

"use client";
import LuckySquares from "../../components/LuckySquares";
import Image from "next/image";

export default function GamePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex items-center justify-center p-10 overflow-hidden">
      {/* Fono vyšnia kairėje */}
      <Image
        src="/assets/crazy-cherry-left.png"
        alt="Crazy Cherry"
        width={300}
        height={300}
        className="absolute left-0 bottom-0 z-0 opacity-80 pointer-events-none"
      />

      {/* Žaidimo turinys */}
      <div className="relative z-10 max-w-screen-lg w-full">
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
