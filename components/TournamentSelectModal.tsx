import React from "react";

export default function TournamentSelectModal({ onSelect, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-2xl w-96 text-white border-2 border-pink-500">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">Choose a Tournament</h2>

        <div className="space-y-4">
          <button
            onClick={() => onSelect("daily")}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-lg font-bold hover:opacity-80"
          >
            🎯 Daily Tournament
          </button>

          <button
            onClick={() => onSelect("weekend")}
            className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-3 rounded-lg font-bold hover:opacity-80"
          >
            💥 Weekend Tournament
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 text-sm text-pink-400 hover:text-pink-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
