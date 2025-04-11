"use client";

import { FaGamepad, FaScroll, FaBrain, FaLifeRing, FaLock } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="bg-zinc-900 text-white w-64 h-screen p-6 border-r border-pink-500 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold text-pink-400 mb-10">
          <Image src="/avatars/hammer-cherry.png" alt="Cherry Arena Logo" width={32} height={32} />
          CHERZI ARENA
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 text-lg">
          <Link href="/games" className="flex items-center gap-2 hover:text-pink-400">
            <FaGamepad /> Games
          </Link>
          <Link href="/rules" className="flex items-center gap-2 hover:text-pink-400">
            <FaScroll /> Rules
          </Link>
          <Link href="/about" className="flex items-center gap-2 hover:text-pink-400">
            <FaBrain /> About
          </Link>
          <Link href="/support" className="flex items-center gap-2 hover:text-pink-400">
            <FaLifeRing /> Support
          </Link>
        </nav>
      </div>

      {/* Auth */}
      <div className="flex flex-col gap-4">
        <Link href="/login" className="flex items-center gap-2 text-left hover:text-pink-400">
          <FaLock /> Login / Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
