"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import WalletInfo from "../components/WalletInfo";
import Leaderboard from "../components/Leaderboard";
import CherryChat from "../components/CherryChat";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-[#1a1a1a] to-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-grow relative p-6">
        {/* Top Section: Header & Wallet */}
        <div className="flex justify-between items-start border-b border-pink-500 pb-4">
          <Header />
          <WalletInfo />
        </div>

        {/* Search Bar */}
        <div className="mt-6 mb-10">
          <input
            type="text"
            placeholder="Search games or players..."
            className="w-full px-5 py-3 rounded-xl bg-zinc-800 text-white placeholder-pink-300 outline-none shadow-inner text-lg"
          />
        </div>

       {/* Game Buttons + Leaderboard */}
<div className="flex flex-col md:flex-row justify-between items-start gap-10 px-8 mt-20">
  {/* Kairėje – žaidimo mygtukai */}
  <div className="flex flex-col gap-6 w-full md:w-auto">
    <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-90">
      PLAY DUEL
    </button>
    <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-xl hover:opacity-90">
      JOIN TOURNAMENT
    </button>
  </div>

  {/* Dešinėje – Top žaidėjų sąrašas */}
  <TopPlayerOfDay />
</div>
          </button>
        </div>

        {/* Bottom Section: Leaderboard & Chat */}
        <div className="flex flex-grow gap-10">
          {/* Left Column */}
          <div className="flex flex-col justify-end">
            <Image
              src="/avatars/cool-cherry.png"
              alt="Cool Cherry"
              width={130}
              height={130}
              className="drop-shadow-[0_0_10px_#ff4dd6]"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col flex-grow items-end gap-6">
            <Leaderboard />
            <TopPlayerOfDay />
            <Image
              src="/avatars/angry-cherry.png"
              alt="Angry Cherry"
              width={130}
              height={130}
              className="drop-shadow-[0_0_10px_#ff4dd6]"
            />
          </div>
        </div>

        {/* Chat */}
        <CherryChat />
      </div>
    </div>
  );
}
