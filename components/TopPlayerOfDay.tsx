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

  return (
    <div className="mt-10 ml-10 px-6 py-4 bg-zinc-900/80 backdrop-blur-md border border-pink-500 rounded-xl w-[300px] shadow-[0_0_20px_rgba(255,0,255,0.5)]">
      <h2 className="text-pink-400 font-extrabold text-lg flex items-center gap-2 mb-4 drop-shadow-[0_0_10px_#ff4dd6]">
        <FaChessKnight className="text-yellow-400" /> Top Players Today
      </h2>

      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-zinc-900 px-4 py-2 rounded-lg text-white"
          >
            <span className="flex items-center gap-2">
              {medalEmoji[index]}{" "}
              <span className="font-bold">
                {players[index]?.nickname || "Waiting..."}
              </span>
            </span>
            <span className="text-pink-400 font-semibold">
              {players[index]?.wins != null ? `${players[index].wins} wins` : "-"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
