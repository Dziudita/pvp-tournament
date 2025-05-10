// VaultDuel.tsx
import React, { useEffect, useState } from "react";

export default function VaultDuel({ onComplete }: { onComplete: (winner: "player" | "opponent") => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [input, setInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [opponentTime, setOpponentTime] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Generate random 5-digit sequence between 1-9
    const newSeq = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
    setSequence(newSeq);
    setStartTime(Date.now());

    // Simulate opponent solving time (random 3–7 seconds)
    const simOpponentTime = Math.floor(Math.random() * 4000) + 3000;
    setTimeout(() => {
      if (!completed) {
        setOpponentTime(simOpponentTime);
        onComplete("opponent");
      }
    }, simOpponentTime);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === sequence.join("")) {
      const playerTime = Date.now() - (startTime || 0);
      setCompleted(true);
      if (!opponentTime || playerTime < opponentTime) {
        onComplete("player");
      } else {
        onComplete("opponent");
      }
    }
  };

  return (
    <div className="p-4 border rounded bg-purple-100">
      <h2 className="text-lg font-bold mb-2">⚔️ Vault Puzzle Duel</h2>
      <p className="mb-2">Type this number sequence as fast as you can:</p>
      <div className="text-2xl font-mono mb-4">{sequence.join(" ")}</div>
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Type the full sequence here..."
        value={input}
        onChange={handleChange}
        disabled={completed}
      />
    </div>
  );
}
