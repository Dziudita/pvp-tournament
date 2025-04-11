"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Leaderboard from "../components/Leaderboard";
import WalletInfo from "../components/WalletInfo";
import CherryChat from "../components/CherryChat";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-[#1a1a1a] to-black text-white">
      {/* Sidebar kairėje */}
      <Sidebar />

      {/* Pagrindinis turinys */}
      <div className="flex flex-col flex-grow relative px-6 py-4 overflow-hidden">

        {/* Header su CHERZI ARENA ir vyšnia */}
        <Header />

        {/* Viršutinis dešinys kampas: Wallet Info */}
        <div className="absolute top-4 right-6 z-50">
          <WalletInfo />
        </div>

        {/* Paieška */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search..."
            className="px-6 py-3 w-full max-w-md rounded-xl bg-zinc-900/80 text-pink-300 placeholder-pink-400 text-lg shadow-inner outline-none"
          />
        </div>

        {/* Mygtukai */}
        <div className="flex gap-10 justify-center mt-16">
          <button className="px-12 py-5 text-xl font-bold rounded-xl bg-gradient-to-r from-pink-600 to-purple-500 hover:opacity-90">
            PLAY DUEL
          </button>
          <button className="px-12 py-5 text-xl font-bold rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 hover:opacity-90">
            JOIN TOURNAMENT
          </button>
        </div>

        {/* Lyderių lentelė dešinėje */}
        <div className="absolute right-6 top-[200px] z-30">
          <Leaderboard />
        </div>

        {/* Apatiniai avatarai ir Chat */}
        <div className="absolute bottom-4 left-4">
          <Image src="/avatars/cool-cherry.png" alt="Cool Cherry" width={100} height={100} />
        </div>
        <div className="absolute bottom-4 right-4">
          <Image src="/avatars/angry-cherry.png" alt="Angry Cherry" width={100} height={100} />
        </div>

        <CherryChat />
      </div>
    </div>
  );
}
