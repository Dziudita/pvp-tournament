"use client";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

const avatars = [
  { src: "/avatars/0rankangry.png", name: "angry" },
  { src: "/avatars/0rankhappy.png", name: "happy" },
  { src: "/avatars/0ranksad.png", name: "sad" },
  { src: "/avatars/0rankcrazy.png", name: "crazy" },
];

export default function AvatarModal({ setAvatarURL, closeModal }: any) {
  const handleSelect = async (avatarName: string) => {
    const avatarPath = `/avatars/0rank${avatarName}.png`;
    setAvatarURL(avatarPath); // Atnaujina viršuje
    localStorage.setItem("cherzi-avatar", avatarPath); // Išsaugo vietiškai

    // Jei nori ir DB:
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (userId) {
      await supabase.from("users").update({ avatar: avatarPath }).eq("id", userId);
    }

    closeModal(); // Uždaro modalą
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-bold mb-4">Choose Your Avatar</h2>
        <div className="grid grid-cols-2 gap-4">
          {avatars.map((avatar) => (
            <div
              key={avatar.name}
              className="p-1 border-2 border-pink-500 rounded-full cursor-pointer hover:scale-105 transition"
              onClick={() => handleSelect(avatar.name)}
            >
              <Image src={avatar.src} alt={avatar.name} width={80} height={80} className="rounded-full" />
            </div>
          ))}
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
