"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginModal() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
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
  className="fixed inset-0 z-50 bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: "url('/assets/cherry-mascot.png')",
  }}
>
      <div className="bg-zinc-900 p-8 rounded-2xl border border-pink-500 w-[400px] shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-400">
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

        {/* Password field */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
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
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password */}
        {isSignUp && (
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
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
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        )}

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
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
