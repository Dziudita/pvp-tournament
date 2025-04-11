"use client";

import React, { useState } from "react";

export default function CherryChat() {
  const [isOpen, setIsOpen] = useState(false);

  const messages = [
    { username: "CherryNoob", text: "hey guys... am I late? 😳" },
    { username: "BoomCherry", text: "bro you always late 😩" },
    { username: "CoolSlapz", text: "who tryna duel rn 🍒💥" },
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 w-14 h-14 rounded-full bg-pink-600 text-white flex items-center justify-center text-xl shadow-lg hover:bg-pink-500 z-50"
      >
        💬
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 w-80 bg-zinc-900 border-2 border-pink-500 rounded-xl p-4 text-white shadow-xl z-40">
          <h2 className="text-pink-400 font-bold text-lg mb-2 flex items-center gap-2">
            🍒 Cherry Chat
          </h2>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start gap-2">
                <img
                  src="/avatars/default.png"
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-pink-300 font-semibold">{msg.username}:</p>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
