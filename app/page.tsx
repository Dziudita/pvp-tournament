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

  return (
    <AuthWrapper>
      <div className="relative min-h-screen text-white overflow-hidden">
        
        {/* VS Veikėjų Fonas */}
        <Image
          src="/assets/vs-cherries-bg.png" // <- Naujas fonas!
          alt="VS Cherries Background"
          fill
          className="object-cover brightness-[0.9] saturate-150 contrast-125 -z-10"
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
