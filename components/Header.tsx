import { useState } from 'react';
import { FaUserCircle, FaGlobe, FaCog } from 'react-icons/fa';

export default function Header() {
  const [balance] = useState('0.00810214');

  return (
    <header className="w-full px-6 py-3 bg-black bg-opacity-80 border-b border-pink-600 flex justify-between items-center z-50 shadow-md">
      {/* Logo */}
      <div className="text-pink-500 text-xl font-bold tracking-widest">
        🍒 Cherry Arena
      </div>

      {/* Center (optional search or nav links) */}
      {/* You can add more here later */}

      {/* Right section */}
      <div className="flex items-center gap-6 text-white">
        {/* Balance */}
        <div className="bg-gray-900 px-4 py-1 rounded-xl text-sm shadow-inner">
          💰 {balance} CHERZ
        </div>

        {/* Profile avatar */}
        <div className="cursor-pointer hover:text-pink-400 transition">
          <FaUserCircle size={24} />
        </div>

        {/* Language icon */}
        <div className="cursor-pointer hover:text-pink-400 transition">
          <FaGlobe size={20} />
        </div>

        {/* Settings / notifications */}
        <div className="cursor-pointer hover:text-pink-400 transition">
          <FaCog size={20} />
        </div>
      </div>
    </header>
  );
}
