// pages/api/moralis-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 👇 Visada log'insim
  console.log('🔍 Received method:', req.method);
  console.log('🔍 Received headers:', JSON.stringify(req.headers, null, 2));
  console.log('🔍 Received body:', JSON.stringify(req.body, null, 2));

  // Atsakykim visada 200, nes norim tik patikrinti ar Moralis pasiekia
  return res.status(200).json({ message: 'Received' });
}
