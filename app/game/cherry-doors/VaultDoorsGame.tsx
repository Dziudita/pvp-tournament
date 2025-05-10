// VaultDoorsGame.tsx
'use client';

import React, { useState } from "react";
import VaultDuel from "./VaultDuel";

const doorLabels = ["Door 1", "Door 2", "Door 3", "Door 4", "Door 5"];

export default function VaultDoorsGame() {
  const [playerChoice, setPlayerChoice] = useState<number | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<number | null>(null);
  const [winnerDoor, setWinnerDoor] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");
  const [vault, setVault] = useState<number>(0);
  const [goldKeyChance, setGoldKeyChance] = useState<number>(Math.floor(Math.random() * 10));
  const [showDuel, setShowDuel] = useState(false);
  const [duelWinner, setDuelWinner] = useState<"player" | "opponent" | null>(null);
  const [opened, setOpened] = useState<boolean[]>([false, false, false, false, false]);

  const startGame = () => {
    const newWinnerDoor = Math.floor(Math.random() * 5);
    const newOpponentChoice = Math.floor(Math.random() * 5);
    const goldKeyDrop = Math.floor(Math.random() * 10) === goldKeyChance;

    setWinnerDoor(newWinnerDoor);
    setOpponentChoice(newOpponentChoice);

    const newOpened = [false, false, false, false, false];
    newOpened[newWinnerDoor] = true;
    setOpened(newOpened);

    if (playerChoice === null) return;

    if (playerChoice !== newWinnerDoor && newOpponentChoice !== newWinnerDoor) {
      setVault(vault + 2);
      setResult("Both lost. Vault increased!");
    } else if (playerChoice === newWinnerDoor && newOpponentChoice === newWinnerDoor) {
      setResult("Both chose the winner! You both get your stake back.");
    } else if (playerChoice === newWinnerDoor) {
      setResult("You win the match and take the pot!");
    } else if (newOpponentChoice === newWinnerDoor) {
      setResult("Opponent wins this round.");
    }

    if (goldKeyDrop && playerChoice !== null) {
      const opponentAlsoGetsGold = Math.random() < 0.5;

      if (opponentAlsoGetsGold) {
        setShowDuel(true);
        setResult("Both players got a GOLD KEY! Starting puzzle duel...");
      } else {
        setResult("🎉 You got the GOLD KEY and unlocked the Vault! You win " + vault + " USDC!");
        setVault(0);
      }
    }

    setTimeout(() => {
      setOpened([false, false, false, false, false]);
      setPlayerChoice(null);
    }, 3000);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Vault Doors Game</h1>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {doorLabels.map((label, index) => (
          <div
            key={index}
            onClick={() => setPlayerChoice(index)}
            className={`cursor-pointer transition-transform transform hover:scale-105 ${
              playerChoice === index ? "ring-4 ring-green-400" : ""
            }`}
          >
            <img
              src={opened[index] ? "/assets/cherry-doors/door-open.png" : "/assets/cherry-doors/door.png"}
              alt={label}
              className="w-24 h-36 object-cover rounded shadow"
            />
          </div>
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

      {showDuel && (
        <VaultDuel
          onComplete={(winner) => {
            setDuelWinner(winner);
            setShowDuel(false);
            if (winner === "player") {
              setResult("🏆 You won the puzzle duel and claimed " + vault + " USDC from the Vault!");
            } else {
              setResult("😢 Opponent was faster. You lost the Vault Duel.");
            }
            setVault(0);
          }}
        />
      )}

      <div className="mt-4 text-lg">
        <p>💰 Vault Balance: {vault} USDC</p>
        <p>🎯 Winner Door: {winnerDoor !== null ? doorLabels[winnerDoor] : "?"}</p>
        <p>🤖 Opponent chose: {opponentChoice !== null ? doorLabels[opponentChoice] : "?"}</p>
      </div>
    </div>
  );
}
