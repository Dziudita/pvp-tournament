'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ⏳ Fix hydration issue (SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen text-white overflow-hidden">
      {/* 🔻 Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* 🔝 Topbar */}
      <Topbar collapsed={collapsed} />

      {/* 🧱 Turinys */}
      <main
        className={`pt-16 pb-24 px-6 w-full transition-all duration-300 bg-transparent ${
          collapsed ? "ml-14" : "ml-48"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
