"use client";

import React from "react";

export default function RulesPage() {
  return (
    <main className="text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-pink-500">📜 Cherzi Arena Rules</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">1. Fair Play</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>No cheating, exploiting, or using bots.</li>
          <li>All games are <span className="text-pink-400 font-bold">provably fair</span> – enjoy honest battles.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">2. Respect the Community</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Respect other players – no insults, threats, or hate speech.</li>
          <li>Toxic behavior may result in a temporary or permanent ban.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">3. One Player – One Account</h2>
        <p>No multiple accounts or fake identities allowed.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">4. Play Responsibly</h2>
        <p>Play for fun – don’t chase losses. Need help? Contact support.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">5. Tokens & Rewards</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>$CHERZI tokens are for in-platform use only.</li>
          <li>Bonuses and prizes are distributed fairly.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">6. Rule Updates</h2>
        <p>We may update rules, but the community will always be informed.</p>
      </section>

      <section className="mt-8 text-pink-400 font-bold text-lg text-center">
        ⚠️ If rules are broken: warnings, suspensions, or bans may apply. Be fierce but fair 💪🍒
      </section>
    </main>
  );
}
