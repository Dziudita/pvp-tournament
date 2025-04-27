"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaGlobe, FaCog } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import UserDropdown from "./UserDropdown";

const supabase = createClient(
  "https://innwjrnhjwxlwaimquex.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // <- anon key
);

export default function Topbar({ collapsed }: { collapsed: boolean }) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.000000");
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) setWallet(accounts[0]);
      }
    };

    checkWallet();

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const userAvatar = data?.user?.user_metadata?.avatar;
      if (userAvatar) {
        setAvatarURL(userAvatar);
      }
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

  const disconnectWallet = () => {
    setWallet(null);
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header
      className={`fixed top-0 ${collapsed ? "left-16" : "left-52"} right-0 h-16 bg-zinc-900 bg-opacity-80 border-b border-pink-500 flex items-center justify-between px-6 z-40 transition-all duration-300 shadow-[0_0_10px_rgba(255,0,255,0.5)]`}
    >
      {/* Logo ir CHERZI ARENA */}
      <div className="flex items-center gap-3 text-white text-lg font-bold">
        <Image
          src="/favicon.ico"
          alt="Cherzi Logo"
          width={32}
          height={32}
          className="rounded-md"
        />
        <span>CHERZI ARENA</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 text-white relative">
        {/* Balance */}
        <div className="bg-zinc-800 bg-opacity-70 px-4 py-1 rounded-xl text-sm shadow-inner border border-pink-500 flex items-center gap-2 shadow-[0_0_10px_rgba(255,0,255,0.3)]">
          <span className="text-yellow-400 text-lg">💰</span>
          <span>{balance}</span>
        </div>

        {/* Deposit USDC */}
        {wallet && (
          <button
            onClick={() => alert("Deposit modal")}
            className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:scale-105 transition transform shadow-[0_0_10px_rgba(0,255,0,0.5)] text-sm"
          >
            Deposit USDC
          </button>
        )}

        {/* Wallet */}
        {wallet ? (
          <div className="flex items-center gap-2 text-sm">
            <span>{wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
            <button
              onClick={disconnectWallet}
              className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:scale-105 transition transform shadow-[0_0_10px_rgba(255,0,255,0.5)]"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:scale-105 transition transform shadow-[0_0_10px_rgba(255,0,255,0.5)] text-sm"
          >
            Connect Wallet
          </button>
        )}

        {/* Avatar */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
            <div className="p-1 bg-white rounded-full border-2 border-pink-500 shadow-[0_0_20px_rgba(255,0,255,0.7)] cursor-pointer hover:shadow-[0_0_30px_rgba(255,0,255,0.9)] transition">
              <Image src={avatarURL} alt="User Avatar" width={30} height={30} className="rounded-full" />
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3">
              <UserDropdown />
            </div>
          )}
        </div>

        {/* Language & Settings */}
        <FaGlobe size={20} className="cursor-pointer hover:text-pink-400 hover:drop-shadow-[0_0_5px_rgba(255,0,255,0.7)] transition" />
        <FaCog size={20} className="cursor-pointer hover:text-pink-400 hover:drop-shadow-[0_0_5px_rgba(255,0,255,0.7)] transition" />
      </div>
    </header>
  );
}
