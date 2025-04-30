'use client';

import React, { useEffect, useState } from 'react';
import DailyTournamentRooms from './DailyTournamentRooms';
import { supabase } from '@/lib/supabaseClient';

interface TournamentRoom {
  id: string;
  name: string;
  entry_amount: number;
  max_players: number;
  players_joined: number;
  is_open: boolean;
  created_at: string;
}

export default function TournamentRoomModal({
  tournamentType,
  onClose,
}: {
  tournamentType: string;
  onClose: () => void;
}) {
  const [rooms, setRooms] = useState<TournamentRoom[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tournament_rooms')
        .select('*')
        .eq('is_open', true); // Galima vėliau filtruoti pagal tournamentType

      if (error) {
        console.error('Error fetching rooms:', error.message);
      } else {
        setRooms(data || []);
      }
      setLoading(false);
    };

    if (tournamentType === 'daily') {
      fetchRooms();
    }
  }, [tournamentType]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-[#111] border border-pink-500 rounded-xl p-6 max-w-md w-full text-center text-white">
        {tournamentType === 'daily' && (
          <>
            {loading ? (
              <p className="text-pink-400">Loading rooms...</p>
            ) : (
              <DailyTournamentRooms rooms={rooms} onBack={onClose} />
            )}
          </>
        )}

        {tournamentType === 'weekend' && (
          <>
            <h2 className="text-2xl font-bold text-pink-400 mb-4">
              Weekend Tournament
            </h2>
            <p className="text-sm text-gray-400 mb-6">Coming soon! 🚧</p>
            <button
              onClick={onClose}
              className="mt-4 text-pink-400 hover:underline"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
