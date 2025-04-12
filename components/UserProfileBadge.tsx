"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserProfileBadge() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const nick = localStorage.getItem("cherzi-nick");
    if (nick) setNickname(nick);
  }, []);

  if (!nickname) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-black/70 border border-pink-500 rounded-xl shadow-lg">
      <Image
        src="/avatars/cherry-girl.png" // tavo merginos avataro kelias
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-full border border-pink-500"
      />
      <div className="text-left leading-tight">
        <p className="text-white font-semibold">{nickname}</p>
        <p className="text-sm text-yellow-400">Rank #1</p>
      </div>
    </div>
  );
}
