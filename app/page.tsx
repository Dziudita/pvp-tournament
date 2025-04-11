"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import CherryChat from "../components/CherryChat";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-black to-zinc-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header />

        {/* Main */}
        <MainContent />
      </div>

      {/* Floating Cherry Chat */}
      <CherryChat />
    </div>
  );
}
