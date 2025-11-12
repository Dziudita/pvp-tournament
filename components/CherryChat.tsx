"use client";
// File: components/CherryChat.tsx
// Drop-in realtime chat powered by Supabase.
// - Floating neon chat button + responsive panel (drawer on mobile, sidebar on desktop)
// - Realtime updates via Postgres Changes
// - Simple nickname (localStorage) or injected wallet address (prop)
// - Tailwind + framer-motion animations to match Cherzi neon style
//
// Usage:
// 1) Create .env.local with:
//    NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
//    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_KEY
// 2) In Supabase SQL editor, run the migration at the bottom of this file (after the component code).
// 3) Import & render <CherryChat room="global" /> once in app/page.tsx (anywhere, it uses fixed positioning).
//    Example: <CherryChat room="arena" userLabel={connectedAddressOrNickname} />
// 4) Ensure @supabase/supabase-js, framer-motion, lucide-react are installed.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User } from "lucide-react";

// --- Supabase client --------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

// --- Types ------------------------------------------------------------------
export type ChatMessage = {
  id: string;
  room: string;
  sender: string;
  content: string;
  created_at: string; // ISO
};

// --- Helpers ----------------------------------------------------------------
function nickFromStorage() {
  if (typeof window === "undefined") return "Guest";
  const key = "cherzi_nick";
  let v = localStorage.getItem(key);
  if (!v) {
    v = `Guest-${Math.random().toString(36).slice(2, 6)}`;
    localStorage.setItem(key, v);
  }
  return v;
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const day = Math.floor(h / 24);
  return `${day}d`;
}

// --- UI Atoms ---------------------------------------------------------------
function NeonGlow({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 ${className}`} />
  );
}

function TextInput({ value, onChange, onKeyDown, placeholder }: any) {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white placeholder-white/40 outline-none"
    />
  );
}

// --- Main Component ---------------------------------------------------------
export function CherryChat({ room = "global", userLabel }: { room?: string; userLabel?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const me = useMemo(() => userLabel || nickFromStorage(), [userLabel]);

  // Initial load
  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("id, room, sender, content, created_at")
        .eq("room", room)
        .order("created_at", { ascending: true })
        .limit(200);
      if (!mounted) return;
      if (!error && data) setMessages(data as ChatMessage[]);
    }
    load();
    return () => { mounted = false; };
  }, [room]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`room:${room}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `room=eq.${room}` },
        (payload: any) => {
          setMessages((cur) => [...cur, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [room]);

  // Auto-scroll on new messages when panel open
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  async function sendMessage() {
    const content = text.trim();
    if (!content) return;
    setText("");
    await supabase.from('chat_messages').insert({ room, sender: me, content });
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 p-4 shadow-[0_0_30px_rgba(255,0,128,0.55)]"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        {/* ping badge */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-500" />
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center md:justify-end"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative m-4 w-[calc(100%-2rem)] rounded-2xl border border-white/10 bg-white/5 p-0 text-white shadow-[0_0_40px_rgba(255,0,128,0.25)] backdrop-blur md:m-6 md:h-[80vh] md:w-[420px]"
            >
              <NeonGlow />
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-600 shadow-[0_0_18px_rgba(255,0,128,0.5)]" />
                  <div className="text-sm font-semibold">CherryChat</div>
                  <div className="ml-2 rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">{room}</div>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-white/10">
                  <X className="h-5 w-5 text-white/80" />
                </button>
              </div>

              {/* Messages */}
              <div ref={listRef} className="h-[55vh] overflow-y-auto p-4 md:h-[calc(80vh-140px)]">
                {messages.length === 0 ? (
                  <div className="mt-10 text-center text-sm text-white/60">No messages yet. Be the first to say hi 👋</div>
                ) : (
                  <ul className="space-y-3">
                    {messages.map((m) => (
                      <li key={m.id} className="group flex items-start gap-3">
                        <div className="mt-1 rounded-md bg-white/10 p-1">
                          <User className="h-4 w-4 text-white/70" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-0.5 text-xs text-white/50">
                            <span className="font-medium text-white/80">{m.sender}</span>
                            <span className="ml-2 text-white/40">{timeAgo(m.created_at)}</span>
                          </div>
                          <div className="whitespace-pre-wrap rounded-xl bg-white/5 px-3 py-2 text-sm text-white/90 ring-1 ring-white/5">
                            {m.content}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Composer */}
              <div className="border-t border-white/10 p-3">
                <div className="flex items-center gap-2">
                  <TextInput
                    value={text}
                    onChange={(e: any) => setText(e.target.value)}
                    onKeyDown={(e: any) => e.key === 'Enter' && sendMessage()}
                    placeholder={`Message as ${me}`}
                  />
                  <button
                    onClick={sendMessage}
                    className="rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 p-3 shadow-[0_0_22px_rgba(255,0,128,0.5)]"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* --------------------------------------------------------------------------
Supabase SQL (run once)
------------------------------------------------------------------------------
-- Enable pgcrypto for gen_random_uuid (if not already enabled)
create extension if not exists pgcrypto;

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  room text not null,
  sender text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

-- RLS policies (public read/write MVP). Tighten later when auth is ready.
create policy "chat_read" on public.chat_messages for select using (true);
create policy "chat_write" on public.chat_messages for insert with check (true);

-- Realtime
-- In Supabase Dashboard > Database > Replication, add a table to Realtime if needed.
-- (New projects usually have it enabled globally.)

*/
