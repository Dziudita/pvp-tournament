"use client";

import React from "react";
import { Cherry } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-zinc-900 border-r border-pink-500 p-4 z-40">
      <div className="text-pink-400 text-2xl font-bold flex items-center gap-2 mb-6">
        <Cherry className="w-6 h-6" />
        CHERZI ARENA
      </div>

      <nav className="flex flex-col gap-4 text-white">
        <Link href="#" className="hover:text-pink-400 transition">🎮 Games</Link>
        <Link href="#" className="hover:text-pink-400 transition">📜 Rules</Link>
        <Link href="#" className="hover:text-pink-400 transition">🧠 About</Link>
        <Link href="#" className="hover:text-pink-400 transition">🆘 Support</Link>
        <Link href="#" className="hover:text-pink-400 transition">🔐 Login / Logout</Link>
      </nav>
    </aside>
  );
}
