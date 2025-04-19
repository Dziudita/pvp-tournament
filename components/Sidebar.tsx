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
import Image from "next/image";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("User");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const storedNick = localStorage.getItem("cherzi-nick");
    const storedRole = localStorage.getItem("cherzi-role");
    if (storedNick) setNickname(storedNick);
    if (storedRole) setRole(storedRole);
  }, []);

  const avatarSrc =
    role === "owner"
      ? "/avatars/owner-avatar-cherry-steampunk.png"
      : "/avatars/default.png";

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
          {/* Tik vizualus avataras + vardas */}
          <div className="mb-10 flex flex-col items-center">
            <Image
              src={avatarSrc}
              alt="Sidebar Avatar"
              width={64}
              height={64}
              className="rounded-full border-2 border-pink-500 mb-2"
            />
            <span className="text-white font-semibold">{nickname}</span>
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
