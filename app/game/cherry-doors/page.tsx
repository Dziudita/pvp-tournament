// app/game/cherry-doors/page.tsx

import React from "react";
import VaultDoorsGame from "./VaultDoorsGame";

export default function CherryDoorsPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start text-white pt-10"
      style={{
        backgroundImage: "url('/assets/cherry-doors/palace-bg.png')"
      }}
    >
      <h1 className="text-4xl font-bold text-red-500 mb-6">🍒 Cherry Doors</h1>
      <VaultDoorsGame />
    </main>
  );
}
