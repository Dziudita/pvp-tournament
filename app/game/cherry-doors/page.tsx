// app/games/cherry-doors/page.tsx
'use client';

import React from "react";
import VaultDoorsGame from "./VaultDoorsGame";

export default function CherryDoorsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-pink-200 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-700">🍒 Cherry Doors</h1>
      <VaultDoorsGame />
    </main>
  );
}
