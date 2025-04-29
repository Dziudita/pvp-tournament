"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "@/components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import TournamentRoomModal from "@/components/TournamentRoomModal";
import TournamentSelectModal from "@/components/TournamentSelectModal";
import DepositButton from "@/components/DepositButton";
import useUser from "@/hooks/useUser";

export default function HomePageContent() {
  const [collapsed, setCollapsed] = useState(false);
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showTournamentSelectModal, setShowTournamentSelectModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  const { user } = useUser();

  const testPlayers = [
    { avatar: "/avatars/0rankangry.png", name: "CherryKing" },
    { avatar: "/avatars/0rankcrazy.png", name: "BoomBoom" },
    { avatar: "/avatars/0rankhappy.png", name: "Sweetie" },
    { avatar: "/avatars/0ranksad.png", name: "Tears" },
    { avatar: "/avatars/1rankangry.png", name: "FireFury" },
    { avatar: "/avatars/1rankcrazy.png", name: "Thunder" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <Image
        src="/assets/vs-cherries-bg.png"
        alt="VS Cherries Background"
        fill
        className="object-cover brightness-[0.4] saturate-125 contrast-110 blur-sm -z-10"
        priority
      />

      <Topbar collapsed={collapsed} />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="pt-16 flex relative z-10">
        <div className={`${collapsed ? "ml-20" : "ml-64"} transition-all duration-300 w-full`}>
          <div className="flex flex-col md:flex-row justify-between items-start px-8 mt-10 gap-6">
            <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
              CHERRY COINFLIP
            </button>

            <Image
              src="/assets/tournament-button.png"
              alt="Tournament Button"
              width={240}
              height={80}
              onClick={() => setShowTournamentSelectModal(true)}
              className="cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,0,255,0.7)]"
            />
          </div>

          {user && (
            <div className="mt-6 px-8">
              <h2 className="text-lg font-bold mb-2">\ud83d\udcb0 Deposit USDC</h2>
              <DepositButton userId={user.id} />
            </div>
          )}

          <div className="mt-10 px-8 md:ml-36">
            <TopPlayerOfDay />
          </div>
        </div>
      </div>

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

      <CherryChat />
    </div>
  );
}
