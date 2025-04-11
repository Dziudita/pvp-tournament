import { useEffect, useState } from "react";

export default function NicknameAuthModal() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedNickname = localStorage.getItem("cherzi-nickname");
    const savedPassword = localStorage.getItem("cherzi-password");
    if (savedNickname && savedPassword) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.length >= 3 && password.length >= 6) {
      localStorage.setItem("cherzi-nickname", nickname);
      localStorage.setItem("cherzi-password", password);
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-2xl shadow-lg text-center w-full max-w-sm border-2 border-pink-500"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Create Your Cherry Account 🍒</h2>
        <input
          type="text"
          placeholder="Nickname (min 3 chars)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 p-3 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:opacity-90"
        >
          LET'S GO!
        </button>
      </form>
    </div>
  );
}
