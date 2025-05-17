'use client';

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* 🔻 Fiksuota Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* 🔝 Fiksuota Topbar */}
      <Topbar collapsed={collapsed} />

      {/* 🧱 Turinys – paslinktas pagal sidebar plotį */}
      <main className={`pt-16 pb-24 px-6 transition-all duration-300 w-full ${collapsed ? "ml-14" : "ml-48"}`}>
        {children}
      </main>
    </div>
  );
}
