'use client';

import Image from "next/image";
import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "@/components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import AuthWrapper from '@/components/AuthWrapper';
import { useState } from "react";

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false); 
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");

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

        {/* Topbar with avatarURL and setAvatarURL */}
        <Topbar avatarURL={avatarURL} setAvatarURL={setAvatarURL} collapsed={collapsed} />

        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Content below the top bar */}
        <div className={`pt-16 flex ${collapsed ? "ml-20" : "ml-64"} transition-all duration-300`}>
          {/* Main content area */}
          <div className="flex-grow">
            {/* Your main page content here */}
            <TopPlayerOfDay />
          </div>

          {/* CherryChat component */}
          <CherryChat />
        </div>
      </div>
    </AuthWrapper>
  );
}
