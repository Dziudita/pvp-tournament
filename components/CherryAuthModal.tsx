"use client";

import { useState } from "react";

export default function CherryAuthModal() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Lithuania");
  const [referral, setReferral] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-md text-white shadow-lg">
        {/* Tabs */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setMode("login")}
            className={`w-1/2 py-2 font-semibold rounded-t-xl ${
              mode === "login" ? "bg-pink-600" : "bg-zinc-800"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`w-1/2 py-2 font-semibold rounded-t-xl ${
              mode === "signup" ? "bg-pink-600" : "bg-zinc-800"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Inputs */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-xl bg-zinc-800 placeholder-zinc-400 border border-zinc-700"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-xl bg-zinc-800 placeholder-zinc-400 border border-zinc-700"
        />

        {mode === "signup" && (
          <>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
            >
              <option>Lithuania</option>
              <option>Estonia</option>
              <option>Latvia</option>
              <option>Other</option>
            </select>

            <input
              type="text"
              placeholder="Enter referral code"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-xl bg-zinc-800 placeholder-zinc-400 border border-zinc-700"
            />

            <label className="flex items-center mb-4 text-sm">
              <input type="checkbox" className="mr-2" required />
              I confirm that I am 18 years old and agree to the Terms of Service
            </label>
          </>
        )}

        <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 text-white py-3 rounded-xl font-bold text-lg shadow-lg">
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        {mode === "login" && (
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Forgot your password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
