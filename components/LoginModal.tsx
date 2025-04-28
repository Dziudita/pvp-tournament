"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    // Registruojam vartotoją su email ir password
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      return setError(signUpError.message);
    }

    const userId = signUpData.user?.id;

    if (userId) {
      // Patikrinam kiek jau yra vartotojų
      const { count, error: countError } = await supabase
        .from("users")
        .select("id", { count: "exact", head: true });

      let role = "user"; // default

      if (countError) {
        console.error("Count Error:", countError.message);
      } else if (count === 0) {
        role = "owner"; // Jei tai pirmasis vartotojas
      }

      // Įrašom vartotojo detales su teisinga role
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          nickname,
          referral_code: referralCode || null,
          role: role,
        },
      ]);

      if (insertError) {
        console.error("Failed to insert user details:", insertError.message);
        setLoading(false);
        return setError("User created, but failed to save nickname/referral.");
      }
    }

    setLoading(false);
    // Čia gali redirect/intformuoti kad viskas ok
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
      />
      <input
        type="text"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
        placeholder="Referral Code (optional)"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </div>
  );
}
