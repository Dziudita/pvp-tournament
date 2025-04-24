"use client";

import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [nickname, setNickname] = useState("Cherry");
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("nickname");
    if (stored) setNickname(stored);

    const checkWallet = async () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) setWallet(accounts[0]);
      }
    };

    checkWallet();
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

  return (
    <header className="fixed top-0 left-56 right-0 h-16 bg-zinc-900 border-b border-pink-500 flex items-center justify-between px-6 z-30">
      <div className="text-white text-lg font-bold">
        🍒 Welcome back, {nickname}!
      </div>
      <div className="flex items-center gap-3">
        {wallet ? (
          <div className="flex items-center gap-2 text-white text-sm">
            <span>{wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
            <button
              onClick={disconnectWallet}
              className="px-3 py-1 bg-pink-600 rounded-lg hover:bg-pink-500"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="px-3 py-1 bg-pink-600 text-white rounded-lg hover:bg-pink-500 text-sm"
          >
            Connect Wallet
          </button>
        )}
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-lg bg-zinc-800 text-white outline-none text-sm"
        />
      </div>
    </header>
  );
}
