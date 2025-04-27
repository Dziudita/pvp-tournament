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
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png"); // <- nauja

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
        <Topbar collapsed={collapsed} />

        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Turinys po viršutine juosta */}
        <div className="pt-16 flex">
          <div className={`${collapsed ? "ml-20" : "ml-64"
