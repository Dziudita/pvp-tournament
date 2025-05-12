"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Viršutinė juosta */}
      <Topbar collapsed={collapsed} />

      {/* Apatinė sritis su Sidebar ir turiniu */}
      <div className="pt-16 flex">
        {/* Šoninė juosta */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Turinys */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
