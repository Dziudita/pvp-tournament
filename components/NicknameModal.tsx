import { useEffect, useState } from "react";

export default function NicknameModal() {
  const [nickname, setNickname] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cherzi-nickname");
    if (stored) {
      setNickname(stored);
      setSaved(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim().length < 3) return;
    localStorage.setItem("cherzi-nickname", nickname);
    setSaved(true);
  };

  if (saved) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border-2 border-pink-500"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-white tracking-wide">
          Welcome to <span className="text-pink-500">CHERZI ARENA</span>
        </h2>
        <p className="text-zinc-400 mb-4 text-sm">
          Pick your cherry name to enter the arena 🍒
        </p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="e.g. CherryFighter69"
          className="w-full p-3 rounded-xl bg-zinc-800 text-white text-center focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-zinc-500"
        />
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-bold tracking-wide shadow-md"
        >
          LET'S GO 🍒
        </button>
      </form>
    </div>
  );
}
