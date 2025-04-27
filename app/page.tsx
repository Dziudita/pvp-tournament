"use client";

import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "@/components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import AuthWrapper from '@/components/AuthWrapper';
import { useState } from "react";

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false); 

  return (
    <AuthWrapper>
      <div 
        className="relative min-h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/assets/neon-cherry.png')" }} // <- Neon cherry fono paveikslėlis
      >
        {/* Overlay darken */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        {/* Topbar */}
        <Topbar collapsed={collapsed} />

        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Content */}
        <div className="pt-16 flex relative z-10">
          <div className={`${collapsed ? "ml-20" : "ml-64"} transition-all duration-300 w-full`}>
            
            {/* Game Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-start px-8 mt-10">
              <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
                CHERRY COINFLIP
              </button>
              <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
                TOURNAMENT
              </button>
            </div>

            {/* Leaderboard */}
            <div className="mt-10 px-8 md:ml-36">
              <TopPlayerOfDay />
            </div>
          </div>
        </div>

        {/* Chat */}
        <CherryChat />
      </div>
    </AuthWrapper>
  );
}
