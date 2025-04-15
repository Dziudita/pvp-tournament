"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [confirmAge, setConfirmAge] = useState(false);

  const validatePassword = (pw: string) => pw.length >= 5 && /\d/.test(pw);

  const handleAuth = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    if (!email || !password || !nickname || (isSignUp && !confirmPassword)) {
      return setError("Please fill in all fields.");
    }

    if (!confirmAge) {
      return setError("You must confirm that you're at least 18 years old.");
    }

    if (isSignUp) {
      if (!validatePassword(password)) return setError("Password must be at least 5 characters and include a number.");
      if (password !== confirmPassword) return setError("Passwords do not match.");

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) return setError(signUpError.message);

      // Insert user metadata into `users` table
      const { error: insertError } = await supabase.from("users").insert({
        id: data.user?.id,
        nickname,
        referral_code: referralCode || null,
      });

      if (insertError) return setError("Signup succeeded but failed to save user data.");

      alert("Check your email to confirm your account!");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) return setError(signInError.message);

      location.reload();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-cover bg-center px-4"
      style={{ backgroundImage: "url(/assets/login-bg.png)" }}
    >
      <div className="bg-black/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-500 w-[320px] shadow-[0_0_30px_rgba(255,0,255,0.3)]">
        <div className="flex flex-col items-center mb-6">
          <Image src="/assets/cherry-mascot.png" alt="Cherzi Mascot" width={80} height={80} />
          <h2 className="text-2xl font-bold text-pink-400 mt-2">CHERZI ARENA</h2>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4 text-white">{isSignUp ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-400 text-center mb-4 font-semibold">{error}</p>}

        <form onSubmit={handleAuth}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-pink-300"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {isSignUp && (
            <>
              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-pink-300"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <input
                type="text"
                placeholder="Referral Code (optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200"
              />
            </>
          )}

          <div className="flex items-start mb-4 text-sm text-gray-300">
            <input
              type="checkbox"
              className="mr-2 mt-1"
              checked={confirmAge}
              onChange={() => setConfirmAge(!confirmAge)}
            />
            <label>
              I confirm I am 18+ and agree to the{" "}
              <Link href="/terms" className="text-blue-400 hover:underline">Terms</Link> and{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-lg transition"
          >
            {isSignUp ? "Create Account" : "Enter Arena"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setError("");
              setIsSignUp(!isSignUp);
            }}
            className="text-sm text-pink-300 hover:underline"
          >
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
