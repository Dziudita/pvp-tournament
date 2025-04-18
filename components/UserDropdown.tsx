"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaKey, FaCoins } from "react-icons/fa";

const rankThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];

function calculateRank(xp: number) {
  for (let i = rankThresholds.length - 1; i >= 0; i--) {
    if (xp >= rankThresholds[i]) {
      const current = rankThresholds[i];
      const next = rankThresholds[i + 1] || current + 1;
      const progress = next === current ? 100 : ((xp - current) / (next - current)) * 100;
      return { rank: i, progress: parseFloat(progress.toFixed(2)) };
    }
  }
  return { rank: 0, progress: 0 };
}

export default function UserDropdown() {
  const [nickname, setNickname] = useState("User");
  const [email, setEmail] = useState("Not set");
  const [role, setRole] = useState("user");
  const [bets, setBets] = useState(0);
  const [wager, setWager] = useState(0);
  const [dailyWD, setDailyWD] = useState(0);
  const [dailyDeposit, setDailyDeposit] = useState(0);
  const [xp, setXP] = useState(0);

  useEffect(() => {
    setNickname(localStorage.getItem("cherzi-nick") || "User");
    setEmail(localStorage.getItem("cherzi-email") || "Not set");
    setRole(localStorage.getItem("cherzi-role") || "user");
    setBets(Number(localStorage.getItem("cherzi-bets") || 0));
    setWager(Number(localStorage.getItem("cherzi-wager") || 0));
    setDailyWD(Number(localStorage.getItem("cherzi-dailyWD") || 0));
    setDailyDeposit(Number(localStorage.getItem("cherzi-dailyDeposit") || 0));
    setXP(Number(localStorage.getItem("cherzi-xp") || 0));
  }, []);

  const { rank, progress } = calculateRank(xp);

  return (
    <div className="bg-zinc-900 border border-pink-500 rounded-xl p-4 w-64 shadow-2xl z-50">
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
  );
}
