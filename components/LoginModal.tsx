"use client";

import { useState, useEffect } from "react";

export default function LoginModal() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [existingUsers, setExistingUsers] = useState<{ [key: string]: string }>({});

  // Load all registered users from localStorage
  useEffect(() => {
    const users = localStorage.getItem("cherzi-users");
    if (users) setExistingUsers(JSON.parse(users));
  }, []);

  const validatePassword = (pw: string) => {
    return pw.length >= 6 && /\d/.test(pw); // at least one number
  };

  const handleAuth = () => {
    setError("");

    if (!nickname || !password) {
      return setError("Please fill in both fields.");
    }

    if (isSignUp) {
      if (nickname in existingUsers) {
        return setError("Nickname already taken.");
      }
      if (!validatePassword(password)) {
        return setError("Password must be at least 6 characters and include a number.");
      }

      // Register new user
      const updatedUsers = { ...existingUsers, [nickname]: password };
      localStorage.setItem("cherzi-users", JSON.stringify(updatedUsers));
      localStorage.setItem("cherzi-nick", nickname);
      localStorage.setItem("cherzi-pass", password);
      location.reload();
    } else {
      // Login flow
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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-pink-500 w-[400px] shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-400">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-400 font-semibold">{error}</p>
        )}

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
            onClick={() => {
              setError("");
              setIsSignUp(!isSignUp);
            }}
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
