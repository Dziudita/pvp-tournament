"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      console.log("👤 Current user:", user);
    });
  }, []);

  return (
    <main className="text-white p-6">
      {user ? (
        <h1>Welcome, {user.email}</h1>
      ) : (
        <h1>Please log in to enter the arena</h1>
      )}
    </main>
  );
}
