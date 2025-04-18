"use client";

import { useState } from "react";
import UserDropdown from "./UserDropdown";
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
        className="absolute top-5 left-5 text-white text-2xl z-50"
      >
        {isOpen ? "❌" : "☰"}
      </button>

      {/* Šoninė juosta su animacija */}
      <aside
        className={`bg-zinc-900 bg-opacity-80 text-white min-h-screen p-6 border-r border-pink-500 flex flex-col justify-between shadow-xl transition-all duration-300 ${
          isOpen ? "sidebar open" : "sidebar"
        }`}
      >
        <div>
          {/* User Profile Dropdown */}
          <div className="mb-10">
            <UserDropdown />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-6 text-xl">
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
        </div>
      </aside>
    </div>
  );
}
