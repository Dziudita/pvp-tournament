// app/game/cherry-doors/page.tsx

import React from "react";
import VaultDoorsGame from "./VaultDoorsGame";

export default function CherryDoorsPage() {
  return (
    <main
      className="min-h-screen bg-no-repeat bg-top bg-contain flex flex-col items-center justify-start pt-10 text-white"
      style={{
        backgroundImage: "url('/assets/cherry-doors/palace-bg.png')",
        backgroundSize: "100% auto",
      }}
    >
      <h1 className="text-4xl font-bold text-red-500 mb-6">🍒 Cherry Doors</h1>
      <VaultDoorsGame />
    </main>
  );
}
