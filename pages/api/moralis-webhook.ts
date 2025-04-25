// pages/api/moralis-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  // VISADA gražinam 200 OK - TESTUI!
  console.log("✅ Received POST request from Moralis:", req.body);

  return res.status(200).json({ message: 'OK' });
}
