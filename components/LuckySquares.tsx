"use client";

import { useState, useEffect } from "react";

export default function LuckySquares() {
  const [squares, setSquares] = useState<string[]>(Array(25).fill(""));
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [winnerIndex, setWinnerIndex] = useState<number>(-1);

  useEffect(() => {
    setWinnerIndex(Math.floor(Math.random() * 25));
  }, []);

  const handleClick = (index: number) => {
    if (clickedIndex !== null) return; // Only allow one click
    setClickedIndex(index);

    const newSquares = [...squares];
    if (index === winnerIndex) {
      newSquares[index] = "💰";
    } else {
      newSquares[index] = "❌";
      newSquares[winnerIndex] = "💰";
    }
    setSquares(newSquares);
  };

  const resetGame = () => {
    setSquares(Array(25).fill(""));
    setClickedIndex(null);
    setWinnerIndex(Math.floor(Math.random() * 25));
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-pink-400 mb-4">🎯 Lucky Squares</h2>
      <p className="text-pink-200 mb-6">Click a square and test your luck!</p>

      <div className="grid grid-cols-5 gap-4 justify-center max-w-md mx-auto">
        {squares.map((val, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center rounded-md text-2xl font-bold cursor-pointer transition-all duration-300
              ${clickedIndex === index && index === winnerIndex ? "bg-green-500" : ""}
              ${clickedIndex === index && index !== winnerIndex ? "bg-red-500" : ""}
              ${clickedIndex !== null && index === winnerIndex && clickedIndex !== index ? "bg-green-500" : ""}
              ${val === "" ? "bg-zinc-800 hover:bg-zinc-700" : ""}
            `}
            onClick={() => handleClick(index)}
          >
            {val}
          </div>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-500 transition shadow-lg"
      >
        🔄 Play Again
      </button>
    </div>
  );
}
