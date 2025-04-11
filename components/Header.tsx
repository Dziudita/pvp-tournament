'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-pink-500 bg-black/60">
      <div className="flex items-center gap-2 text-pink-400 font-bold text-lg">
        🍒 Welcome back, Cherry!
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search games or players..."
          className="px-4 py-2 rounded-lg bg-zinc-800 text-white border-none focus:ring-2 focus:ring-pink-500 w-64 outline-none"
        />
        <Image
          src="/avatars/hammer-cherry.png"
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
