console.log('🔍 Received headers:', JSON.stringify(req.headers, null, 2));
console.log('🔍 Received body:', JSON.stringify(req.body, null, 2));

// pages/api/moralis-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const moralisSecret = process.env.MORALIS_SECRET;

  if (!moralisSecret) {
    console.error('❌ MORALIS_SECRET is not defined in environment variables.');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const signature = req.headers['x-signature'] as string;

  if (!signature) {
    return res.status(400).json({ message: 'Missing signature header' });
  }

  // Konvertuojam body į string formą kaip reikalauja Moralis parašo validacija
  const body = JSON.stringify(req.body);

  // Sukuriame hash su HMAC SHA256
  const expectedSignature = crypto
    .createHmac('sha256', moralisSecret)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.warn('⚠️ Invalid signature. Expected:', expectedSignature, 'Received:', signature);
    return res.status(401).json({ message: 'Unauthorized - Invalid signature' });
  }

  // Jei viskas OK – loginam ir grąžinam 200
  console.log("🔥 Naujas USDC depo:", JSON.stringify(req.body, null, 2));

  // Čia galėsi apdoroti transakcijos duomenis
  // Pvz. req.body.txs[0].to_address ir req.body.txs[0].value

  res.status(200).json({ message: 'OK' });
}
