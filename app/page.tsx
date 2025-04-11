"use client";

import React, { useEffect, useState } from "react";
import NicknameAuthModal from "../components/NicknameAuthModal";
import CherryChat from "../components/CherryChat";

export default function Home() {
  const [nickname, setNickname] = useState("Cherry");

  useEffect(() => {
    const storedName = localStorage.getItem("nickname");
    if (storedName) {
      setNickname(storedName);
    }
  }, []);

  return (
    <>
      <NicknameAuthModal />
      <div className="relative min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="text-2xl font-bold">
            CHERZI ARENA <span className="inline-block">🍒</span>
          </div>
          <div className="flex items-center gap-2 text-pink-400">
            <img src="/avatars/default.png" alt="avatar" className="w-6 h-6 rounded-full" />
            <span>Welcome, {nickname}</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-pink-500 mb-2">
            WELCOME TO CHERZI ARENA
          </h1>
          <p className="text-lg text-zinc-300 mb-8">Slap Fast. Win Cherry Glory.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
              PLAY DUEL (0.10 USDC)
            </button>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 hover:opacity-90">
              JOIN TOURNAMENT (5 USDC)
            </button>
          </div>
        </main>

        {/* Cool Cherry Avatar (bottom-left) */}
        <img
          src="/cool-cherry.png"
          alt="Cool Cherry"
          className="absolute bottom-4 left-20 w-20 h-20 animate-bounce"
        />

        {/* Angry Cherry Avatar (bottom-right) */}
        <img
          src="/angry-cherry.png"
          alt="Angry Cherry"
          className="absolute bottom-4 right-4 w-20 h-20 animate-pulse"
        />

        {/* Chat */}
        <CherryChat />
      </div>
    </>
  );
}
