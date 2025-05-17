'use client';

import HomePageContent from "@/components/HomePageContent";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* ✅ Vienas fonas – visam puslapiui */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/assets/cherry-arena-bg.png"
          alt="Cherry Arena Background"
          fill
          className="object-cover brightness-[0.4] saturate-125 contrast-110 blur-sm"
          priority
        />
      </div>

      {/* ✅ Tik viena turinio dalis */}
      <HomePageContent />
    </div>
  );
}
