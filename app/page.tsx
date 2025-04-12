"use client";

import { useState, useEffect } from "react";
import LuckySquares from "../components/LuckySquares";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CherryChat from "../components/CherryChat";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import LoginModal from "../components/LoginModal";
import Image from "next/image";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const nick = localStorage.getItem("cherzi-nick");
    const pass = localStorage.getItem("cherzi-pass");
    if (nick && pass) setLoggedIn(true);
  }, []);

  if (!loggedIn) return <LoginModal />;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-black">
      <Sidebar />

      <div className="flex flex-col flex-grow relative">
        <Header />

        <div className="px-8 mt-8">
          <input
            type="text"
            placeholder="Search games or players..."
            className="w-full px-6 py-3 rounded-xl bg-zinc-800 text-white outline-none placeholder-pink-300 shadow-inner border border-pink-500"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start px-8 mt-10">
          <div className="flex flex-col gap-6">
            <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-90 shadow-md">
              PLAY DUEL
            </button>
            <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-xl hover:opacity-90 shadow-md">
              JOIN TOURNAMENT
            </button>
          </div>

          <div className="mt-10 md:mt-0 md:ml-10">
            <TopPlayerOfDay />
          </div>
        </div>

        <Image
          src="/avatars/cool-cherry.png"
          alt="Cool Cherry"
          width={130}
          height={130}
          className="absolute bottom-6 left-6 drop-shadow-[0_0_10px_#ff4dd6]"
        />
        <Image
          src="/avatars/angry-cherry.png"
          alt="Angry Cherry"
          width={130}
          height={130}
          className="absolute bottom-6 right-6 drop-shadow-[0_0_10px_#ff4dd6]"
        />

        <CherryChat />
      </div>
    </div>
  );
}
