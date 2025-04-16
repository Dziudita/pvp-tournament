"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

import LoginModal from "../components/LoginModal";
import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "../components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        console.log("✅ Prisijungęs vartotojas:", data.user);
        setLoggedIn(true);
      } else {
        console.log("🚫 Nėra prisijungusio vartotojo");
        setLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  if (!loggedIn) return <LoginModal />;

  return (
    <div className="w-screen h-full overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-black relative">
      <Sidebar />

      <div className="ml-0 md:ml-[calc(6.5vw+220px)]">
        {/* Main Cherry Hero in the top center */}
        <div className="flex justify-center mt-6">
          <div className="text-center">
            <Image
              src="/assets/cherry-mascot.png"
              alt="Main Cherry Mascot"
              width={80}
              height={80}
              className="drop-shadow-[0_0_2px_#ff66dd]"
            />
          </div>
        </div>

        <div className="px-8 mt-8">
          <input
            type="text"
            placeholder="Search users or players..."
            className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none placeholder-pink-300 shadow-inner border border-pink-500"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start px-8 mt-10">
          <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
            CHERRY COINFLIP
          </button>
          <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
            TOURNAMENT
          </button>
        </div>

        <div className="mt-10 px-8 md:ml-36">
          <TopPlayersRow />
        </div>
      </div>

      {/* Background cherries left/right */}
      <Image
        src="/assets/evil-cherry.png"
        alt="Evil Cherry"
        width={120}
        height={120}
        className="absolute bottom-6 left-6 drop-shadow-[0_0_1px_#ff66dd]"
      />
      <Image
        src="/assets/angry-cherry.png"
        alt="Angry Cherry"
        width={120}
        height={120}
        className="absolute bottom-6 right-6 drop-shadow-[0_0_1px_#ff66dd]"
      />

      <CherryChat />
    </div>
  );
}
