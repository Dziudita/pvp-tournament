import React from "react";

const messages = [
  { user: "CherryNoob", avatar: "/avatars/cherry-noob.png", text: "hey guys... am I late? 😳" },
  { user: "BoomCherry", avatar: "/avatars/cherry-noob.png", text: "bro you always late 😤" },
  { user: "CoolSlapz", avatar: "/avatars/cherry-noob.png", text: "who tryna duel rn 🍒💥" },
];

export default function CherryChat() {
  return (
    <div className="fixed left-6 bottom-24 bg-zinc-800 text-white text-sm w-72 h-64 rounded-xl shadow-2xl p-4 overflow-y-auto z-40 border border-pink-500">
      <p className="text-pink-400 font-bold mb-3">🍒 Cherry Chat</p>
      {messages.map((msg, idx) => (
        <div key={idx} className="flex items-start gap-2 mb-3">
          <img src={msg.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
          <div>
            <span className="text-pink-300 font-semibold mr-1">{msg.user}:</span>
            <span>{msg.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
