"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaComment } from "react-icons/fa";

export default function CherryChat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Logic for loading messages from Supabase
  }, []);
  
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const sendMessage = async () => {
    if (message.trim()) {
      // Logic to send message to Supabase
      setMessages([...messages, { sender: "You", content: message }]);
      setMessage("");
    }
  };

  return (
    <div>
      {/* Chat button on the right side */}
      <button 
        onClick={toggleChat} 
        className="fixed bottom-5 right-5 bg-pink-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-pink-400"
      >
        <FaComment size={24} />
      </button>

      {/* Chat window */}
      {chatOpen && (
        <div className="fixed bottom-16 right-5 w-96 h-[400px] bg-zinc-900 text-white p-4 rounded-xl shadow-2xl z-50">
          <h3 className="text-xl text-pink-400 font-bold mb-4">🍒 Cherry Chat</h3>

          {/* Display messages */}
          <div className="space-y-2 h-[300px] overflow-y-scroll mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-pink-300">{msg.sender}:</span>
                <span className="text-white">{msg.content}</span>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded-xl bg-zinc-800 text-white outline-none placeholder-pink-300"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-400"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
