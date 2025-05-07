'use client';

import React from 'react';

type TournamentRoom = {
  id: string;
  name: string;
  entry_amount: number;
  max_players: number;
  players_joined: number;
  is_open: boolean;
  created_at: string;
};

interface DailyTournamentRoomsProps {
  rooms?: TournamentRoom[];
  onBack?: () => void;
  tournamentType: string;
}

export default function DailyTournamentRooms({
  rooms = [],
  onBack = () => {},
  tournamentType,
}: DailyTournamentRoomsProps) {
  return (
    <div className="text-center p-6 border border-pink-500 rounded-xl bg-black text-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">
        🏆 {tournamentType} Tournament Rooms
      </h2>

      {rooms.length > 0 ? (
        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4 shadow-md"
            >
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p>
                ${room.entry_amount} Entry · Players: {room.players_joined} / {room.max_players}
              </p>
              <p className="text-sm">
                Status:{' '}
                {room.is_open ? (
                  <span className="text-green-200 font-medium">Open</span>
                ) : (
                  <span className="text-red-300 font-medium">Full</span>
                )}
              </p>
              <button
                className="mt-2 bg-black text-white font-bold py-1 px-4 rounded hover:bg-gray-900 disabled:opacity-50"
                disabled={!room.is_open}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-4">No tournament rooms available right now.</p>
      )}

      <button className="mt-6 text-pink-400 hover:underline" onClick={onBack}>
        ← Back
      </button>
    </div>
  );
}
