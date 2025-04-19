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
    <aside className="fixed top-0 left-0 w-64 h-screen bg-zinc-900 bg-opacity-80 border-r border-pink-500 p-6 text-white shadow-xl z-40 overflow-hidden">
      {/* Neon glow fone */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500 to-purple-500 opacity-20 blur-2xl rounded-full z-0"></div>

      {/* Navigacija */}
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
    </aside>
  );
}
