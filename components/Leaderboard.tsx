"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      const { data, error } = await supabase
        .from("users_stats")
        .select("nickname, wins")
        .order("wins", { ascending: false })
        .limit(3);

      if (error) {
        console.error("❌ Klaida:", error.message);
      } else {
        setPlayers(data);
      }
    };

    fetchTopPlayers();
  }, []);

  const medalEmoji = ["🥇", "🥈", "🥉"];

  return (
    <div className="absolute right-4 top-[120px] bg-zinc-900/70 border border-pink-500 rounded-2xl p-4 w-64 z-30 shadow-xl">
      <h2 className="text-pink-400 font-bold text-xl mb-4 text-center drop-shadow-[0_0_8px_#ff4dd6]">
        🏆 Top Players Today
      </h2>
      <ul className="space-y-2">
        {players.map((player, index) => (
          <li
            key={player.nickname}
            className="bg-black/40 rounded-lg p-3 flex justify-between items-center hover:bg-zinc-800 transition"
          >
            <span className="text-white font-medium text-sm">
              {medalEmoji[index]} {player.nickname}
            </span>
            <span className="text-pink-300 font-bold text-sm">
              {player.wins} wins
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
