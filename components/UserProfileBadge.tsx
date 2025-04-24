"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"; // <- Pridedam Supabase

export default function UserProfileBadge() {
  const [nickname, setNickname] = useState("User");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (userId) {
        const { data, error } = await supabase
          .from("users")
          .select("nickname, role")
          .eq("id", userId)
          .single();

        if (data) {
          setNickname(data.nickname || localStorage.getItem("cherzi-nick") || "User");
          setRole(data.role || localStorage.getItem("cherzi-role") || "user");
        } else {
          // fallback jei nerandam DB duomenų
          setNickname(localStorage.getItem("cherzi-nick") || "User");
          setRole(localStorage.getItem("cherzi-role") || "user");
        }
      } else {
        // fallback jei nėra user
        setNickname(localStorage.getItem("cherzi-nick") || "User");
        setRole(localStorage.getItem("cherzi-role") || "user");
      }
    };

    fetchUserProfile();
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
