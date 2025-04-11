"use client";

import Image from "next/image";

export default function MainContent() {
  return (
    <main className="flex-grow px-8 py-10 text-center border border-pink-500 rounded-2xl bg-zinc-900/30 relative overflow-hidden">
      {/* Welcome Title */}
      <h1 className="text-5xl font-extrabold text-pink-500 mb-6 drop-shadow-[0_0_15px_#ff4dd6]">
        Welcome to the Cherry Arena 🍒
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-300 text-lg mb-10">
        Choose your game mode and start slapping!
      </p>

      {/* Cool Cherry on Left */}
      <Image
        src="/avatars/cool-cherry.png"
        alt="Cool Cherry"
        width={180}
        height={180}
        className="absolute left-0 bottom-12 animate-float drop-shadow-[0_0_15px_#ff4dd6]"
      />

      {/* Hammer Cherry on Right */}
      <Image
        src="/avatars/hammer-cherry.png"
        alt="Hammer Cherry"
        width={180}
        height={180}
        className="absolute right-0 bottom-12 animate-bounce drop-shadow-[0_0_20px_#ff4dd6]"
      />

      {/* Game Buttons */}
      <div className="flex justify-center gap-6 z-10 relative">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:opacity-90">
          PLAY DUEL (0.10 USDC)
        </button>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold text-lg hover:opacity-90">
          JOIN TOURNAMENT (5 USDC)
        </button>
      </div>
    </main>
  );
}
