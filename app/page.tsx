"use client";

import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "@/components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import AuthWrapper from '@/components/AuthWrapper';
import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [showTournamentModal, setShowTournamentModal] = useState(false);

  return (
    <AuthWrapper>
      <div className="relative min-h-screen text-white overflow-hidden">
        
        {/* VS Veikėjų Fonas */}
        <Image
          src="/assets/vs-cherries-bg.png"
          alt="VS Cherries Background"
          fill
          className="object-cover brightness-[0.4] saturate-125 contrast-110 blur-sm -z-10"
          priority
        />

        {/* Topbar */}
        <Topbar collapsed={collapsed} />

        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Content */}
        <div className="pt-16 flex relative z-10">
          <div className={`${collapsed ? "ml-20" : "ml-64"} transition-all duration-300 w-full`}>

            {/* Game Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-start px-8 mt-10 gap-6">
              <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
                CHERRY COINFLIP
              </button>

              {/* Tournament Button as Image */}
              <Image
                src="/assets/tournament-button.png"
                alt="Tournament Button"
                width={240}
                height={80}
                onClick={() => setShowTournamentModal(true)}
                className="cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,0,255,0.7)]"
              />
            </div>

            {/* Leaderboard */}
            <div className="mt-10 px-8 md:ml-36">
              <TopPlayerOfDay />
            </div>
          </div>
        </div>

        {/* Tournament Modal */}
        {showTournamentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-pink-400">🎮 Tournaments Coming Soon!</h2>
              <p className="mb-6">Get ready to join thrilling PvP tournaments and win big prizes! More info coming soon.</p>
              <button
                onClick={() => setShowTournamentModal(false)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold hover:opacity-80 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Chat */}
        <CherryChat />
      </div>
    </AuthWrapper>
  );
}
