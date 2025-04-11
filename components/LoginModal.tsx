"use client";

import { useEffect, useState } from "react";

export default function LoginModal() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("cherzi-user");
    if (!user) {
      setShowModal(true);
    }
  }, []);

  const handleLogin = () => {
    if (!nickname || !password) return alert("Fill in all fields");

    // Save to localStorage (could be validated later)
    const userData = { nickname, password };
    localStorage.setItem("cherzi-user", JSON.stringify(userData));
    setShowModal(false);
    window.location.reload(); // Reload to update state globally (optional)
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-zinc-900 text-white p-8 rounded-xl border border-pink-500 w-96">
        <h2 className="text-2xl font-bold text-pink-400 mb-4 text-center">
          Login or Sign Up
        </h2>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 text-white outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-zinc-800 text-white outline-none"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-pink-600 rounded-lg hover:bg-pink-500 font-bold"
        >
          Enter Arena
        </button>
      </div>
    </div>
  );
}
