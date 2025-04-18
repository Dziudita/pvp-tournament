"use client";

import { useState } from "react";
import Image from "next/image";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css"; // Svarbu įtraukti stilių

export default function CherryAuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // auth logic here
    console.log("Submitted:", { email, password });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Background mascot image */}
      <Image
        src="/assets/cherry-mascot.png"
        alt="Cherry Mascot"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-10 select-none pointer-events-none"
      />

      {/* Login/Register Card */}
      <div className="z-10 w-full max-w-md bg-zinc-900/80 border border-pink-600 rounded-2xl shadow-2xl p-8 relative">
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 font-bold rounded-l-xl transition ${
              isLogin ? "bg-pink-500 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 font-bold rounded-r-xl transition ${
              !isLogin ? "bg-pink-500 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 border border-pink-500 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 border border-pink-500 focus:outline-none"
            required
          />

          {!isLogin && (
            <div className="flex items-center gap-2">
              <input type="checkbox" required />
              <label className="text-sm text-zinc-300">
                I confirm I am 18+ and agree to the Terms of Service
              </label>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
