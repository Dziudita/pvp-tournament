"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import CherryChat from "../components/CherryChat";

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
      <Image
  src="/avatars/cool-cherry.png"
  alt="Cool Cherry"
  width={100}
  height={100}
  className="absolute bottom-4 left-4 z-40"
/>
<Image
  src="/avatars/angry-cherry.png"
  alt="Angry Cherry"
  width={100}
  height={100}
  className="absolute bottom-4 right-4 z-40"
/>

        {/* Chat */}
        <CherryChat />
      </div>
    </div>
  );
}
