// app/game/cherry-doors/page.tsx

import React from "react";
import VaultDoorsGame from "./VaultDoorsGame";

export default function CherryDoorsPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white p-4"
      style={{ backgroundImage: "url('/assets/cherry-doors/palace-bg.png')" }}
    >
      <div className="bg-black/50 p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-500">🍒 Cherry Doors</h1>
        <VaultDoorsGame />
      </div>
    </main>
  );
}
