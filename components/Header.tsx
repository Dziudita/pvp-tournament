"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGlobe, FaCog } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import UserDropdown from "./UserDropdown"; // <- Įsitikink, kad kelias teisingas

// Supabase inicijavimas
const supabase = createClient(
  "https://innwjrnhjwxlwaimquex.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // <- sutrumpinta čia
);

export default function Header() {
  const [balance] = useState("0.00810214");
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const userAvatar = data?.user?.user_metadata?.avatar;
      if (userAvatar) {
        setAvatarURL(userAvatar);
      }
    };

    getUser();
  }, []);

  return (
    <header className="w-full px-6 py-3 bg-black bg-opacity-80 border-b border-pink-600 flex justify-between items-center z-50 shadow-md relative">
      {/* Logo ir pavadinimas */}
      <div className="flex items-center gap-2">
        <Image src="/favicon.ico" alt="Logo" width={28} height={28} />
        <span className="text-pink-500 text-xl font-bold tracking-widest">
          Cherry Arena
        </span>
      </div>

      {/* Dešinė pusė */}
      <div className="flex items-center gap-4 text-white relative">
        {/* Balansas */}
        <div className="bg-zinc-800 px-4 py-1 rounded-xl text-sm shadow-inner border border-pink-500 flex items-center gap-2">
          <span className="text-yellow-400 text-lg">💰</span>
          <span>{balance} CHERZ</span>
        </div>

        {/* Wallet mygtukas */}
        <button className="bg-pink-600 hover:bg-pink-500 transition px-4 py-1 rounded-xl text-sm font-bold text-white border border-pink-400 shadow-sm">
          💼 Wallet
        </button>

        {/* Avataras su dropdown valdymu */}
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
            <Image
              src={avatarURL}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full border border-pink-500 cursor-pointer hover:opacity-80 transition"
            />
          </button>

          {/* Dropdown tik jei aktyvuotas */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3">
              <UserDropdown />
            </div>
          )}
        </div>

        {/* Kalba */}
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
