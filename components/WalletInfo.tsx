"use client";

export default function WalletInfo() {
  const balance = 12.5; // Pakeisk tikru balansu, jei integruota su pinigine

  return (
    <div className="bg-black/70 px-4 py-2 rounded-xl shadow-lg border border-pink-500 text-right text-yellow-300 font-extrabold text-lg w-fit ml-auto mr-6 mt-4">
      {balance.toFixed(2)} USDC
    </div>
  );
}
