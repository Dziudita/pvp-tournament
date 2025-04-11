"use client";

import { SiCircle } from "react-icons/si";

export default function WalletInfo() {
  const balance = 12.5; // Galima padaryti dinamišką vėliau

  return (
    <div className="ml-auto mt-4 mr-6 w-fit px-4 py-2 flex items-center gap-2 bg-black/80 border border-pink-500 rounded-xl shadow-lg text-yellow-300 font-bold text-lg">
      <SiCircle className="text-yellow-400 text-xl" />
      <span>{balance.toFixed(2)} USDC</span>
    </div>
  );
}
