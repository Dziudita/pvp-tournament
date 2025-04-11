"use client";

import CherryChat from "../components/CherryChat";
import { useEffect, useState } from "react";

export default function Home() {
  const [nickname, setNickname] = useState("Cherry");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) setNickname(storedNickname);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-pink-500 p-6 hidden md:flex flex-col gap-6 text-left text-lg">
        <h1 className="text-2xl font-bold text-pink-400">CHERZI ARENA 🍒</h1>
        <nav className="flex flex-col gap-4 text-pink-200">
          <a href="#" className="flex items-center gap-2 hover:text-white">
            🎮 Games
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white">
            📜 Rules
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white">
            🧠 About
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white">
            🆘 Support
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white">
            🔐 Login / Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-pink-500 pb-4">
          <div className="text-xl text-pink-300 font-bold flex items-center gap-2">
            🍒 Welcome back, {nickname}!
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg bg-zinc-800 text-white outline-none"
            />
            <img
              src="/avatars/default.png"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mt-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-500 mb-4">
            Welcome to the Cherry Arena 🍒
          </h1>
          <p className="text-zinc-300 mb-8">
            Choose your game mode and start slapping!
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
              PLAY DUEL (0.10 USDC)
            </button>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 hover:opacity-90">
              JOIN TOURNAMENT (5 USDC)
            </button>
          </div>
        </div>
      </main>

      {/* Cool Cherry (bottom left) */}
      <img
        src="/cool-cherry.png"
        alt="Cool Cherry"
        className="absolute bottom-4 left-4 w-20 h-20 animate-bounce z-40"
      />

      {/* Angry Cherry (bottom right) */}
      <img
        src="/angry-cherry.png"
        alt="Angry Cherry"
        className="absolute bottom-4 right-4 w-20 h-20 animate-pulse z-40"
      />

      {/* Chat */}
      <CherryChat />
    </div>
  );
}
