"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import UserDropdown from "./UserDropdown";

const supabase = createClient(
  "https://innwjrnhjwxlwaimquex.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // <- anon key
);

const avatars = [
  { src: "/avatars/0rankangry.png", name: "angry" },
  { src: "/avatars/0rankhappy.png", name: "happy" },
  { src: "/avatars/0ranksad.png", name: "sad" },
  { src: "/avatars/0rankcrazy.png", name: "crazy" },
];

export default function Topbar({ collapsed }: { collapsed: boolean }) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.00");
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkWallet = async () => {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) setWallet(accounts[0]);
      }
    };
    checkWallet();

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const userAvatar = data?.user?.user_metadata?.avatar || localStorage.getItem("cherzi-avatar");
      if (userAvatar) setAvatarURL(userAvatar);
    };
    getUser();
  }, []);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
    } else {
      alert("MetaMask not detected!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleSelectAvatar = async (avatarPath: string) => {
    setAvatarURL(avatarPath);
    localStorage.setItem("cherzi-avatar", avatarPath);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (userId) {
      await supabase.from("users").update({ avatar: avatarPath }).eq("id", userId);
    }
    setIsAvatarModalOpen(false);
  };

  const AvatarModal = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-gradient-to-br from-black via-blue-950 to-black p-6 rounded-lg shadow-[0_0_30px_rgba(0,0,150,0.5)] text-white">
      <h2 className="text-xl font-bold mb-4">Choose Your Avatar</h2>
      <div className="grid grid-cols-2 gap-4">
        {avatars.map((avatar) => (
          <div
            key={avatar.name}
            className="p-1 border-2 border-pink-500 rounded-full cursor-pointer hover:scale-105 transition bg-black bg-opacity-80 shadow-[0_0_10px_rgba(0,0,255,0.4)]"
            onClick={() => handleSelectAvatar(avatar.src)}
          >
            <Image src={avatar.src} alt={avatar.name} width={80} height={80} className="rounded-full" />
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsAvatarModalOpen(false)}
        className="w-full mt-4 text-pink-400 hover:text-pink-300 text-sm"
      >
        Close
      </button>
    </div>
  </div> // Šitas uždaro tik vieną, kaip reikia.
);


  const WalletModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg text-white w-80">
        <h2 className="text-lg font-bold mb-4">Wallet Options</h2>
        <button
          onClick={() => {
            setIsWalletModalOpen(false);
            alert("Deposit modal");
          }}
          className="w-full bg-green-600 py-2 rounded mb-2 hover:bg-green-500 transition"
        >
          Deposit
        </button>
        <button
          onClick={() => {
            setIsWalletModalOpen(false);
            alert("Withdraw modal");
          }}
          className="w-full bg-yellow-500 py-2 rounded hover:bg-yellow-400 transition"
        >
          Withdraw
        </button>
        <button
          onClick={() => setIsWalletModalOpen(false)}
          className="w-full mt-4 text-sm text-pink-400 hover:text-pink-300"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full h-16 bg-zinc-900 bg-opacity-90 border-b border-zinc-700 flex items-center justify-between px-6 z-40 transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/assets/cherzi-arena-logo.png" alt="Cherzi Arena Logo" width={160} height={40} priority />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-white relative">
          {/* Balance */}
          <div className="bg-zinc-800 px-4 py-1 rounded-lg text-white text-sm shadow-inner">
            <span>${balance}</span>
          </div>

          {/* Wallet Button */}
          <button
            onClick={() => (wallet ? setIsWalletModalOpen(true) : connectWallet())}
            className="bg-red-600 px-4 py-1 rounded-lg text-white text-sm shadow-md hover:opacity-80 transition"
          >
            Wallet
          </button>

          {/* Avatar */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
              <div className="p-[2px] bg-black bg-opacity-80 rounded-full border-2 border-pink-500 shadow-[0_0_10px_rgba(255,0,255,0.7)]">
  <Image src={avatarURL} alt="User Avatar" width={36} height={36} className="rounded-full" />
</div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3">
                <UserDropdown />
                <button
                  onClick={() => {
                    setIsAvatarModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="mt-2 w-full bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-400 text-sm"
                >
                  Change Avatar
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {isWalletModalOpen && <WalletModal />}
      {isAvatarModalOpen && <AvatarModal />}
    </>
  );
}
