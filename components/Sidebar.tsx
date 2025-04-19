"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaGamepad,
  FaScroll,
  FaQuestionCircle,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle mygtukas */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 text-white text-2xl z-50"
      >
        {isOpen ? "❌" : "☰"}
      </button>

      {/* Fiksuota sidebar panelė */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-zinc-900 bg-opacity-80 border-r border-pink-500 p-6 text-white shadow-xl z-40 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <nav className="flex flex-col gap-6 text-xl mt-10">
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
    </div>
  );
}
