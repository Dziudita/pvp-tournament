"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEnvelope, FaKey, FaCoins } from "react-icons/fa";

const rankThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];

function calculateRank(xp: number) {
  for (let i = rankThresholds.length - 1; i >= 0; i--) {
    if (xp >= rankThresholds[i]) {
      const current = rankThresholds[i];
      const next = rankThresholds[i + 1] || current + 1;
      const progress = next === current ? 100 : ((xp - current) / (next - current)) * 100;
      return { rank: i, progress: progress.toFixed(2) };
    }
  }
  return { rank: 0, progress: "0.00" };
}

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [bets, setBets] = useState(0);
  const [wager, setWager] = useState(0);
  const [dailyWD, setDailyWD] = useState(0);
  const [dailyDeposit, setDailyDeposit] = useState(0);
  const [xp, setXP] = useState(0);

  useEffect(() => {
    const nick = localStorage.getItem("cherzi-nick") || "User";
    const storedEmail = localStorage.getItem("cherzi-email") || "Not set";
    const storedRole = localStorage.getItem("cherzi-role") || "user";
    const storedBets = Number(localStorage.getItem("cherzi-bets") || 0);
    const storedWager = Number(localStorage.getItem("cherzi-wager") || 0);
    const wd = Number(localStorage.getItem("cherzi-dailyWD") || 0);
    const depo = Number(localStorage.getItem("cherzi-dailyDeposit") || 0);
    const storedXP = Number(localStorage.getItem("cherzi-xp") || 0);

    setNickname(nick);
    setEmail(storedEmail);
    setRole(storedRole);
    setBets(storedBets);
    setWager(storedWager);
    setDailyWD(wd);
    setDailyDeposit(depo);
    setXP(storedXP);
  }, []);

  const { rank, progress } = calculateRank(xp);

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
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold">{rank} Rank</span>
            <h3 className="text-lg text-white font-bold truncate">👤 {nickname}</h3>
          </div>

          <div className="mb-4">
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right text-xs text-white mt-1">{progress}%</p>
          </div>

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
