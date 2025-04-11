// app/page.tsx
"use client";

import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import CherryChat from "../components/CherryChat";

export default function Home() {
  return (
    <div className="flex h-screen bg-gradient-to-b from-black to-zinc-900 text-white relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-grow">
        <Header />
        <MainContent />
      </div>

      {/* Chat */}
      <CherryChat />

      {/* Cool Cherry (bottom-left) */}
      <img
        src="/avatars/cool-cherry.png"
        alt="Cool Cherry"
        className="absolute bottom-4 left-20 w-20 h-20 animate-bounce z-40"
      />

      {/* Angry Cherry (bottom-right) */}
      <img
        src="/avatars/angry-cherry.png"
        alt="Angry Cherry"
        className="absolute bottom-4 right-4 w-20 h-20 animate-pulse z-40"
      />
    </div>
  );
}
