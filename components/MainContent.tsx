"use client";

import Image from "next/image";

export default function MainContent() {
  return (
    <main className="flex-grow px-8 py-10 text-center border border-pink-500 rounded-2xl bg-zinc-900/30 shadow-lg backdrop-blur-md max-w-5xl mx-auto">
      {/* Welcome Title */}
      <h1 className="text-5xl font-extrabold text-pink-500 drop-shadow-[0_0_15px_#ff4dd6] mb-6">
        Welcome to the Cherry Arena 🍒
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-300 text-lg mb-10">
        Choose your game mode and start slapping!
      </p>

      {/* Game Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:opacity-90 transition duration-200">
          PLAY DUEL (0.10 USDC)
        </button>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold text-lg hover:opacity-90 transition duration-200">
          JOIN TOURNAMENT (5 USDC)
        </button>
      </div>

      {/* Decorative Avatars */}
      <div className="relative mt-10">
        <div className="absolute -bottom-10 left-0 w-28 sm:w-40">
          <Image
            src="/avatars/cool-cherry.png"
            alt="Cool Cherry"
            width={160}
            height={160}
            className="w-full h-auto"
          />
        </div>
        <div className="absolute -bottom-10 right-0 w-28 sm:w-40">
          <Image
            src="/avatars/angry-cherry.png"
            alt="Angry Cherry"
            width={160}
            height={160}
            className="w-full h-auto"
          />
        </div>
      </div>
    </main>
  );
}
