"use client";

import Image from "next/image";

export default function Loader() {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      {/* Logo su švytėjimu */}
      <div className="relative w-36 h-36 animate-pulse drop-shadow-[0_0_25px_#ff00cc]">
        <Image
          src="/public/favicon.ico" // ← naudok savo logotipo kelią (pvz. /assets/cherry-logo.png)
          alt="Cherzi Logo"
          fill
          className="object-contain"
        />
      </div>

      {/* Pavadinimas su švytėjimo efektu */}
      <h1 className="mt-6 text-3xl font-bold text-pink-500 tracking-wide animate-fadeIn">
        CHERZI ARENA
      </h1>

      {/* Subtilus loading tekstas */}
      <p className="mt-2 text-sm text-pink-200 animate-pulse tracking-wider">
        Loading...
      </p>
    </div>
  );
}
