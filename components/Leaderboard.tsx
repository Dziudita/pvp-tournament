"use client";

import React from "react";

const topPlayers = [
  {
    name: "CherryBoss",
    wins: 22,
    emoji: "\ud83e\udd47", // 🥇
  },
  {
    name: "DarkPit",
    wins: 18,
    emoji: "\ud83e\udd48", // 🥈
  },
  {
    name: "SweetSlap",
    wins: 16,
    emoji: "\ud83e\udd49", // 🥉
  },
];

export default function Leaderboard() {
  return (
    <div className="absolute right-4 top-[120px] bg-zinc-900/70 border border-pink-500 rounded-2xl p-4 w-64 z-30 shadow-xl">
      <h2 className="text-pink-400 font-bold text-xl mb-4 text-center drop-shadow-[0_0_8px_#ff4dd6]">
        \ud83c\udfc6 Top Players Today
      </h2>
      <ul className="space-y-2">
        {topPlayers.map((player, index) => (
          <li
            key={index}
            className="bg-black/40 rounded-lg p-3 flex justify-between items-center hover:bg-zinc-800 transition"
          >
            <span className="text-white font-medium text-sm">
              {player.emoji} {player.name}
            </span>
            <span className="text-pink-300 font-bold text-sm">
              {player.wins} wins
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
