import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://innwjrnhjwxlwaimquex.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const secretHeader = req.headers["x-signature"];
  if (secretHeader !== process.env.MORALIS_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const data = req.body;

  console.log("🔥 Gauta nauja USDC transakcija:", JSON.stringify(data, null, 2));

  try {
    const tx = data.txs[0];
    const walletAddress = tx.to_address.toLowerCase();
    const amount = parseFloat(tx.value) / 1e6; // USDC turi 6 skaičius po kablelio

    // Surandam user pagal wallet adresą
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, balance")
      .eq("wallet", walletAddress)
      .single();

    if (userError || !user) {
      console.error("❌ Vartotojas nerastas:", walletAddress, userError);
      return res.status(404).json({ message: "User not found" });
    }

    // Atnaujinam balansą
    const newBalance = parseFloat(user.balance || 0) + amount;

    const { error: updateError } = await supabase
      .from("users")
      .update({ balance: newBalance })
      .eq("id", user.id);

    if (updateError) {
      console.error("❌ Nepavyko atnaujinti balanso:", updateError);
      return res.status(500).json({ message: "Failed to update balance" });
    }

    console.log(`✅ Balansas atnaujintas: ${walletAddress} → +${amount} USDC`);

    res.status(200).json({ message: "Balance updated" });
  } catch (err) {
    console.error("❌ Klaidą apdorojant:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
