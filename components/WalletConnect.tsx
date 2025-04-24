'use client';

import { useState } from 'react';

export default function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("🛑 MetaMask Error:", err);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className="text-white">
      {walletAddress ? (
        <p className="text-green-400 text-sm">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-pink-600 px-4 py-2 rounded-lg font-bold hover:bg-pink-500 transition"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
