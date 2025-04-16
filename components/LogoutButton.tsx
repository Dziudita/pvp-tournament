"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LogoutButton() {
  const handleLogout = async () => {
    console.log("🚪 Bandome atsijungti...");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("❌ Atsijungimo klaida:", error.message);
    } else {
      console.log("✅ Vartotojas atsijungė iš Supabase");

      // Pašalinam localStorage info (saugumo dėlei)
      localStorage.removeItem("cherzi-nick");
      localStorage.removeItem("cherzi-pass");

      // Trumpas delay – kad užtikrint signOut užbaigimą
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-4 text-pink-100 hover:text-pink-400"
    >
      <div className="w-10 h-10 bg-pink-500/80 hover:bg-pink-400 transition rounded-full flex items-center justify-center shadow-md">
        🔒
      </div>
      Logout
    </button>
  );
}
