"use client";

import { FaCoins } from "react-icons/fa";

export default function WalletInfo() {
  const balance = 12.5; // Vėliau bus dinamiškas

  return (
    <div
      className="
        flex items-center gap-2 px-4 py-2
        bg-black/80 rounded-xl border border-pink-500
        text-yellow-300 font-extrabold text-lg shadow-lg
        ml-auto mr-6 mt-4 w-fit
      "
    >
      <FaCoins className="text-yellow-400 text-xl" />
      <span>{balance.toFixed(2)} USDC</span>
    </div>
  );
}
