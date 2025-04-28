"use client";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const avatars = [
  { src: "/avatars/0rankangry.png", name: "angry", unlockRank: 0 },
  { src: "/avatars/0rankhappy.png", name: "happy", unlockRank: 0 },
  { src: "/avatars/0ranksad.png", name: "sad", unlockRank: 0 },
  { src: "/avatars/0rankcrazy.png", name: "crazy", unlockRank: 0 },
  { src: "/avatars/1rankangry.png", name: "angry", unlockRank: 1 },
  { src: "/avatars/1rankhappy.png", name: "happy", unlockRank: 1 },
  { src: "/avatars/1ranksad.png", name: "sad", unlockRank: 1 },
  { src: "/avatars/1rankcrazy.png", name: "crazy", unlockRank: 1 },
];

export default function AvatarModal({ setAvatarURL, closeModal }: any) {
  const [userRank, setUserRank] = useState(0);

  // Gauti vartotojo ranką iš Supabase
  useEffect(() => {
    const fetchRank = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (userId) {
        const { data, error } = await supabase
          .from("users")
          .select("rank")
          .eq("id", userId)
          .single();
        if (data?.rank !== undefined) {
          setUserRank(data.rank);
        }
      }
    };
    fetchRank();
  }, []);

  const handleSelect = async (avatarPath: string, unlockRank: number) => {
    if (userRank < unlockRank) {
      alert(`You need to reach Rank ${unlockRank} to unlock this avatar!`);
      return;
    }

    setAvatarURL(avatarPath);
    localStorage.setItem("cherzi-avatar", avatarPath);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (userId) {
      await supabase.from("users").update({ avatar: avatarPath }).eq("id", userId);
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-bold mb-4">Choose Your Avatar</h2>
        <div className="grid grid-cols-2 gap-4">
          {avatars.map((avatar, index) => {
            const isLocked = userRank < avatar.unlockRank;
            return (
              <div
                key={index}
                className={`p-1 border-2 ${
                  isLocked
                    ? "border-gray-500 opacity-50 cursor-not-allowed"
                    : "border-pink-500 cursor-pointer hover:scale-105 transition"
                } rounded-full`}
                onClick={() => !isLocked && handleSelect(avatar.src, avatar.unlockRank)}
              >
                <Image src={avatar.src} alt={avatar.name} width={80} height={80} className="rounded-full" />
                {isLocked && <p className="text-xs text-center mt-1 text-gray-400">Rank {avatar.unlockRank}</p>}
              </div>
            );
          })}
        </div>
        <button
          onClick={closeModal}
          className="w-full mt-4 text-pink-400 hover:text-pink-300 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
