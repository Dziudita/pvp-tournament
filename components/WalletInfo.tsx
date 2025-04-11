"use client";

export default function WalletInfo() {
  return (
    <div className="bg-zinc-900/70 p-4 rounded-xl shadow-md text-white w-60">
      <div className="text-sm text-zinc-400 mb-1">Balance:</div>
      <div className="text-2xl font-bold text-yellow-400">12.50 USDC</div>
      <div className="mt-3 text-sm text-zinc-300">Logged in as:</div>
      <div className="text-pink-400 font-semibold">CherryBoss</div>
    </div>
  );
}
