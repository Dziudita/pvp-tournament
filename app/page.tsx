"use client";

import React, { useEffect, useState } from "react";
import NicknameAuthModal from "../components/NicknameAuthModal";
import CherryChat from "../components/CherryChat";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

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
      <Sidebar />
      <Topbar />

      <main className="ml-56 mt-16 p-6 text-white bg-gradient-to-b from-black to-zinc-900 min-h-screen">
        <h1 className="text-4xl font-extrabold text-pink-500 mb-4">Welcome to the Cherry Arena 🍒</h1>
        <p className="text-zinc-300 mb-8">Choose your game mode and start slapping!</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
            PLAY DUEL (0.10 USDC)
          </button>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 hover:opacity-90">
            JOIN TOURNAMENT (5 USDC)
          </button>
        </div>
      </main>

      <CherryChat />

      {/* Corner cherries */}
      <img
        src="/cool-cherry.png"
        alt="Cool Cherry"
        className="absolute bottom-4 left-24 w-20 h-20 animate-bounce"
      />
      <img
        src="/angry-cherry.png"
        alt="Angry Cherry"
        className="absolute bottom-4 right-4 w-20 h-20 animate-pulse"
      />
    </>
  );
}
