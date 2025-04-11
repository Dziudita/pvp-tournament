"use client";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-extrabold text-pink-500 mb-6 drop-shadow-[0_0_15px_#ff4dd6]">
        🏆 About Cherzi Arena
      </h1>
      <p className="text-lg text-zinc-300 leading-relaxed mb-6">
        <strong>Cherzi Arena</strong> is an interactive, neon-styled gaming platform where players face off in <strong>1v1 duels</strong> and <strong>daily tournaments</strong> to prove their reflexes and skills.
      </p>
      <p className="text-lg text-zinc-300 leading-relaxed mb-6">
        🕹️ Every win brings you closer to the <strong>Top Players of the Day</strong>, and every player joins with their <strong>wallet balance</strong>, chosen <strong>avatar</strong>, and <strong>nickname</strong>.
      </p>
      <p className="text-lg text-zinc-300 leading-relaxed mb-6">
        🎯 <strong>Features</strong>:
        <ul className="list-disc list-inside mt-2">
          <li>Real-time tournaments and duels</li>
          <li>Daily leaderboard</li>
          <li>Sleek neon design</li>
          <li>Avatars, animations & in-game chat</li>
          <li>Wallet integration and balance display</li>
        </ul>
      </p>
      <p className="text-lg text-pink-300 font-semibold mt-8">
        🍒 Join the cherry clash and rise to glory in Cherzi Arena!
      </p>
    </div>
  );
}
