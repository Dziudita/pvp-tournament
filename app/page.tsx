'use client';

import Image from "next/image";
import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "@/components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import AuthWrapper from '@/components/AuthWrapper';
import { useState, useEffect } from "react";

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");

  // Nuskaitom avatar iš localStorage
  useEffect(() => {
    const storedAvatar = localStorage.getItem("cherzi-avatar");
    if (storedAvatar) {
      setAvatarURL(storedAvatar);
    }
  }, []);

  return (
    <AuthWrapper>
      <div className="relative w-screen h-screen overflow-hidden text-white">
        {/* Background image */}
        <Image
          src="/assets/cherry-arena-bg.png"
          alt="Background"
          fill
          className="object-cover brightness-[0.8] saturate-150 contrast-125 -z-10"
          priority
        />

        {/* Topbar su avatarURL ir setAvatarURL */}
        <Topbar collapsed={collapsed} avatarURL={avatarURL} setAvatarURL={setAvatarURL} />

        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Turinys */}
        <div className="pt-16 flex">
          <div className={`${collapsed ? "ml-20" : "ml-64"} transition-all duration-300 w-full`}>
            {/* Search */}
            <div className="px-8 mt-8">
              <input
                type="text"
                placeholder="Search users or players..."
                className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none placeholder-pink-300 shadow-inner border border-pink-500"
              />
            </div>

            {/* Game buttons */}
            <div className="flex flex-col md:flex-row justify-between items-start px-8 mt-10">
              <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
                CHERRY COINFLIP
              </button>
              <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
                TOURNAMENT
              </button>
            </div>

            {/* Top player */}
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
