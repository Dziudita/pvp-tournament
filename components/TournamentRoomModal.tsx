'use client';

import React from 'react';

interface TournamentRoomModalProps {
  tournamentType: string;
  onClose: () => void;
}

export default function TournamentRoomModal({
  tournamentType,
  onClose,
}: TournamentRoomModalProps) {
  return (
    <div className="text-center p-6 border border-pink-500 rounded-xl bg-black text-white max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">
        🏆 {tournamentType} Tournament Rooms
      </h2>

      {/* Šiuo metu nėra prisijungimo prie kambarių — galima pridėti vėliau */}

      <button
        onClick={onClose}
        className="mt-6 text-pink-400 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}
