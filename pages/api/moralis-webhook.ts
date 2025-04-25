// pages/api/moralis-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const secretHeader = req.headers['x-signature'];

  // Tikrinam ar Moralis siunčia
  if (secretHeader !== process.env.MORALIS_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const data = req.body;

  console.log("🔥 Naujas USDC depo:", JSON.stringify(data, null, 2));

  // Apdorojimas: gali daryti ką nori su data
  // Pvz.: const to = data.txs[0].to_address; const amount = data.txs[0].value;

  res.status(200).json({ message: 'OK' });
}
