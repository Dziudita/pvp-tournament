"use client";

import { FaChessKnight } from "react-icons/fa";

export default function TopPlayerOfDay() {
  return (
    <div className="mt-10 ml-10 px-6 py-4 bg-black/50 border border-pink-500 rounded-xl w-[300px] shadow-lg">
      <h2 className="text-pink-400 font-extrabold text-lg flex items-center gap-2 mb-4 drop-shadow-[0_0_10px_#ff4dd6]">
        <FaChessKnight className="text-yellow-400" /> Top Players Today
      </h2>

      <ul className="space-y-2">
        <li className="flex justify-between items-center bg-zinc-900 px-4 py-2 rounded-lg text-white">
          <span className="flex items-center gap-2">
            🥇 <span className="font-bold">CherryBoss</span>
          </span>
          <span className="text-pink-400 font-semibold">22 wins</span>
        </li>
        <li className="flex justify-between items-center bg-zinc-900 px-4 py-2 rounded-lg text-white">
          <span className="flex items-center gap-2">
            🥈 <span className="font-bold">DarkPit</span>
          </span>
          <span className="text-pink-400 font-semibold">18 wins</span>
        </li>
        <li className="flex justify-between items-center bg-zinc-900 px-4 py-2 rounded-lg text-white">
          <span className="flex items-center gap-2">
            🥉 <span className="font-bold">SweetSlap</span>
          </span>
          <span className="text-pink-400 font-semibold">16 wins</span>
        </li>
      </ul>
    </div>
  );
}
