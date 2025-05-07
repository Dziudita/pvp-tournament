'use client';

import React from 'react';

interface TournamentRoom {
  id: string;
  name: string;
  entry_amount: number;
  max_players: number;
  players_joined: number;
  is_open: boolean;
  created_at: string;
}

interface DailyTournamentRoomsProps {
  rooms: TournamentRoom[];
  onBack: () => void;
  tournamentType: string;
}

export default function DailyTournamentRooms({
  rooms,
  onBack,
  tournamentType,
}: DailyTournamentRoomsProps) {
  return (
    <div className="text-center p-6 border border-pink-500 rounded-xl bg-black text-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">
        🏆 {tournamentType} Tournament Rooms
      </h2>

      {rooms.length > 0 ? (
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li
              key={room.id}
              className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-3 shadow-md"
            >
              <div className="font-semibold">{room.name}</div>
              <div className="text-sm">
                Entry: ${room.entry_amount} · Players: {room.players_joined}/{room.max_players}
              </div>
              <div className="text-xs">
                Status:{' '}
                {room.is_open ? (
                  <span className="text-green-200">Open</span>
                ) : (
                  <span className="text-red-300">Full</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mt-4">No tournament rooms available.</p>
      )}

      <button onClick={onBack} className="mt-6 text-pink-400 hover:underline">
        ← Back
      </button>
    </div>
  );
}
