import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const data = req.body;

  // Log viską, kad matytum kas atkeliauja
  console.log("🔍 Received Data:", JSON.stringify(data, null, 2));

  // Tikrinam ar yra txs ir to_address
  if (data.txs && data.txs.length > 0 && data.txs[0].to_address) {
    console.log("💰 Deposit detected to:", data.txs[0].to_address);
  } else {
    console.log("⚠️ No transaction data found.");
  }

  return res.status(200).json({ message: 'OK' });
}
