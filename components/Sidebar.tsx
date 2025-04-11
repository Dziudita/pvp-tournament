"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaGamepad,
  FaScroll,
  FaQuestionCircle,
  FaLifeRing,
  FaSignInAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="bg-zinc-900 text-white w-64 min-h-screen p-6 border-r border-pink-500 flex flex-col justify-between">
      <div>
        {/* Logo + Title */}
        <div className="flex items-center gap-4 mb-10">
          <Image
            src="/avatars/hammer-cherry.png"
            alt="Cherry Logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-pink-400 leading-tight">
            CHERZI <br /> ARENA
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 text-xl">
          <Link href="#" className="flex items-center gap-4 hover:text-pink-400">
            <FaGamepad size={28} /> Games
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:text-pink-400">
            <FaScroll size={28} /> Rules
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:text-pink-400">
            <FaQuestionCircle size={28} /> About
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:text-pink-400">
            <FaLifeRing size={28} /> Support
          </Link>
        </nav>
      </div>

      {/* Login / Logout */}
      <div className="mt-10">
        <Link href="#" className="flex items-center gap-4 hover:text-pink-400">
          <FaSignInAlt size={26} /> Login / Logout
        </Link>
      </div>
    </aside>
  );
}
