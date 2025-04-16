"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";  // Naudojame ikoną, kad atidaryti ir uždaryti šoninę juostą

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);  // Keičiame šoninės juostos būseną
  };

  return (
    <div>
      {/* Toggle mygtukas */}
      <button
        onClick={toggleSidebar}
        className="absolute top-5 left-5 text-white text-2xl z-50"
      >
        <FaBars />
      </button>

      {/* Šoninė juosta su animacija */}
      <aside
        className={`bg-zinc-900 text-white w-64 min-h-screen p-6 border-r border-pink-500 flex flex-col justify-between shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Naudotojo profilis ir nuorodos */}
          <div className="mb-10">
            <UserProfileBadge />
          </div>

          <nav className="flex flex-col gap-6 text-xl">
            <Link href="/game" className="flex items-center gap-4 text-pink-100 hover:text-pink-400">
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
    </div>
  );
}
