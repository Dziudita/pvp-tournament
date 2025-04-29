// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {/* GAMES */}
        <div>
          <h3 className="text-pink-400 font-bold mb-3">🎮 GAMES</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>All games</li>
            <li>Dice</li>
            <li>Slots</li>
            <li>Rank system</li>
            <li>Plinko</li>
          </ul>
        </div>

        {/* FEATURES */}
        <div>
          <h3 className="text-pink-400 font-bold mb-3">✨ FEATURES</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Cherry Staking</li>
            <li>XP Leaderboard</li>
            <li>Token Farming</li>
            <li>Daily Cherries</li>
            <li>Affiliate Program</li>
          </ul>
        </div>

        {/* PROMO */}
        <div>
          <h3 className="text-pink-400 font-bold mb-3">🎁 PROMO</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Cherry Drops</li>
            <li>Limited Events</li>
          </ul>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="text-pink-400 font-bold mb-3">📚 ABOUT</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>About Cherry Arena</li>
            <li>Tokenomics</li>
            <li>Team</li>
            <li>Docs & Whitepaper</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-pink-400 font-bold mb-3">📬 CONTACT</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>support@cherzi.com</li>
            <li>partners@cherzi.com</li>
            <li>press@cherzi.com</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="text-pink-400 font-bold mb-3">🛡️ HELP</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Fairness</li>
            <li>Terms & Privacy</li>
            <li>Responsible Gaming</li>
          </ul>
        </div>
      </div>

      {/* LEGAL BOTTOM */}
      <div className="mt-12 border-t border-pink-500 pt-6 text-center text-xs text-gray-400">
        <p>
          🍒 Cherry Arena is a virtual gaming experience. You must be 18+ to join. Play responsibly and enjoy the sweet taste of victory!
        </p>
        <p className="mt-2">© 2025 Cherry Arena. All rights reserved.</p>
      </div>
    </footer>
  );
}
