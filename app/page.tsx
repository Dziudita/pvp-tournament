'use client';

import AppLayout from "@/components/AppLayout";
import HomePageContent from "@/components/HomePageContent";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* 🌸 Fonas fiksuotas, visas ekranas */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/assets/cherry-arena-bg.png"
          alt="Cherry Arena Background"
          fill
          className="object-cover brightness-[0.4] saturate-125 contrast-110 blur-sm"
          priority
        />
      </div>

      {/* 💎 Layout su Sidebar + Topbar */}
      <AppLayout>
        <HomePageContent />
      </AppLayout>
    </div>
  );
}
