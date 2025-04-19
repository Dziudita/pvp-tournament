"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const rankThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];

function calculateRank(xp: number) {
  for (let i = rankThresholds.length - 1; i >= 0; i--) {
    if (xp >= rankThresholds[i]) {
      const current = rankThresholds[i];
      const next = rankThresholds[i + 1] || current + 1;
      const progress = next === current ? 100 : ((xp - current) / (next - current)) * 100;
      return { rank: i, progress: parseFloat(progress.toFixed(2)) };
    }
  }
  return { rank: 0, progress: 0 };
}

export default function UserProfileBadge() {
  const [nickname, setNickname] = useState("User");
  const [role, setRole] = useState("user");
  const [xp, setXP] = useState(0);

  useEffect(() => {
    const storedNick = localStorage.getItem("cherzi-nick");
    const storedRole = localStorage.getItem("cherzi-role");
    const storedXP = Number(localStorage.getItem("cherzi-xp") || 0);

    if (storedNick) setNickname(storedNick);
    if (storedRole) setRole(storedRole);
    setXP(storedXP);
  }, []);

  const { rank, progress } = calculateRank(xp);

  const avatarSrc =
    role === "owner"
      ? "/avatars/owner-avatar-cherry-steampunk.png"
      : "/avatars/default.png";

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
          src={avatarSrc}
          alt="User Avatar"
          width={40}
          height={40}
          unoptimized
          className="rounded-full border border-pink-400"
        />
        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
          {rank}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-white font-semibold">{nickname}</span>
        <div className="w-24 h-2 bg-zinc-700 rounded-full mt-1">
          <div
            className="h-2 bg-green-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
