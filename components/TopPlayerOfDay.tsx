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
  const medalEmoji = ["🥇", "🥈", "🥉"];

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
        setPlayers(data as Player[]);
      }
    };

    fetchTopPlayers();
  }, []);

  return (
    <div className="mt-10 ml-10 px-6 py-4 bg-black/50 border border-pink-500 rounded-xl w-[300px] shadow-lg">
      <h2 className="text-pink-400 font-extrabold text-lg flex items-center gap-2 mb-4 drop-shadow-[0_0_10px_#ff4dd6]">
        <FaChessKnight className="text-yellow-400" /> Top Players Today
      </h2>

      <ul className="space-y-2">
        {players.map((player, index) => (
          <li
            key={player.nickname}
            className="flex justify-between items-center bg-zinc-900 px-4 py-2 rounded-lg text-white"
          >
            <span className="flex items-center gap-2">
              {medalEmoji[index]} <span className="font-bold">{player.nickname}</span>
            </span>
            <span className="text-pink-400 font-semibold">{player.wins} wins</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
