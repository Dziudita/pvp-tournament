// app/game/cherry-doors/page.tsx

import React from "react";
import VaultDoorsGame from "./VaultDoorsGame";

export default function CherryDoorsPage() {
  return (
    <main
  className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-start text-white pt-10"
  style={{
    backgroundImage: "url('/assets/cherry-doors/palace-bg.png')"
  }}
>
  {/* Tamsus permatomas overlay */}
  <div className="absolute inset-0 bg-black/60 z-0" />

  {/* Visa kita – durys, logotipas, ir pan. */}
  <div className="relative z-10 flex flex-col items-center">
    <img
      src="/assets/cherry-doors/cherry-doors-logo.png"
      alt="Cherry Doors Logo"
      className="w-64 h-auto mb-4"
    />

      <VaultDoorsGame />
    </main>
  );
}
