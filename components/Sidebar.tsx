"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaGamepad,
  FaScroll,
  FaQuestionCircle,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function Sidebar() {
  const handleLogout = async () => {
    console.log("🚪 Bandome atsijungti...");

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("❌ Atsijungimo klaida:", error.message);
    } else {
      console.log("✅ Atsijungta iš Supabase");

      localStorage.removeItem("cherzi-nick");
      localStorage.removeItem("cherzi-pass");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-zinc-900 bg-opacity-80 border-r border-pink-500 p-6 text-white shadow-xl z-40 relative overflow-hidden">
      <nav className="flex flex-col gap-6 text-xl mt-10 relative z-10">
        <Link
          href="/game"
          className="flex items-center gap-4 text-pink-100 hover:text-pink-400"
        >
          <FaGamepad size={26} /> Games
        </Link>
        <Link
          href="#"
          className="flex items-center gap-4 text-pink-100 hover:text-pink-400"
        >
          <FaScroll size={26} /> Rules
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-4 text-pink-100 hover:text-pink-400"
        >
          <FaQuestionCircle size={26} /> About
        </Link>
        <Link
          href="#"
          className="flex items-center gap-4 text-pink-100 hover:text-pink-400"
        >
          <FaLifeRing size={26} /> Support
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-pink-100 hover:text-pink-400"
        >
          <FaSignOutAlt size={24} /> Logout
        </button>
      </nav>

      {/* Slaptas velniukas fone 👹🍒 */}
      <Image
        src="/cherry-mascot.png"
        alt="Cherry Mascot"
        width={200}
        height={200}
        className="absolute bottom-4 left-4 opacity-30 drop-shadow-[0_0_8px_#ff00aa] z-0 pointer-events-none select-none"
      />
    </aside>
  );
}
