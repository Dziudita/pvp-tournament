"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import UserDropdown from "./UserDropdown";

const supabase = createClient(
  "https://innwjrnhjwxlwaimquex.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // <- anon key
);

export default function Topbar({ collapsed }: { collapsed: boolean }) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.00");
  const [avatarURL, setAvatarURL] = useState("/avatars/default.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
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

  // Wallet Modal komponentas
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
      <header
        className="fixed top-0 left-0 right-0 w-full h-16 bg-zinc-900 bg-opacity-90 border-b border-zinc-700 flex items-center justify-between px-6 z-40 transition-all duration-300"
      >
        {/* Logo */} 
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
       <div className="flex items-center">
  <Image
    src="/assets/cherzi-arena-logo.png" // <- tavo naujas logotipas
    alt="Cherzi Arena Logo"
    width={160} // gali keisti dydį jei reikia
    height={40}
    priority
  />
</div>


          {/* Wallet Mygtukas */}
          <button
            onClick={() => {
              if (wallet) {
                setIsWalletModalOpen(true);
              } else {
                connectWallet();
              }
            }}
            className="bg-red-600 px-4 py-1 rounded-lg text-white text-sm shadow-md hover:opacity-80 transition"
          >
            Wallet
          </button>

          {/* Avatar su status */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
              <div className="p-[2px] bg-zinc-800 rounded-full border-2 border-green-500">
                <Image src={avatarURL} alt="User Avatar" width={36} height={36} className="rounded-full" />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3">
                <UserDropdown />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modalas */}
      {isWalletModalOpen && <WalletModal />}
    </>
  );
}
