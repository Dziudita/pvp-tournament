// ✅ Švari Topbar versija be avataro
"use client";

import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [nickname, setNickname] = useState("Cherry");

  useEffect(() => {
    const stored = localStorage.getItem("nickname");
    if (stored) setNickname(stored);
  }, []);

  return (
    <header className="fixed top-0 left-56 right-0 h-16 bg-zinc-900 border-b border-pink-500 flex items-center justify-between px-6 z-30">
      <div className="text-white text-lg font-bold">🍒 Welcome back, {nickname}!</div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-lg bg-zinc-800 text-white outline-none text-sm"
        />
      </div>
    </header>
  );
}
