"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LogoutButton() {
  const handleLogout = async () => {
    // 1. Atsijungiam iš Supabase sesijos
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      console.log("✅ User signed out from Supabase");

      // 2. Išvalom localStorage (jei naudojamas)
      localStorage.removeItem("cherzi-nick");
      localStorage.removeItem("cherzi-pass");

      // 3. Perkrovimas arba navigacija į login
      window.location.reload();
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
