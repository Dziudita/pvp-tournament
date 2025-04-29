"use client";
import { useState } from "react";
import { depositUSDC } from "@/lib/usdc";

export default function DepositButton({
  userId,
  onSuccess,
}: {
  userId: string;
  onSuccess?: () => void; // <- callback prop
}) {
  const [amount, setAmount] = useState(1); // default: 1 USDC
  const [loading, setLoading] = useState(false);

  console.log("🚀 DepositButton RODOMAS su userId:", userId);

 const handleDeposit = async () => {
  try {
    setLoading(true);
    const txHash = await depositUSDC(amount, userId);
    alert(`✅ Deposit sėkmingas! Tx hash: ${txHash}`);
    onSuccess?.(); // <- SAUGU!
  } catch (err) {
    alert("🛑 Klaida atliekant depozitą");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="text-white">
      <input
        type="number"
        value={amount}
        min={1}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="text-black p-1 rounded mr-2"
      />
      <button
        onClick={handleDeposit}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Deposit USDC"}
      </button>
    </div>
  );
}
