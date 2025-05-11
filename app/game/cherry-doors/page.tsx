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
      <img
  src="/assets/cherry-doors/cherry-doors-logo.png"
  alt="Cherry Doors Logo"
  className="w-64 h-auto mb-4"
/>

      <VaultDoorsGame />
    </main>
  );
}
