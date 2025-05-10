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
  const [isWaiting, setIsWaiting] = useState(false);

  const startGame = () => {
    if (playerChoice === null) return;
    setIsWaiting(true);
    setTimeout(() => {
      const newWinnerDoor = Math.floor(Math.random() * 5);
      const newOpponentChoice = Math.floor(Math.random() * 5);
      const goldKeyDrop = Math.floor(Math.random() * 10) === goldKeyChance;

      setWinnerDoor(newWinnerDoor);
      setOpponentChoice(newOpponentChoice);
      setIsWaiting(false);

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
    }, 3000);
  };

  return (
    <div className="w-full flex flex-col items-center mt-24 relative">
      <button
        onClick={startGame}
        disabled={playerChoice === null || isWaiting}
        className="mb-6 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Confirm Choice
      </button>

      <div className="flex gap-10 justify-center items-end mb-6">
        {doorLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => setPlayerChoice(index)}
            disabled={isWaiting}
            className={`h-40 w-auto transition-transform transform hover:scale-105 ${
              playerChoice === index ? "scale-110" : ""
            }`}
          >
            <img
              src={
                winnerDoor !== null && winnerDoor === index
                  ? "/assets/cherry-doors/door-open.png"
                  : "/assets/cherry-doors/door.png"
              }
              alt={`Door ${index + 1}`}
              className="h-full drop-shadow-lg"
            />
          </button>
        ))}
      </div>

      {isWaiting && (
        <div className="text-yellow-300 text-xl font-semibold mt-4 animate-pulse">
          ⏳ Waiting for your opponent to choose...
        </div>
      )}

      {result && !isWaiting && (
        <div className="mt-4 p-4 border rounded bg-yellow-100 text-black">
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

      {/* Jackpot Vault Image */}
      <img
        src="/assets/cherry-doors/vault.png"
        alt="Vault"
        className="absolute right-10 bottom-0 w-24 h-auto drop-shadow-xl"
      />
    </div>
  );
}
