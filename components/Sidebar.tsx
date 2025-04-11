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
        <div className="flex items-center gap-3 mb-10">
          <Image
            src="/avatars/hammer-cherry.png"
            alt="Cherry Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-pink-400 leading-tight">
            CHERZI
            <br />
            ARENA
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 text-lg">
          <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
            <FaGamepad /> Games
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
            <FaScroll /> Rules
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
            <FaQuestionCircle /> About
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
            <FaLifeRing /> Support
          </Link>
        </nav>
      </div>

      {/* Login/Logout */}
      <div className="pt-10">
        <button className="flex items-center gap-2 hover:text-pink-400 text-lg">
          <FaSignInAlt /> Login / Logout
        </button>
      </div>
    </aside>
  );
}
