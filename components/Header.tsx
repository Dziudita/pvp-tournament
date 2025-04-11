"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full px-8 py-6 border-b border-pink-500 bg-black/80 flex justify-center relative z-10">
      <h1 className="text-6xl font-extrabold text-pink-500 drop-shadow-[0_0_15px_#ff4dd6] flex items-center gap-4">
        CHERZI ARENA
        <Image
          src="/avatars/hammer-cherry.png"
          alt="Hammer Cherry"
          width={60}
          height={60}
          className="animate-bounce"
        />
      </h1>
    </header>
  );
}
