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

export default function DailyTournamentRooms({
  rooms,
  onBack,
}: {
  rooms: TournamentRoom[];
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daily Tournament Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="mb-2">
            {room.name} ({room.players_joined}/{room.max_players})
          </li>
        ))}
      </ul>
      <button onClick={onBack} className="mt-4 text-pink-400 hover:underline">
        Back
      </button>
    </div>
  );
}
