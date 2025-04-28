"use client";

import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "@/components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import AuthWrapper from '@/components/AuthWrapper';
import TournamentRoomModal from "@/components/TournamentRoomModal"; // Importuojame tikrą modalą
import { useState } from "react";
import Image from "next/image";
import TournamentSelectModal from "@/components/TournamentSelectModal";

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [showTournamentModal, setShowTournamentModal] = useState(false);
const [showTournamentSelectModal, setShowTournamentSelectModal] = useState(false);
const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  // Testiniai žaidėjai turnyrui
  const testPlayers = [
    { avatar: "/avatars/0rankangry.png", name: "CherryKing" },
    { avatar: "/avatars/0rankcrazy.png", name: "BoomBoom" },
    { avatar: "/avatars/0rankhappy.png", name: "Sweetie" },
    { avatar: "/avatars/0ranksad.png", name: "Tears" },
    { avatar: "/avatars/1rankangry.png", name: "FireFury" },
    { avatar: "/avatars/1rankcrazy.png", name: "Thunder" },
  ];

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
  onClick={() => setShowTournamentSelectModal(true)}
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
        {showTournamentSelectModal && (
  <TournamentSelectModal
    onSelect={(type: string) => {
      setSelectedTournament(type);
      setShowTournamentSelectModal(false);
      setShowTournamentModal(true);
    }}
    onClose={() => setShowTournamentSelectModal(false)}
  />
)}

        {/* Chat */}
        <CherryChat />
      </div>
    </AuthWrapper>
  );
}
