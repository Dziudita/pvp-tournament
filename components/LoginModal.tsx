"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function LoginModal() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [confirmAge, setConfirmAge] = useState(false);
  const [existingUsers, setExistingUsers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const users = localStorage.getItem("cherzi-users");
    if (users) setExistingUsers(JSON.parse(users));
  }, []);

  const validatePassword = (pw: string) => {
    return pw.length >= 5 && /\d/.test(pw);
  };

  const handleAuth = () => {
    setError("");

    if (!nickname || !password || (isSignUp && !confirmPassword)) {
      return setError("Please fill in all fields.");
    }

    if (!confirmAge) {
      return setError("You must confirm that you're at least 18 years old.");
    }

    if (isSignUp) {
      if (nickname in existingUsers) {
        return setError("Nickname is already taken.");
      }

      if (!validatePassword(password)) {
        return setError("Password must be at least 5 characters and include a number.");
      }

      if (password !== confirmPassword) {
        return setError("Passwords do not match.");
      }

      const updatedUsers = { ...existingUsers, [nickname]: password };
      localStorage.setItem("cherzi-users", JSON.stringify(updatedUsers));
      localStorage.setItem("cherzi-nick", nickname);
      localStorage.setItem("cherzi-pass", password);
      if (referralCode) localStorage.setItem("cherzi-ref", referralCode);
      location.reload();
    } else {
      if (!(nickname in existingUsers)) {
        return setError("User not found.");
      }

      if (existingUsers[nickname] !== password) {
        return setError("Incorrect password.");
      }

      localStorage.setItem("cherzi-nick", nickname);
      localStorage.setItem("cherzi-pass", password);
      location.reload();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-cover bg-center"
      style={{
        backgroundImage: "url(/assets/winner-loser-bg.png)",
        backgroundSize: "contain",
        backgroundPosition: "top center",
      }}
    >
      <div className="bg-black/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-500 w-[320px] shadow-2xl relative">
        <div className="flex flex-col items-center mb-6">
          <Image src="/assets/cherry-mascot.png" alt="Cherzi Mascot" width={80} height={80} />
          <h2 className="text-2xl font-bold text-pink-400 mt-2">CHERZI ARENA</h2>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4 text-white">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="text-red-400 text-center mb-4 font-semibold">{error}</p>}

        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-3 text-pink-300 hover:text-pink-400"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {isSignUp && (
          <>
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "password" : "text"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-3 text-pink-300 hover:text-pink-400"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <input
              type="text"
              placeholder="Referral Code (optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
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
            I confirm that I am 18 years old and I have read the{" "}
            <Link href="/terms" className="text-blue-400 hover:underline">Terms of service</Link> and{" "}
            <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
          </label>
        </div>

        <button
          onClick={handleAuth}
          className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-lg transition"
        >
          {isSignUp ? "Create Account" : "Enter Arena"}
        </button>

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
