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
            <FaGamepad size={26} /> Games
          </Link>
          <Link href="#" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
            <FaScroll size={26} /> Rules
          </Link>
          <Link href="/about" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
  <FaQuestionCircle size={26} /> About
</Link>
          <Link href="#" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
            <FaLifeRing size={26} /> Support
          </Link>
        </nav>
      </div>

      {/* Login / Logout */}
      <div className="mt-10">
        <Link href="#" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
          <div className="w-10 h-10 bg-pink-500/80 hover:bg-pink-400 transition rounded-full flex items-center justify-center shadow-md">
            <FaSignInAlt size={22} />
          </div>
          Login / Logout
        </Link>
      </div>
    </aside>
  );
}
