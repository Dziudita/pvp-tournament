"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CherryChat from "../components/CherryChat";
import Leaderboard from "../components/Leaderboard"; // 👈 pridėta
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow relative">
        {/* Header with CHERZI ARENA + hammer cherry */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-pink-500 bg-black/80">
          <h1 className="text-6xl font-extrabold text-pink-500 drop-shadow-[0_0_15px_#ff4dd6] flex items-center gap-4">
            CHERZI ARENA
            <Image
              src="/avatars/hammer-cherry.png"
              alt="Hammer Cherry"
              width={60}
              height={60}
              className="animate-bounce"
            />
          </h1>
        </div>

        {/* 🏆 Leaderboard */}
        <Leaderboard />

        {/* Search bar + Welcome */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-pink-500">
          <input
            type="text"
            placeholder="Search games or players..."
            className="px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none w-96 placeholder-pink-300 shadow-inner"
          />

          <div className="flex items-center gap-2 text-pink-400 font-bold text-lg">
            <Image
              src="/avatars/cool-cherry.png"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full border border-pink-500"
            />
            Welcome, CherZi!
          </div>
        </div>

        {/* Game Buttons */}
        <div className="flex justify-center gap-10 mt-20">
          <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-90">
            PLAY DUEL
          </button>
          <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-xl hover:opacity-90">
            JOIN TOURNAMENT
          </button>
        </div>

        {/* Bottom Avatars */}
        <Image
          src="/avatars/cool-cherry.png"
          alt="Cool Cherry"
          width={130}
          height={130}
          className="absolute bottom-6 left-6 drop-shadow-[0_0_10px_#ff4dd6]"
        />
        <Image
          src="/avatars/angry-cherry.png"
          alt="Angry Cherry"
          width={130}
          height={130}
          className="absolute bottom-6 right-6 drop-shadow-[0_0_10px_#ff4dd6]"
        />

        <CherryChat />
      </div>
    </div>
  );
}
