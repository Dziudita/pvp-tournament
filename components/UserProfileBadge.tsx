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
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <Image
          src="/avatars/cherzi-owner.png"
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full border-2 border-pink-400 shadow-md"
        />
        <div className="flex flex-col">
          <span className="text-pink-300 font-bold text-sm">{nickname || "Guest"}</span>
          <span className="text-xs text-zinc-400">Rank #1</span>
        </div>
      </div>
    </div>
  );
}
