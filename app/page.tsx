"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

import LoginModal from "../components/LoginModal";
import Sidebar from "../components/Sidebar";
import CherryChat from "../components/CherryChat";
import Topbar from "../components/Topbar";
import TopPlayerOfDay from "../components/TopPlayerOfDay";
import Loader from "../components/Loader"; // <- pridėta

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // <- pridėta

  useEffect(() => {
    const checkInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setLoggedIn(!!data.session?.user);
      setLoading(false); // <- kai gaunam sesiją, baigiam krauti
    };
    checkInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Auth state changed:", event);
      setLoggedIn(!!session?.user);
      setLoading(false); // <- kai keičiasi būsena, baigiam krauti
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

if (loading) return <Loader />; // Kraunasi
if (!loggedIn) return <LoginModal />; // Tik modalas ir nieko daugiau

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white">
      {/* Background image */}
      <Image
        src="/assets/login-bg.png"
        alt="Background"
        fill
        className="object-cover brightness-[0.5] saturate-100 contrast-125 -z-10"
        priority
      />

      {/* Topbar rodomas tik jei prisijungta */}
      <Topbar />
      <Sidebar />

      <div className="ml-0 md:ml-[calc(6.5vw+220px)]">
        {/* Search section */}
        <div className="px-8 mt-8">
          <input
            type="text"
            placeholder="Search users or players..."
            className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none placeholder-pink-300 shadow-inner border border-pink-500"
          />
        </div>

        {/* Game buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start px-8 mt-10">
          <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
            CHERRY COINFLIP
          </button>
          <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-xl hover:opacity-80 shadow-md">
            TOURNAMENT
          </button>
        </div>

        {/* Top player */}
        <div className="mt-10 px-8 md:ml-36">
          <TopPlayerOfDay />
        </div>
      </div>

      {/* Chat */}
      <CherryChat />
    </div>
  );
}
