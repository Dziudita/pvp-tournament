"use client";

import { useEffect, useState } from "react";

export default function CherryChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ user: string; text: string }[]>([]);

  // Load chat from localStorage
  useEffect(() => {
    const storedChat = localStorage.getItem("cherzi-chat");
    if (storedChat) {
      setChat(JSON.parse(storedChat));
    } else {
      // default messages
      setChat([
        { user: "CherryNoob", text: "hey guys... am I late? 😳" },
        { user: "BoomCherry", text: "bro you always late 😩" },
        { user: "CoolSlapz", text: "who tryna duel rn 🍒💥" },
      ]);
    }
  }, []);

  // Save chat to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cherzi-chat", JSON.stringify(chat));
  }, [chat]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = { user: "You", text: message };
    setChat((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg hover:bg-pink-500"
      >
        💬
      </button>

      {/* Chat box */}
      {isOpen && (
        <div className="w-80 bg-zinc-900 border border-pink-500 text-white p-4 rounded-xl mt-2 max-h-[400px] flex flex-col">
          <h2 className="text-lg font-bold text-pink-400 mb-4">
            🍒 Cherry Chat
          </h2>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1">
            {chat.map((msg, i) => (
              <div key={i} className="flex items-start gap-2">
                <img
                  src="/avatars/default-cherry.png"
                  alt="avatar"
                  className="w-6 h-6 rounded-full"
                />
                <p>
                  <span className="font-bold text-pink-300">{msg.user}:</span>{" "}
                  <span>{msg.text}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
  type="text"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  }}
  placeholder="Type your message..."
  className="flex-grow px-3 py-2 rounded-lg bg-zinc-800 text-white outline-none"
/>
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
