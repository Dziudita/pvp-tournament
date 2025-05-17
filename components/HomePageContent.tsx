"use client";

import { useState } from "react";
import Image from "next/image";
import TopPlayerOfDay from "@/components/TopPlayerOfDay";
import TournamentRoomModal from "@/components/TournamentRoomModal";
import TournamentSelectModal from "@/components/TournamentSelectModal";
import CherryChat from "@/components/CherryChat";

export default function HomePageContent() {
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showTournamentSelectModal, setShowTournamentSelectModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  return (
    <>
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

      {/* 💬 Chatas */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <CherryChat />
      </div>
    </>
  );
}
