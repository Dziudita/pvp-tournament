"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserProfileBadge() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const storedNick = localStorage.getItem("cherzi-nick");
    if (storedNick) setNickname(storedNick);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Image
        src="/avatars/cherzi-owner.png"
        alt="User Avatar"
        width={54}
        height={54}
        className="rounded-full border-2 border-pink-400 shadow-md"
      />
      <div className="flex flex-col">
        <span className="text-pink-300 font-bold text-lg leading-tight">{nickname || "Guest"}</span>
        <span className="text-sm text-zinc-400">Rank #1</span>
      </div>
    </div>
  );
}
