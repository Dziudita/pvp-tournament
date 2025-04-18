"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaComment } from "react-icons/fa";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function CherryChat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: "CherryBoss", text: "Welcome to Cherry Chat! 🍒", avatar: "/avatar1.png" },
    { id: 2, user: "PlayerX", text: "Let’s flip some cherries! 😄", avatar: "/avatar2.png" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: Date.now(),
      user: "You",
      text: newMessage,
      avatar: "/avatar-you.png",
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-5 right-5 bg-pink-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-pink-400 transition"
      >
        <FaComment size={24} />
      </button>

      {chatOpen && (
        <div className="fixed bottom-20 right-5 w-[360px] max-h-[75vh] bg-zinc-900 rounded-2xl shadow-2xl border border-pink-600 flex flex-col overflow-hidden z-40">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700 bg-zinc-800">
            <span className="text-pink-400 font-bold text-lg">🍒 Cherry Chat</span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <Image src={msg.avatar} alt="avatar" width={32} height={32} className="rounded-full" />
                <div>
                  <p className="text-sm text-pink-300 font-semibold">{msg.user}</p>
                  <div className="bg-zinc-800 px-3 py-2 rounded-xl text-sm text-white max-w-[240px] break-words">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <div className="border-t border-zinc-700 p-3 bg-zinc-900 flex items-center gap-2 relative">
            <button
              className="text-xl"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-14 left-0 z-50">
                <Picker
                  onSelect={(emoji: any) => {
                    setNewMessage((prev) => prev + emoji.native);
                    setShowEmojiPicker(false);
                  }}
                  theme="dark"
                />
              </div>
            )}

            <input
              type="text"
              placeholder="Enter your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-3 py-2 rounded-xl bg-zinc-800 text-white placeholder-zinc-400 outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-pink-500 hover:bg-pink-600 transition px-4 py-2 rounded-full text-white font-bold"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
