'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false); // Fix for hydration mismatches

  // ⏳ Ensure component renders only on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen text-white bg-black overflow-hidden">
      {/* 🔻 Sidebar (fiksuota) */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* 🔝 Topbar (fiksuota viršuje) */}
      <Topbar collapsed={collapsed} />

      {/* 🧱 Turinys – paslinktas priklausomai nuo sidebar būsenos */}
      <main
        className={`pt-16 pb-24 px-6 w-full transition-all duration-300 ${
          collapsed ? "ml-14" : "ml-48"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
