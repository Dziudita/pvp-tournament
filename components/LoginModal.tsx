"use client";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [confirmAge, setConfirmAge] = useState(false);

  const validatePassword = (pw: string) => pw.length >= 5 && /\d/.test(pw);

  const createStatsIfNotExist = async (nickname: string) => {
    const { data: existingUser, error: checkError } = await supabase
      .from("users_stats")
      .select("*")
      .eq("nickname", nickname)
      .single();

    if (!existingUser && !checkError) {
      const { error: insertError } = await supabase.from("users_stats").insert([
        {
          nickname,
          wins: 0,
          xp: 0,
          wager: 0,
        },
      ]);
      if (insertError) console.error("❌ Failed to insert stats:", insertError);
    }
  };

  const handleAuth = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignUp && (!confirmPassword || !nickname))) {
      return setError("Please fill in all required fields.");
    }

    if (!confirmAge) {
      return setError("You must confirm that you're at least 18 years old.");
    }

    if (isSignUp) {
      if (!validatePassword(password)) {
        return setError("Password must be at least 5 characters and include a number.");
      }
      if (password !== confirmPassword) {
        return setError("Passwords do not match.");
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) return setError(signUpError.message);

      const userId = data.user?.id;

      if (userId) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: userId,
            nickname,
            referral_code: referralCode || null,
            role: "user",
            avatar: "/avatars/default.png",
          },
        ]);

        if (insertError) {
          console.error("❌ Failed to insert user details:", insertError.message);
          return setError("User created, but failed to save nickname/referral.");
        }

        localStorage.setItem("cherzi-nick", nickname);
        localStorage.setItem("cherzi-avatar", "/avatars/default.png");

        await createStatsIfNotExist(nickname);
        window.location.reload();
      }
    } else {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) return setError(signInError.message);

      const userId = signInData.user?.id;

      if (userId) {
        const { data: profile } = await supabase
          .from("users")
          .select("nickname, avatar")
          .eq("id", userId)
          .single();

        if (profile) {
          localStorage.setItem("cherzi-nick", profile.nickname);
          localStorage.setItem("cherzi-avatar", profile.avatar || "/avatars/default.png");

          await createStatsIfNotExist(profile.nickname);
        }
      }

      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-40">
      <Image src="/assets/login-bg.png" alt="Background" fill className="object-cover hidden md:block" priority />
      <div className="block md:hidden absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-xs bg-black/80 p-6 rounded-2xl border border-pink-500 shadow-lg relative z-50">
          <div className="flex flex-col items-center mb-4">
            <Image src="/assets/cherry-mascot.png" alt="Cherzi Mascot" width={70} height={70} />
            <h2 className="text-2xl font-bold text-pink-400 mt-2">CHERZI ARENA</h2>
          </div>
          <h2 className="text-lg font-semibold text-center mb-3 text-white">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>
          {error && <p className="text-red-400 text-center mb-3 font-semibold">{error}</p>}
          <form onSubmit={handleAuth}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full mb-3 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
            />
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2 text-pink-300 hover:text-pink-400"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {isSignUp && (
              <>
                <div className="relative mb-3">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-2 text-pink-300 hover:text-pink-400"
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Referral Code (optional)"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full mb-3 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
                />
              </>
            )}
            <div className="flex items-start mb-3 text-xs text-gray-300">
              <input
                type="checkbox"
                className="mr-2 mt-1"
                checked={confirmAge}
                onChange={() => setConfirmAge(!confirmAge)}
              />
              <label>
                I confirm that I am 18 years old and I have read the{" "}
                <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 rounded-lg transition"
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
              className="text-xs text-pink-300 hover:underline"
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
