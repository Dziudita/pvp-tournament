"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-pink-500 bg-black/60">
      {/* Kairėje – pasisveikinimas */}
      <div className="flex items-center gap-2 text-pink-400 font-bold text-lg">
        🍒 Welcome back, Cherry!
      </div>

      {/* Dešinėje – paieška + avataras */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search games or players..."
          className="px-3 py-2 rounded-lg bg-zinc-800 text-white outline-none w-64 placeholder-pink-300"
        />
        <Image
          src="/avatars/hammer-cherry.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full border border-pink-500 shadow-lg"
        />
      </div>
    </header>
  );
}
