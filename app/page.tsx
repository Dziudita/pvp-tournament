"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import WalletInfo from "../components/WalletInfo";
import CherryChat from "../components/CherryChat";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow relative">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-pink-500 bg-black/80">
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
          <WalletInfo />
        </div>

        {/* Search bar */}
        <div className="flex justify-center px-8 py-4">
          <input
            type="text"
            placeholder="Search games or players..."
            className="px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none w-full md:w-1/2 placeholder-pink-300 shadow-inner"
          />
        </div>

        {/* Game Buttons + Leaderboard */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 px-8 mt-10">
          {/* Kairėje – mygtukai */}
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-90">
              PLAY DUEL
            </button>
            <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-xl hover:opacity-90">
              JOIN TOURNAMENT
            </button>
          </div>

          {/* Dešinėje – lyderių lentelė */}
          <TopPlayerOfDay />
        </div>

        {/* Apatiniai avatarai */}
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

        {/* Chat komponentas */}
        <CherryChat />
      </div>
    </div>
  );
}
