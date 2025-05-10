// VaultDoorsGame.tsx
import React, { useState } from "react";

const doorLabels = ["Door 1", "Door 2", "Door 3", "Door 4", "Door 5"];

export default function VaultDoorsGame() {
  const [playerChoice, setPlayerChoice] = useState<number | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<number | null>(null);
  const [winnerDoor, setWinnerDoor] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");
  const [vault, setVault] = useState<number>(0);
  const [goldKeyChance, setGoldKeyChance] = useState<number>(Math.floor(Math.random() * 10)); // 1/10 chance

  const startGame = () => {
    const newWinnerDoor = Math.floor(Math.random() * 5); // 0 to 4
    const newOpponentChoice = Math.floor(Math.random() * 5);
    const goldKeyDrop = Math.floor(Math.random() * 10) === goldKeyChance;

    setWinnerDoor(newWinnerDoor);
    setOpponentChoice(newOpponentChoice);

    if (playerChoice === null) return;

    // Both players chose wrong
    if (playerChoice !== newWinnerDoor && newOpponentChoice !== newWinnerDoor) {
      setVault(vault + 2); // both lost their 1 USDC
      setResult("Both lost. Vault increased!");
    }
    // Both chose correctly
    else if (playerChoice === newWinnerDoor && newOpponentChoice === newWinnerDoor) {
      setResult("Both chose the winner! You both get your stake back.");
    }
    // You won
    else if (playerChoice === newWinnerDoor) {
      setResult("You win the match and take the pot!");
    }
    // Opponent won
    else if (newOpponentChoice === newWinnerDoor) {
      setResult("Opponent wins this round.");
    }

    if (goldKeyDrop && playerChoice !== null) {
      setResult((prev) => prev + " \nGOLD KEY DROPPED! You can unlock the Vault!");
      // Implement Vault unlock logic here
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Vault Doors Game</h1>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {doorLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => setPlayerChoice(index)}
            className={`p-4 border rounded ${playerChoice === index ? "bg-green-300" : "bg-gray-200"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={startGame}
        disabled={playerChoice === null}
        className="px-6 py-2 bg-blue-500 text-white rounded"
      >
        Confirm Choice
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-yellow-100">
          <p><strong>Result:</strong> {result}</p>
        </div>
      )}

      <div className="mt-4 text-lg">
        <p>💰 Vault Balance: {vault} USDC</p>
        <p>🎯 Winner Door: {winnerDoor !== null ? doorLabels[winnerDoor] : "?"}</p>
        <p>🤖 Opponent chose: {opponentChoice !== null ? doorLabels[opponentChoice] : "?"}</p>
      </div>
    </div>
  );
}
