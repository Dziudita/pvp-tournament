import { ethers } from "ethers";
import { supabase } from "@/lib/supabaseClient";

const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // USDC on Polygon
const vaultAddress = "0xDc9369F48da3aE86aF5c3A0234a1705f408f88f3"; // tavo wallet

const usdcAbi = [
  "function transfer(address to, uint256 amount) public returns (bool)"
];

export async function depositUSDC(amount: number, userId: string) {
  try {
    if (!window.ethereum) throw new Error("MetaMask not found");

    if (amount < 0.1) throw new Error("Minimalus depozitas yra 0.1 USDC");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    const usdc = new ethers.Contract(usdcAddress, usdcAbi, signer);

    // Naudojame toFixed(6), kad visada būtų tinkamas formatas su 6 skaitmenimis
    const parsedAmount = ethers.utils.parseUnits(amount.toFixed(6), 6);

    const tx = await usdc.transfer(vaultAddress, parsedAmount);
    await tx.wait();

    console.log("✅ USDC sėkmingai pervesta:", tx.hash);

    await updateWalletIfEmpty(userId, userAddress);
    await updateBalance(userId, amount);
    await logTransaction(userId, userAddress, amount, "deposit", tx.hash);

    return tx.hash;
  } catch (error) {
    console.error("🛑 depositUSDC klaida:", error);
    throw error;
  }
}

async function updateWalletIfEmpty(userId: string, wallet: string) {
  const { data: user } = await supabase
    .from("users")
    .select("wallet")
    .eq("id", userId)
    .single();

  if (!user?.wallet) {
    await supabase.from("users").update({ wallet }).eq("id", userId);
  }
}

async function updateBalance(userId: string, amount: number) {
  const { data: user } = await supabase
    .from("users")
    .select("balance")
    .eq("id", userId)
    .single();

  const newBalance = Number(user?.balance || 0) + amount;

  await supabase.from("users").update({ balance: newBalance }).eq("id", userId);
}

async function logTransaction(
  user_id: string,
  wallet: string,
  amount: number,
  type: string,
  tx_hash: string
) {
  await supabase.from("transactions").insert([
    {
      user_id,
      wallet,
      amount,
      type,
      tx_hash,
      timestamp: new Date().toISOString(),
    },
  ]);
}
