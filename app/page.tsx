'use client';

import { useEffect, useState } from "react";
import NicknameModal from "../components/NicknameModal";

export default function HomePage() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("cherzi-nickname");
    if (stored) setNickname(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white relative overflow-hidden">
      <NicknameModal />

      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-zinc-800">
        <h1 className="text-xl font-bold tracking-wide">CHERZI ARENA 🍒</h1>
        <div className="space-x-4">
          {nickname ? (
            <span className="text-pink-400 font-semibold">Welcome, {nickname}!</span>
          ) : (
            <span className="text-zinc-400 italic">Sign in to play</span>
          )}
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-pink-500 mb-4 drop-shadow">
          WELCOME TO CHERZI ARENA
        </h2>
        <p className="text-zinc-400 mb-8 text-sm md:text-base">
          Slap Fast. Win Cherry Glory.
        </p>

        {/* Buttons */}
        <div className="flex space-x-6">
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold">
            PLAY DUEL (0.10 USDC)
          </button>
          <button className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold">
            JOIN TOURNAMENT (5 USDC)
          </button>
        </div>
      </main>

      {/* Side chat mockup (left) */}
      <div className="fixed left-0 bottom-0 bg-zinc-800 text-white text-sm w-64 h-64 rounded-tr-xl shadow-xl p-4 overflow-y-auto hidden md:block">
        <p className="text-pink-400 font-bold mb-2">🍒 Cherry Chat</p>
        <p><strong>slapper22:</strong> who's ready to duel? 😎</p>
        <p><strong>boomcherry:</strong> i got 100ms record 🍒🔥</p>
        <p><strong>you:</strong> Let's gooo</p>
      </div>

      {/* Sign-in reminder (top-right placeholder) */}
      <div className="fixed top-4 right-4">
        {nickname ? null : (
          <button className="text-sm bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg font-medium">
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
