"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaChessKnight } from "react-icons/fa";

type Player = {
  nickname: string;
  wins: number;
};

export default function TopPlayerOfDay() {
  const [players, setPlayers] = useState<Player[]>([]);
  const medalEmoji = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  useEffect(() => {
    const fetchTopPlayers = async () => {
      const { data, error } = await supabase
        .from("users_stats")
        .select("nickname, wins")
        .order("wins", { ascending: false })
        .limit(5);

      if (error) {
        console.error("❌ Klaida:", error.message);
      } else {
        setPlayers(data as Player[]);
      }
    };

    fetchTopPlayers();
  }, []);

  const bgColors = [
    "bg-gradient-to-r from-yellow-400 to-pink-500",
    "bg-gradient-to-r from-gray-400 to-pink-300",
    "bg-gradient-to-r from-yellow-600 to-pink-400",
    "bg-gradient-to-r from-pink-800 to-purple-700",
    "bg-gradient-to-r from-zinc-700 to-zinc-800",
  ];

  return (
    <div className="mt-10 ml-10 px-6 py-4 bg-zinc-900/80 backdrop-blur-md border border-pink-500 rounded-xl w-[300px] shadow-[0_0_20px_rgba(255,0,255,0.5)]">
      <h2 className="text-pink-400 font-extrabold text-lg flex items-center gap-2 mb-4 drop-shadow-[0_0_10px_#ff4dd6]">
        <FaChessKnight className="text-yellow-400" /> Top Players Today
      </h2>

      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const player = players[index];
          return (
            <li
              key={index}
              className={`flex justify-between items-center px-4 py-2 rounded-lg text-white shadow-md ${bgColors[index]} hover:scale-105 transition`}
            >
              <span className="flex items-center gap-2">
                {medalEmoji[index]}{" "}
                <span className="font-bold">
                  {player?.nickname || "Waiting..."}
                </span>
              </span>
              <span className="text-white font-semibold">
                {player?.wins != null ? `${player.wins} wins` : "-"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
