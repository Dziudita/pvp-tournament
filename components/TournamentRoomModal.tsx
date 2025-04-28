import React from "react";
import Image from "next/image";

export default function TournamentRoomModal({ players, roomName, status, countdown }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-2xl w-96 text-white border-2 border-pink-500">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">{roomName}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {players.map((player: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <Image src={player.avatar} alt={player.name} width={40} height={40} className="rounded-full border border-pink-500" />
              <span className="truncate">{player.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-lg mb-2">
          {status === "waiting" ? "Waiting for players..." : `Starting in ${countdown}...`}
        </p>

        <p className="text-center text-sm text-pink-300 mb-4">Winning sound will be revealed soon! 🎧</p>

        <button className="w-full text-sm text-pink-400 hover:text-pink-300">Leave Room</button>
      </div>
    </div>
  );
}
