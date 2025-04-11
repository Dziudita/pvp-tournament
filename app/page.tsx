"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import CherryChat from "../components/CherryChat";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow relative bg-gradient-to-b from-zinc-900 to-black">
        <Header />
        <MainContent />
        <CherryChat />

        {/* Avatar Decorations */}
        <Image
          src="/avatars/cool-cherry.png"
          alt="Cool Cherry"
          width={120}
          height={120}
          className="absolute bottom-4 left-4 z-40 drop-shadow-[0_0_10px_#ff4dd6]"
        />
        <Image
          src="/avatars/angry-cherry.png"
          alt="Angry Cherry"
          width={120}
          height={120}
          className="absolute bottom-4 right-4 z-40 drop-shadow-[0_0_10px_#ff4dd6]"
        />
      </div>
    </div>
  );
}
