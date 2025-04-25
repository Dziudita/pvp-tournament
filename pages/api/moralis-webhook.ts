// pages/api/moralis-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://innwjrnhjwxlwaimquex.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  // Jei Moralis siunčia testą be signatūros, tiesiog grąžink 200
  if (!req.headers['x-signature']) {
    return res.status(200).json({ message: 'Received test' });
  }

  const secretHeader = req.headers['x-signature'];
  if (secretHeader !== process.env.MORALIS_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const data = req.body;
  console.log("🔥 Naujas USDC depo:", JSON.stringify(data, null, 2));

  // Logika: įrašyti depo (čia galima tobulinti)
  const walletAddress = data?.txs?.[0]?.to_address;
  const value = data?.txs?.[0]?.value; // USD reikšmė

  if (walletAddress && value) {
    await supabase
      .from('users')
      .update({ balance: value })
      .eq('wallet', walletAddress);
  }

  return res.status(200).json({ message: 'OK' });
}
