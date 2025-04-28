"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaComment } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function CherryChat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ nickname: "User", avatar: "/avatars/default.png" });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch user info + messages
  useEffect(() => {
    const fetchUserAndMessages = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      let nickname = localStorage.getItem("cherzi-nick") || "User";
      let avatar = localStorage.getItem("cherzi-avatar") || "/avatars/default.png";

      if (userId) {
        const { data: profile } = await supabase
          .from("users")
          .select("nickname, avatar")
          .eq("id", userId)
          .single();

       if (profile) {
  nickname = profile.nickname || nickname;
  avatar = profile.avatar || avatar;

          // Saugojimas į localStorage
          localStorage.setItem("cherzi-nick", nickname);
          localStorage.setItem("cherzi-avatar", avatar);
        }
      }

      setUserInfo({ nickname, avatar });

      // Fetch messages
      const { data: chatData, error } = await supabase
        .from("chat_messages")
        .select("*")
        .order("timestamp", { ascending: true });

      if (!error) setMessages(chatData || []);
    };

    fetchUserAndMessages();

    // Realtime Broadcast ir DB changes
    const chatChannel = supabase.channel('cherry-chat-broadcast');

    chatChannel
      .on('broadcast', { event: 'new-message' }, (payload) => {
        setMessages((prev) => [...prev, payload.payload]);
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(chatChannel);
    };
  }, []);

  // Scroll į apačią
  useEffect(() => {
    if (chatOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  // Siunčiam žinutę į Supabase ir Broadcastinam
  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const { nickname, avatar } = userInfo;

    const newChat = { avatar, nickname, message: newMessage, timestamp: Date.now() };

    const { error } = await supabase
      .from("chat_messages")
      .insert([newChat]);

    // Broadcast visiems langams
    await supabase
      .channel('cherry-chat-broadcast')
      .send({
        type: 'broadcast',
        event: 'new-message',
        payload: newChat,
      });

    if (!error) {
      setNewMessage("");
    }
  };

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
              <div key={msg.timestamp} className="flex items-start gap-3">
                <Image src={msg.avatar} alt="avatar" width={32} height={32} className="rounded-full" />
                <div>
                  <p className="text-sm text-pink-300 font-semibold">{msg.nickname}</p>
                  <div className="bg-zinc-800 px-3 py-2 rounded-xl text-sm text-white max-w-[240px] break-words">
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <div className="border-t border-zinc-700 p-3 bg-zinc-900 flex items-center gap-2 relative">
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
