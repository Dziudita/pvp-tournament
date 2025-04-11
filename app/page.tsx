"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import CherryChat from "@/components/CherryChat";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="relative flex flex-col flex-grow bg-gradient-to-b from-black to-zinc-900">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <MainContent />

        {/* Bottom Cherries */}
        <img
          src="/avatars/cool-cherry.png"
          alt="Cool Cherry"
          className="w-20 h-20 absolute bottom-4 left-4 z-10"
        />
        <img
          src="/avatars/angry-cherry.png"
          alt="Angry Cherry"
          className="w-20 h-20 absolute bottom-4 right-4 z-10"
        />

        {/* Chat */}
        <CherryChat />
      </div>
    </div>
  );
}
