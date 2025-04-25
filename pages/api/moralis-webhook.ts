// pages/api/moralis-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://innwjrnhjwxlwaimquex.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const secretHeader = req.headers['x-signature'];

  // Patikrinam ar ateina iš Moralis
  if (secretHeader !== process.env.MORALIS_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const data = req.body;
  console.log("🔥 Naujas USDC depo:", JSON.stringify(data, null, 2));

  try {
    const tx = data.txs[0];
    const wallet = tx.to_address.toLowerCase(); // Normalize wallet
    const value = parseFloat(tx.value); // Pridėti tiek USDC

    // Surandam vartotoją pagal wallet
    const { data: users, error } = await supabase
      .from('users')
      .select('id, balance')
      .eq('wallet', wallet)
      .single();

    if (!users) {
      console.error("❌ Wallet nerastas:", wallet, error);
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Atnaujinam balansą
    const newBalance = parseFloat(users.balance) + value;

    const { error: updateError } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', users.id);

    if (updateError) {
      console.error("❌ Nepavyko atnaujinti balanso:", updateError);
      return res.status(500).json({ message: 'Balance update failed' });
    }

    console.log(`✅ Pridėta ${value} USDC vartotojui: ${wallet}, naujas balansas: ${newBalance}`);
    res.status(200).json({ message: 'Balance updated' });

  } catch (err) {
    console.error("❌ Klaida procese:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
