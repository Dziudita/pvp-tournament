"use client";

import { useState } from "react";

export default function LoginModal() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = () => {
    if (!nickname || !password) return alert("Please fill both fields.");
    localStorage.setItem("cherzi-nick", nickname);
    localStorage.setItem("cherzi-pass", password);
    location.reload(); // reload to close modal
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-pink-500 w-[400px] shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-400">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-lg transition"
        >
          {isSignUp ? "Create Account" : "Enter Arena"}
        </button>

        <div className="mt-4 text-center">
          <button
            className="text-sm text-pink-300 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
