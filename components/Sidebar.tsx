"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaGamepad,
  FaScroll,
  FaQuestionCircle,
  FaLifeRing,
} from "react-icons/fa";
import LogoutButton from "../components/LogoutButton";

export default function Sidebar() {
  return (
    <aside className="bg-zinc-900 text-white w-64 min-h-screen p-6 border-r border-pink-500 flex flex-col justify-between shadow-xl">
      <div>
        {/* Logo + Title */}
        <div className="flex items-center gap-4 mb-10">
          <Image
            src="/avatars/hammer-cherry.png"
            alt="Cherry Logo"
            width={48}
            height={48}
            className="rounded-full drop-shadow-[0_0_10px_#ff4dd6]"
          />
          <span className="text-3xl font-extrabold text-pink-500 leading-tight drop-shadow-[0_0_10px_#ff4dd6]">
            CHERZI <br /> ARENA
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 text-xl">
          <Link href="#" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
            🎮 Games
          </Link>
          <Link href="#" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
            📜 Rules
          </Link>
          <Link href="/about" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
            ❓ About
          </Link>
          <Link href="#" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
            💬 Support
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-10">
        <LogoutButton />
      </div>
    </aside>
  );
}
