"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import TopPlayerOfDay from "@/components/TopPlayerOfDay";
import TournamentRoomModal from "@/components/TournamentRoomModal";
import TournamentSelectModal from "@/components/TournamentSelectModal";
import CherryChat from "@/components/CherryChat";
import useUser from "@/hooks/useUser";

export default function HomePageContent() {
  const [collapsed, setCollapsed] = useState(false);
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showTournamentSelectModal, setShowTournamentSelectModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  const { user } = useUser();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/vs-cherries-bg.png"
        alt="VS Cherries Background"
        fill
        className="object-cover brightness-[0.4] saturate-125 contrast-110 blur-sm -z-10"
        priority
      />

      {/* Fixed Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Fixed Topbar */}
      <Topbar collapsed={collapsed} />

      {/* Scrollable Main Content */}
      <div
        className={`
          pt-20 pb-32 pr-4 pl-4
          transition-all duration-300
          ${collapsed ? 'ml-14' : 'ml-40'}
          h-screen overflow-y-auto relative z-10
        `}
      >
        {/* Tournament button */}
        <div className="mt-8 flex justify-start">
          <Image
            src="/assets/tournament-button.png"
            alt="Tournament Button"
            width={240}
            height={80}
            onClick={() => setShowTournamentSelectModal(true)}
            className="cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,0,255,0.7)]"
          />
        </div>

        {/* Top Player of the Day */}
        <div className="mt-12">
          <TopPlayerOfDay />
        </div>
      </div>

      {/* Tournament Selection Modal */}
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

      {/* Tournament Room Modal */}
      {showTournamentModal && selectedTournament && (
        <TournamentRoomModal
          tournamentType={selectedTournament}
          onClose={() => setShowTournamentModal(false)}
        />
      )}

      {/* Fixed CherryChat at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <CherryChat />
      </div>
    </div>
  );
}
