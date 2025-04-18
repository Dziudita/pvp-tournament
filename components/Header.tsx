"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUserCircle, FaGlobe, FaCog } from "react-icons/fa";

export default function Header() {
  const [balance] = useState("0.00810214");

  return (
    <header className="w-full px-6 py-3 bg-black bg-opacity-80 border-b border-pink-600 flex justify-between items-center z-50 shadow-md">
      {/* Logo + Pavadinimas */}
      <div className="flex items-center gap-2">
        <Image
          src="/favicon.ico"
          alt="Cherry Logo"
          width={28}
          height={28}
        />
        <span className="text-pink-500 text-xl font-bold tracking-widest">
          Cherry Arena
        </span>
      </div>

      {/* Dešinė pusė */}
      <div className="flex items-center gap-6 text-white">
        {/* Balansas */}
        <div className="bg-zinc-800 px-4 py-1 rounded-xl text-sm shadow-inner border border-pink-500 flex items-center gap-2">
          <span className="text-yellow-400 text-lg">💰</span>
          <span>{balance} CHERZ</span>
        </div>

        {/* Avataras */}
        <div className="cursor-pointer hover:text-pink-400 transition">
          <FaUserCircle size={24} />
        </div>

        {/* Kalbos pasirinkimas */}
        <div className="cursor-pointer hover:text-pink-400 transition">
          <FaGlobe size={20} />
        </div>

        {/* Nustatymai */}
        <div className="cursor-pointer hover:text-pink-400 transition">
          <FaCog size={20} />
        </div>
      </div>
    </header>
  );
}
