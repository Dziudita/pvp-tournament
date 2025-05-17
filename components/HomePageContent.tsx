'use client';

import { useState } from "react";
import Image from "next/image";
import TopPlayerOfDay from "@/components/TopPlayerOfDay";
import TournamentRoomModal from "@/components/TournamentRoomModal";
import TournamentSelectModal from "@/components/TournamentSelectModal";
import CherryChat from "@/components/CherryChat";
import useUser from "@/hooks/useUser";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function HomePageContent() {
  const [collapsed, setCollapsed] = useState(false);
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showTournamentSelectModal, setShowTournamentSelectModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  const { user } = useUser();

  return (
    <div className="flex">
      {/* 🔻 Sidebar (fiksuotas) */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* 🔝 Topbar (fiksuotas viršuje) */}
      <Topbar collapsed={collapsed} />

      {/* 🧱 Pagrindinis turinys */}
      <main className={`pt-16 pb-24 px-6 transition-all duration-300 w-full ${collapsed ? "ml-14" : "ml-48"}`}>
        {/* 🌸 Fonas */}
        <div className="fixed inset-0 z-[-1]">
          <Image
            src="/assets/cherry-arena-bg.png"
            alt="Cherry Arena Background"
            fill
            className="object-cover brightness-[0.4] saturate-125 contrast-110 blur-sm"
            priority
          />
        </div>

        {/* 🎯 Turnyro mygtukas */}
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

        {/* 🏆 Dienos žaidėjas */}
        <div className="mt-12">
          <TopPlayerOfDay />
        </div>

        {/* 🪩 Modals */}
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

        {showTournamentModal && selectedTournament && (
          <TournamentRoomModal
            tournamentType={selectedTournament}
            onClose={() => setShowTournamentModal(false)}
          />
        )}
      </main>

      {/* 💬 Chatas (visada fiksuotas apačioje) */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <CherryChat />
      </div>
    </div>
  );
}
