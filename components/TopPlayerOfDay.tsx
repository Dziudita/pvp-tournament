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
  const [loading, setLoading] = useState(true);

  const medalEmoji = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  const bgColors = [
    "bg-gradient-to-r from-yellow-400 to-pink-500",
    "bg-gradient-to-r from-gray-400 to-pink-300",
    "bg-gradient-to-r from-yellow-600 to-pink-400",
    "bg-gradient-to-r from-pink-800 to-purple-700",
    "bg-gradient-to-r from-zinc-700 to-zinc-800",
  ];

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
      setLoading(false);
    };

    fetchTopPlayers();
  }, []);

  return (
    <div className="relative p-[2px] bg-gradient-to-r from-pink-500 to-purple-700 rounded-2xl shadow-[0_0_20px_rgba(255,0,255,0.4)] w-[300px]">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl p-5">
        <h2 className="text-pink-400 font-extrabold text-lg flex items-center gap-2 mb-4 drop-shadow-[0_0_10px_#ff4dd6]">
          <FaChessKnight className="text-yellow-400" /> Top Players Today
        </h2>

        <ul className="space-y-2">
          {loading ? (
            <li className="text-sm text-gray-400 animate-pulse">Loading leaderboard...</li>
          ) : players.length === 0 ? (
            <li className="text-sm text-gray-400">No players yet today.</li>
          ) : (
            players.map((player, index) => (
              <li
                key={index}
                className={`flex justify-between items-center px-4 py-2 rounded-lg text-white font-semibold shadow-md transition transform hover:scale-[1.03] hover:shadow-[0_0_10px_rgba(255,0,255,0.4)] ${bgColors[index]}`}
              >
                <span className="flex items-center gap-2">
                  {medalEmoji[index]} <span>{player.nickname}</span>
                </span>
                <span>{player.wins} wins</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
