"use client";
import React from "react";
import { motion } from "framer-motion";
import { Trophy, Gamepad2, BookText, Info, HelpCircle, Wallet, LogOut } from "lucide-react";

/**
 * CHERZI ARENA — Neon Royale Web3 redesign
 * - Clean, mature neon style (cherry pink + cyber cyan accents)
 * - Glassmorphism cards, depth, subtle particles, hover pulses
 * - Ready for wallet/status injection
 *
 * Tailwind tips (ensure enabled):
 * - bg-clip-padding/backdrop-blur require proper Tailwind config but work by default on modern setups.
 * - Uses arbitrary shadows like shadow-[0_0_40px_rgba(255,0,128,0.35)] for neon glow.
 */

const navItems = [
  { icon: Gamepad2, label: "Games" },
  { icon: BookText, label: "Rules" },
  { icon: Info, label: "About" },
  { icon: HelpCircle, label: "Support" },
  { icon: Wallet, label: "Wallet" },
];

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "relative rounded-2xl border border-pink-500/20 bg-white/5 backdrop-blur-md " +
        "shadow-[0_0_30px_rgba(255,0,128,0.18)] " +
        className
      }
    >
      {/* inner border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
      {children}
    </div>
  );
}

function NeonButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={
        "relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold tracking-wide " +
        "bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white " +
        "shadow-[0_0_25px_rgba(255,0,128,0.45)] hover:shadow-[0_0_40px_rgba(255,0,128,0.6)] " +
        "transition-shadow " +
        className
      }
    >
      <span className="relative z-10">{children}</span>
      {/* soft outer glow */}
      <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-fuchsia-600/20 blur-md" />
    </motion.button>
  );
}

function WalletChip() {
  // Replace with actual wallet state (ENS/address/balance)
  const address = "0x12...CHeRZ";
  const balance = "$0.00";
  return (
    <GlowCard className="flex items-center gap-3 px-4 py-2">
      <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
      <div className="text-sm text-white/90">{address}</div>
      <div className="ml-auto rounded-lg bg-white/10 px-2 py-1 text-xs text-white/80">{balance}</div>
    </GlowCard>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-white/10 bg-black/40 p-4 backdrop-blur-lg md:block">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 shadow-[0_0_24px_rgba(255,0,128,0.5)]" />
        <span className="font-semibold tracking-wide text-white">Cherzi</span>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <item.icon className="h-4 w-4 text-white/50 transition group-hover:text-pink-300" />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="mt-4">
        <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-rose-300/80 transition hover:bg-rose-500/10 hover:text-rose-200">
          <LogOut className="h-4 w-4" /> Logout
        </a>
      </div>

      <div className="mt-8">
        <GlowCard className="p-4">
          <p className="text-xs uppercase tracking-wider text-white/50">Bonus</p>
          <p className="mt-1 text-sm font-medium text-white">Claim your daily 🍒</p>
          <NeonButton className="mt-3 w-full">Claim</NeonButton>
        </GlowCard>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2 md:hidden">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 shadow-[0_0_24px_rgba(255,0,128,0.5)]" />
          <span className="text-sm font-semibold tracking-wide text-white">Cherzi Arena</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 backdrop-blur md:flex">
            <input
              placeholder="Search..."
              className="w-56 bg-transparent text-white/80 placeholder-white/40 outline-none"
            />
          </div>
          <WalletChip />
        </div>
      </div>
    </header>
  );
}

function TournamentHero() {
  return (
    <GlowCard className="relative overflow-hidden p-6 md:p-10">
      {/* background cherry aura */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-600/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
            Cherzi Arena Tournament
          </h1>
          <p className="mt-2 max-w-lg text-white/70">
            Enter the arena. Climb the leaderboard. Win CHERZ. Real Web3 competition with provably fair matches.
          </p>
        </div>
        <NeonButton className="mt-2 md:mt-0">
          <Trophy className="mr-2 h-5 w-5" /> Join Tournament
        </NeonButton>
      </div>
    </GlowCard>
  );
}

function TopPlayersCard() {
  return (
    <GlowCard className="p-5">
      <div className="flex items-center gap-2">
        <span className="text-lg">🏆</span>
        <h3 className="text-lg font-semibold text-white">Top Players Today</h3>
      </div>
      <p className="mt-2 text-sm text-white/60">No players yet today.</p>
      {/* Placeholder for future table */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        The board auto-updates every 30 minutes.
      </div>
    </GlowCard>
  );
}

function ParticlesBackdrop() {
  // Decorative starfield / particles using CSS only (no heavy libs)
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,128,0.10),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,255,255,0.06),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(255,0,128,0.08),transparent_40%)]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml;utf8, %3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%275%27 cy=%275%27 r=%271%27 fill=%27white%27/%3E%3C/svg%3E')" }} />
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0710] via-[#0a0613] to-[#05030a] text-white">
      <ParticlesBackdrop />
      <Header />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <Sidebar />
        <main className="flex-1 space-y-6">
          <TournamentHero />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <TopPlayersCard />
            {/* Right column widgets */}
            <GlowCard className="p-5 lg:col-span-2">
              <h3 className="text-lg font-semibold text-white">Live Activity</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span>🍒 0x9a...7B12 joined the arena</span>
                  <span className="text-white/50">a moment ago</span>
                </li>
                <li className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span>🍒 0x3f...E21 cashed +12 CHERZ</span>
                  <span className="text-white/50">2m</span>
                </li>
                <li className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span>🍒 0x12...CHeRZ staked 100 CHERZ</span>
                  <span className="text-white/50">5m</span>
                </li>
              </ul>
            </GlowCard>
          </div>
        </main>
      </div>
      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Cherzi • Built for the Arena
      </footer>
    </div>
  );
}
