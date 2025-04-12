"use client";

import UserDropdown from "./UserDropdown";
import UserProfileBadge from "./UserProfileBadge";
import Link from "next/link";
import Image from "next/image";
import {
  FaGamepad,
  FaScroll,
  FaQuestionCircle,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("cherzi-nick");
    localStorage.removeItem("cherzi-pass");
    location.reload();
  };

  return (
    <aside className="bg-zinc-900 text-white w-64 min-h-screen p-6 border-r border-pink-500 flex flex-col justify-between shadow-xl">
      <div>
        {/* Logo + Title */}
       <div className="flex items-center gap-4 mb-10">

 <div className="mb-10">
  <UserDropdown />
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 text-pink-100 hover:text-pink-400"
          >
            <FaSignOutAlt size={24} /> Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}
