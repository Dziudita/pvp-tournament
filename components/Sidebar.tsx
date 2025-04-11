"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Gamepad,
  ScrollText,
  BrainCircuit,
  LifeBuoy,
  Lock,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-zinc-900 text-white w-64 h-screen p-6 border-r border-pink-500 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold text-pink-400 mb-10">
          <Image
            src="/avatars/hammer-cherry.png"
            alt="logo"
            width={32}
            height={32}
          />
          CHERZI ARENA
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 text-lg">
          <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
            <Gamepad size={18} /> Games
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
            <ScrollText size={18} /> Rules
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
            <BrainCircuit size={18} /> About
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
            <LifeBuoy size={18} /> Support
          </Link>
        </nav>
      </div>

      {/* Auth */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center gap-2 text-left hover:text-pink-400">
          <Lock size={18} /> Login / Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
