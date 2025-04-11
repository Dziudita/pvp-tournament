"use client";

export default function MainContent() {
  return (
    <main className="flex-grow px-8 py-10 text-center">
      {/* Welcome Title */}
      <h1 className="text-5xl font-extrabold text-pink-500 mb-6">
        Welcome to the Cherry Arena 🍒
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-300 text-lg mb-10">
        Choose your game mode and start slapping!
      </p>

      {/* Game Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6">
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
