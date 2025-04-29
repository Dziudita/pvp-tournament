"use client";
import { useState } from "react";
import DepositButton from "@/components/DepositButton";
import useUser from "@/hooks/useUser";

export default function WalletModal({
  onClose,
  refreshBalance,
}: {
  onClose: () => void;
  refreshBalance: () => void;
}) {
  const [showDeposit, setShowDeposit] = useState(false);
  const { user, loading } = useUser();

  if (loading) return null;
  if (!user) return <p className="text-white p-4">Please log in</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl text-white w-[320px] text-center shadow-lg">
        <h2 className="text-xl font-bold mb-4">Wallet Options</h2>

        {!showDeposit ? (
          <>
            <button
              onClick={() => setShowDeposit(true)}
              className="bg-green-600 w-full py-2 rounded mb-3 font-semibold hover:bg-green-500"
            >
              Deposit
            </button>

            <button
              disabled
              className="bg-yellow-500 w-full py-2 rounded font-semibold opacity-50 cursor-not-allowed"
            >
              Withdraw (soon)
            </button>

            <button
              onClick={onClose}
              className="text-pink-400 mt-4 hover:underline"
            >
              Close
            </button>
          </>
        ) : (
          <>
           <DepositButton userId={user.id} onSuccess={refreshBalance} />
            <button
              onClick={() => setShowDeposit(false)}
              className="text-pink-400 mt-4 hover:underline"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
