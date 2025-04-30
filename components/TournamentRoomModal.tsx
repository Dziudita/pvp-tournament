'use client';

import React from 'react';
import DailyTournamentRooms from './DailyTournamentRooms';

export default function TournamentRoomModal({
  tournamentType,
  onClose,
}: {
  tournamentType: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-[#111] border border-pink-500 rounded-xl p-6 max-w-md w-full text-center text-white">
        {tournamentType === 'daily' && (
          <DailyTournamentRooms onBack={onClose} />
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
