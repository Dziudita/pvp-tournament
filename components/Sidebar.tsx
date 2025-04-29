"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaGamepad,
  FaScroll,
  FaQuestionCircle,
  FaLifeRing,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaWallet,
} from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import WalletModal from "@/components/WalletModal";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("❌ Atsijungimo klaida:", error.message);
    } else {
      localStorage.removeItem("cherzi-nick");
      localStorage.removeItem("cherzi-pass");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <>
      <aside
        className={`fixed top-16 left-0 ${collapsed ? "w-14" : "w-40"} h-[calc(100vh-4rem)] bg-zinc-900 bg-opacity-90 border-r border-pink-500 text-white shadow-xl z-40 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(255,0,255,0.3)]`}
      >
        <div className="flex justify-end p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-pink-400 hover:text-pink-300"
          >
            {collapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-52 h-52 bg-gradient-to-tr from-pink-500 to-purple-500 opacity-20 blur-2xl rounded-full z-0"></div>

        <nav className="flex flex-col gap-5 text-md mt-8 relative z-10 px-3">
          <Link
            href="/game"
            className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform"
          >
            <FaGamepad size={22} />
            {!collapsed && <span>Games</span>}
          </Link>

          <Link
            href="/rules"
            className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform"
          >
            <FaScroll size={22} />
            {!collapsed && <span>Rules</span>}
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform"
          >
            <FaQuestionCircle size={22} />
            {!collapsed && <span>About</span>}
          </Link>

          <Link
            href="#"
            className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform"
          >
            <FaLifeRing size={22} />
            {!collapsed && <span>Support</span>}
          </Link>

          <button
            onClick={() => setShowWalletModal(true)}
            className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform"
          >
            <FaWallet size={22} />
            {!collapsed && <span>Wallet</span>}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 text-pink-100 hover:text-pink-400 hover:scale-105 transition transform"
          >
            <FaSignOutAlt size={22} />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {showWalletModal && (
        <WalletModal
          onClose={() => setShowWalletModal(false)}
          refreshBalance={() => {}} // galima perdaryti jei nori iš Sidebar
        />
      )}
    </>
  );
}
