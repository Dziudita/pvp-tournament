'use client';

import React from 'react';

const dailyRooms = [
  { id: 'alpha', name: 'Arena Alpha', entry: '$1 Entry', players: '2 / 4' },
  { id: 'bravo', name: 'Arena Bravo', entry: '$2 Entry', players: '1 / 4' },
];

export default function DailyTournamentRooms({ onBack }: { onBack: () => void }) {
  return (
    <div className="text-center p-6 border border-pink-500 rounded-xl bg-black text-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">🏆 Daily Tournament Rooms</h2>

      <div className="space-y-4">
        {dailyRooms.map((room) => (
          <div
            key={room.id}
            className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold">{room.name}</h3>
            <p>{room.entry} · Players: {room.players}</p>
            <button className="mt-2 bg-black text-white font-bold py-1 px-4 rounded hover:bg-gray-900">
              Join
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-6 text-pink-400 hover:underline"
        onClick={onBack}
      >
        ← Back
      </button>
    </div>
  );
}
