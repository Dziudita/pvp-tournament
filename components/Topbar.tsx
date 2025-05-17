"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import UserDropdown from "./UserDropdown";
import WalletModal from "@/components/WalletModal";

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

const games = [
  { name: "Mines", path: "/game/mines" },
  { name: "Coinflip", path: "/game/coinflip" },
  { name: "Cherry Doors", path: "/game/doors" },
  { name: "Token Tower", path: "/game/tower" },
];

export default function Topbar({ collapsed }: { collapsed: boolean }) {
  const router = useRouter();
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.00");
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const refreshBalance = async () => {
    if (!wallet) return;
    const { data, error } = await supabase
      .from("wallet_balances")
      .select("balance")
      .eq("wallet", wallet)
      .single();
    if (error) {
      console.error("❌ Klaida gaunant balansą:", error.message);
      return;
    }
    if (data && typeof data.balance === "number") {
      setBalance(data.balance.toFixed(2));
    }
  };

  useEffect(() => {
    if (!wallet) return;
    const channel = supabase
      .channel("realtime-wallet-balance")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wallet_balances",
          filter: `wallet=eq.${wallet}`,
        },
        (payload: any) => {
          const newBalance = payload.new?.balance;
          if (typeof newBalance === "number") {
            setBalance(newBalance.toFixed(2));
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [wallet]);

  useEffect(() => {
    const checkWallet = async () => {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        }
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
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 ${collapsed ? "left-14" : "left-48"} right-0 h-16 
        bg-black bg-opacity-50 backdrop-blur-md 
        border-b border-zinc-700 flex items-center justify-between px-6 
        z-40 transition-all duration-300`}
      >
        <div className="flex items-center gap-4">
          <Image src="/assets/cherzi-arena-logo.png" alt="Cherzi Arena Logo" width={160} height={40} priority />
          <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold px-3 py-1 rounded-lg shadow-md hover:opacity-90 transition text-sm">
            🎁 Bonus
          </button>
        </div>

        <div className="flex items-center gap-3 text-white relative">
          {/* 🔍 Search */}
          <div className="relative">
         <input
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      const match = games.find((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (match) {
        setSearchQuery("");
        setShowDropdown(false);
        router.push(match.path);
      }
    }
  }}
  className="bg-zinc-800 text-white text-xs px-2 py-1 rounded-md outline-none placeholder-pink-300 border border-pink-500 shadow-inner w-32"
/>


            {showDropdown && searchQuery && (
              <ul className="absolute z-50 mt-1 bg-black bg-opacity-80 backdrop-blur-md border border-pink-500 rounded-md text-sm w-48 shadow-lg">
                {games.filter(game => game.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                  games
                    .filter(game => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((game) => (
                      <li
                        key={game.name}
                        onClick={() => {
                          setSearchQuery("");
                          setShowDropdown(false);
                          router.push(game.path);
                        }}
                        className="px-3 py-1 hover:bg-pink-500 hover:text-white cursor-pointer"
                      >
                        🎮 {game.name}
                      </li>
                    ))
                ) : (
                  <li className="px-3 py-1 text-pink-300">No games found</li>
                )}
              </ul>
            )}
          </div>

          <div className="bg-zinc-800 px-4 py-1 rounded-lg text-white text-sm shadow-inner">
            <span>${balance}</span>
          </div>

          <button
            onClick={() => (wallet ? setIsWalletModalOpen(true) : connectWallet())}
            className="bg-red-600 px-4 py-1 rounded-lg text-white text-sm shadow-md hover:opacity-80 transition"
          >
            Wallet
          </button>

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

      {isWalletModalOpen && (
        <WalletModal onClose={() => setIsWalletModalOpen(false)} refreshBalance={refreshBalance} />
      )}

      {isAvatarModalOpen && <AvatarModal />}
    </>
  );
}
