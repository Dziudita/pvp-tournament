"use client";

export default function MainContent() {
  return (
    <main className="flex-grow px-4 sm:px-8 py-10 text-center text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-500 mb-4 drop-shadow-lg">
        Welcome to the Cherry Arena 🍒
      </h1>
      <p className="text-zinc-300 text-md sm:text-lg mb-10">
        Slap fast. Win cherry glory.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:scale-105 transition-transform duration-300">
          PLAY DUEL (0.10 USDC)
        </button>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold text-lg hover:scale-105 transition-transform duration-300">
          JOIN TOURNAMENT (5 USDC)
        </button>
      </div>
    </main>
  );
}
