"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export default function ConnectWalletButton() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  return (
    <button
      onClick={() => open()}
      className="px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-500 transition"
    >
      {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
    </button>
  );
}
