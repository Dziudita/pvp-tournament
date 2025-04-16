"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [bets, setBets] = useState(0);
  const [wager, setWager] = useState(0);
  const [dailyWD, setDailyWD] = useState(0);
  const [dailyDeposit, setDailyDeposit] = useState(0);

  useEffect(() => {
    const nick = localStorage.getItem("cherzi-nick") || "User";
    const storedEmail = localStorage.getItem("cherzi-email") || "Not set";
    const storedRole = localStorage.getItem("cherzi-role") || "user";
    const storedBets = Number(localStorage.getItem("cherzi-bets") || 0);
    const storedWager = Number(localStorage.getItem("cherzi-wager") || 0);
    const wd = Number(localStorage.getItem("cherzi-dailyWD") || 0);
    const depo = Number(localStorage.getItem("cherzi-dailyDeposit") || 0);

    setNickname(nick);
    setEmail(storedEmail);
    setRole(storedRole);
    setBets(storedBets);
    setWager(storedWager);
    setDailyWD(wd);
    setDailyDeposit(depo);
  }, []);

  const avatarSrc =
    role === "owner"
      ? "/avatars/owner-avatar-cherry-steampunk.png"
      : "/avatars/default.png";

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <div className="w-12 h-12 relative">
          <Image
            src={avatarSrc}
            alt="Avatar"
            fill
            sizes="48px"
            className="rounded-full border-2 border-pink-500 hover:brightness-110 object-cover"
          />
        </div>
      </button>

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
              <span className="text-pink-400">🎯</span>
              <span className="text-white">Wager: {wager}</span>
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
