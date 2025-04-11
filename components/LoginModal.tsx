"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginModal() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [existingUsers, setExistingUsers] = useState<{ [key: string]: string }>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load existing users and check if user already logged in
  useEffect(() => {
    const users = localStorage.getItem("cherzi-users");
    if (users) setExistingUsers(JSON.parse(users));

    const savedNick = localStorage.getItem("cherzi-nick");
    const savedPass = localStorage.getItem("cherzi-pass");

    if (savedNick && savedPass) {
      setIsLoggedIn(true); // Hide modal if already logged in
    }
  }, []);

  const validatePassword = (pw: string) => {
    return pw.length >= 6 && /\d/.test(pw);
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

      const updatedUsers = { ...existingUsers, [nickname]: password };
      localStorage.setItem("cherzi-users", JSON.stringify(updatedUsers));
    } else {
      if (!(nickname in existingUsers)) {
        return setError("User not found.");
      }
      if (existingUsers[nickname] !== password) {
        return setError("Incorrect password.");
      }
    }

    localStorage.setItem("cherzi-nick", nickname);
    localStorage.setItem("cherzi-pass", password);
    setIsLoggedIn(true); // Close modal
    location.reload(); // Optional: reload page after login
  };

  if (isLoggedIn) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-pink-500 w-[400px] shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-400">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="text-center text-red-400 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-pink-200 outline-none"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-pink-300 hover:text-pink-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

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
