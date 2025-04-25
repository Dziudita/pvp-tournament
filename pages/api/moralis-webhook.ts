// pages/api/moralis-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://innwjrnhjwxlwaimquex.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY! // <- pridėsim
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const secretHeader = req.headers['x-signature'];

  if (secretHeader !== process.env.MORALIS_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const data = req.body;
  console.log("🔥 Naujas USDC depo:", JSON.stringify(data, null, 2));

  const toAddress = data.txs[0].to_address.toLowerCase();
  const value = parseFloat(data.txs[0].value) / 1e6; // USDC dažnai 6 decim.

  // Ieškom vartotojo pagal wallet
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet', toAddress)
    .single();

  if (error || !users) {
    console.log("❌ Vartotojas nerastas:", toAddress);
    return res.status(404).json({ message: 'User not found' });
  }

  // Atnaujinam balansą
  const { error: updateError } = await supabase
    .from('users')
    .update({ balance: users.balance + value })
    .eq('wallet', toAddress);

  if (updateError) {
    console.log("❌ Balanso atnaujinimo klaida:", updateError);
    return res.status(500).json({ message: 'Failed to update balance' });
  }

  res.status(200).json({ message: 'Deposit processed' });
}
