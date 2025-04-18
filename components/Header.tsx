"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGlobe, FaCog } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// Supabase init (jei dar neturi atskiro client.js)
const supabase = createClient(
  "https://innwjrnhjwxlwaimquex.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

export default function Header() {
  const [balance] = useState("0.00810214");
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const userAvatar = data?.user?.user_metadata?.avatar;

      if (userAvatar) {
        setAvatarURL(userAvatar);
      } else {
        setAvatarURL("/avatars/default.png"); // fallback jei nėra avataro
      }
    };

    getUser();
  }, []);

  return (
    <header className="w-full px-6 py-3 bg-black bg-opacity-80 border-b border-pink-600 flex justify-between items-center z-50 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/favicon.ico" alt="Logo" width={28} height={28} />
        <span className="text-pink-500 text-xl font-bold tracking-widest">
          Cherry Arena
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6 text-white">
        {/* Balansas */}
        <div className="bg-zinc-800 px-4 py-1 rounded-xl text-sm shadow-inner border border-pink-500 flex items-center gap-2">
          <span className="text-yellow-400 text-lg">💰</span>
          <span>{balance} CHERZ</span>
        </div>

        {/* Avataras (su fallback į /avatars/default.png) */}
        <Image
          src={avatarURL}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full border border-pink-500 cursor-pointer hover:opacity-80 transition"
        />

        <div className="cursor-pointer hover:text-pink-400 transition">
          <FaGlobe size={20} />
        </div>
        <div className="cursor-pointer hover:text-pink-400 transition">
          <FaCog size={20} />
        </div>
      </div>
    </header>
  );
}
