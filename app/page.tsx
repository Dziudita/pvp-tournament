'use client';

import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date();
      end.setUTCHours(23, 59, 59, 999);
      const distance = end.getTime() - now.getTime();

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center space-y-10">
      <h1 className="text-5xl md:text-6xl font-extrabold text-red-500 text-center">DAILY PvP TOURNAMENT</h1>
      <p className="text-lg text-red-300">Ends in: <span className="font-mono">{timeLeft}</span></p>

      <div className="bg-red-900/30 border border-red-500 rounded-2xl p-6 w-full max-w-md text-center space-y-2 shadow-xl">
        <p className="text-2xl">💰 Prize Pool: <span className="text-red-400">475 USDC + CHERZI</span></p>
        <p>👥 Players Joined: 129</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200">
            Connect Wallet
          </button>
          <button className="bg-white text-red-600 hover:bg-red-100 px-6 py-2 rounded-xl font-semibold transition-all duration-200">
            Join for 5 USDC
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-10">
        <h2 className="text-2xl text-red-400 mb-4">🏆 Leaderboard</h2>
        <table className="w-full text-left border-collapse border border-red-500">
          <thead>
            <tr className="bg-red-700">
              <th className="p-2">#</th>
              <th className="p-2">Player</th>
              <th className="p-2">Wins</th>
              <th className="p-2">Winnings</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-red-900/40">
              <td className="p-2">🥇 1</td>
              <td className="p-2">ch***i</td>
              <td className="p-2">9</td>
              <td className="p-2">110 USDC</td>
            </tr>
            <tr className="bg-red-900/30">
              <td className="p-2">🥈 2</td>
              <td className="p-2">mat***s</td>
              <td className="p-2">8</td>
              <td className="p-2">90 USDC</td>
            </tr>
            <tr className="bg-red-900/20">
              <td className="p-2">🥉 3</td>
              <td className="p-2">dre***x</td>
              <td className="p-2">7</td>
              <td className="p-2">70 USDC</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

