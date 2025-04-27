"use client";

import Link from "next/link";
import {
  FaGamepad,
  FaScroll,
  FaQuestionCircle,
  FaLifeRing,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");
  const [nickname, setNickname] = useState("Guest");

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      const userAvatar = data?.user?.user_metadata?.avatar;
      const userNickname = data?.user?.user_metadata?.nickname;
      if (userAvatar) setAvatarURL(userAvatar);
      if (userNickname) setNickname(userNickname);
    };
    fetchUserData();
  }, []);

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
    <aside
      className={`fixed top-0 left-0 ${collapsed ? "w-16" : "w-52"} h-screen bg-zinc-900 bg-opacity-90 border-r border-pink-500 text-white shadow-xl z-40 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(255,0,255,0.3)]`}
    >
      {/* Suskleidimo mygtukas */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-pink-400 hover:text-pink-300"
        >
          {collapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
        </button>
      </div>

      {/* Neon glow fone */}
      <div className="absolute bottom-0 left-0 w-52 h-52 bg-gradient-to-tr from-pink-500 to-purple-500 opacity-20 blur-2xl rounded-full z-0"></div>

      {/* Navigacija */}
      <nav className="flex flex-col gap-6 text-lg mt-10 relative z-10 px-4">
        <Link href="/game" className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform">
          <FaGamepad size={22} />
          {!collapsed && <span>Games</span>}
        </Link>
        <Link href="#" className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform">
          <FaScroll size={22} />
          {!collapsed && <span>Rules</span>}
        </Link>
        <Link href="/about" className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform">
          <FaQuestionCircle size={22} />
          {!collapsed && <span>About</span>}
        </Link>
        <Link href="#" className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform">
          <FaLifeRing size={22} />
          {!collapsed && <span>Support</span>}
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform">
          <FaSignOutAlt size={22} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      {/* Vartotojo avataras apačioje */}
      <div className="absolute bottom-4 left-0 w-full flex flex-col items-center z-10">
        <div className="p-1 bg-white rounded-full border-2 border-pink-500 shadow-[0_0_15px_rgba(255,0,255,0.6)] cursor-pointer hover:shadow-[0_0_20px_rgba(255,0,255,0.9)] transition">
          <Image src={avatarURL} alt="User Avatar" width={50} height={50} className="rounded-full" />
        </div>
        {!collapsed && (
          <span className="mt-2 text-pink-300 text-sm font-semibold">{nickname}</span>
        )}
      </div>
    </aside>
  );
}
