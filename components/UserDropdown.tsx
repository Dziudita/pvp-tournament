"use client";

import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaKey, FaCoins } from "react-icons/fa";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [bets, setBets] = useState(0);
  const [dailyWD, setDailyWD] = useState(0);
  const [dailyDeposit, setDailyDeposit] = useState(0);

  useEffect(() => {
    const nick = localStorage.getItem("cherzi-nick") || "User";
    const storedEmail = localStorage.getItem("cherzi-email") || "Not set";
    const storedBets = Number(localStorage.getItem("cherzi-bets") || 0);
    const wd = Number(localStorage.getItem("cherzi-dailyWD") || 0);
    const depo = Number(localStorage.getItem("cherzi-dailyDeposit") || 0);
    setNickname(nick);
    setEmail(storedEmail);
    setBets(storedBets);
    setDailyWD(wd);
    setDailyDeposit(depo);
  }, []);

  return (
    <div className="relative">
      {/* Avataras, kuris atidaro dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none"
      >
        <img
          src="/avatars/cherzi-owner.png"
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-pink-500 hover:brightness-110"
        />
      </button>

      {/* Dropdown turinys */}
      {isOpen && (
        <div className="absolute top-14 left-0 bg-zinc-900 border border-pink-500 rounded-xl p-4 w-64 shadow-2xl z-50">
          <h3 className="text-xl text-pink-400 font-bold mb-4">👤 {nickname}</h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-pink-300" />
              <span className="text-white">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaKey className="text-pink-300" />
              <span className="text-white">Change Password</span>
            </div>
            <div className="border-t border-pink-500 my-3"></div>
            <div className="flex items-center gap-2">
              <FaCoins className="text-yellow-400" />
              <span className="text-white">Total Bets: {bets}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-300">💸</span>
              <span className="text-white">Daily WD: {dailyWD}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">💰</span>
              <span className="text-white">Daily Deposit: {dailyDeposit}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
