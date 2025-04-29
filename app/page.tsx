"use client";

import { useState } from "react";
import Image from "next/image";
import AuthWrapper from '@/components/AuthWrapper';
import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "@/components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import TournamentSelectModal from "@/components/TournamentSelectModal";
import DepositButton from "@/components/DepositButton";

export default function HomePageContent() {
  const [collapsed, setCollapsed] = useState(false);
  const [showTournamentSelectModal, setShowTournamentSelectModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  return (
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

          {/* 💸 Deposit sekcija */}
          <div className="mt-6 px-8">
            <h2 className="text-lg font-bold mb-2">💰 Deposit USDC</h2>
            <DepositButton userId="placeholder-id" /> {/* You should get the actual userId from inside DepositButton using Supabase session */}
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
          }}
          onClose={() => setShowTournamentSelectModal(false)}
        />
      )}

      {/* Chat */}
      <CherryChat />
    </div>
  );
}

// Wrap in AuthWrapper at app level or in app/page.tsx
// Example if you need to export with wrapper:

export default function Page() {
  return (
    <AuthWrapper>
      <HomePageContent />
    </AuthWrapper>
  );
}
