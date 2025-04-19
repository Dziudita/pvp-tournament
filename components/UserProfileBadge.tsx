"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserProfileBadge() {
  const [nickname, setNickname] = useState("User");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const storedNick = localStorage.getItem("cherzi-nick");
    const storedRole = localStorage.getItem("cherzi-role");
    if (storedNick) setNickname(storedNick);
    if (storedRole) setRole(storedRole);
  }, []);

  const avatarSrc =
    role === "owner"
      ? "/avatars/owner-avatar-cherry-steampunk.png"
      : "/avatars/default.png";

  return (
    <div className="flex items-center gap-3">
      <Image
        src={avatarSrc}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full border border-pink-400"
      />
      <span className="text-white font-semibold text-sm">{nickname}</span>
    </div>
  );
}
