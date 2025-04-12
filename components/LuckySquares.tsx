"use client";

import { useState, useEffect } from "react";

export default function LuckySquares() {
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const resetGame = () => {
    setWinnerIndex(Math.floor(Math.random() * 25));
    setClickedIndex(null);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const handleClick = (index: number) => {
    if (clickedIndex !== null) return; // allow only 1 click per round
    setClickedIndex(index);
  };

  const renderSquare = (index: number) => {
    let classes = "w-16 h-16 sm:w-20 sm:h-20 border-2 flex items-center justify-center text-xl font-bold transition-all rounded-md";

    if (clickedIndex === null) {
      classes += " bg-zinc-800 hover:bg-zinc-700 border-pink-400 cursor-pointer";
    } else if (index === winnerIndex && index === clickedIndex) {
      classes += " bg-green-500 border-green-300 text-white"; // you win
    } else if (index === clickedIndex) {
      classes += " bg-red-500 border-red-300 text-white"; // you lose
    } else if (index === winnerIndex) {
      classes += " bg-green-600 border-green-300 text-white"; // show winner
    } else {
      classes += " bg-zinc-700 border-zinc-600 text-zinc-500";
    }

    return (
      <div
        key={index}
        onClick={() => handleClick(index)}
        className={classes}
      >
        {index === winnerIndex && (clickedIndex !== null) ? "💰" : ""}
        {index === clickedIndex && index !== winnerIndex ? "❌" : ""}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-500 mb-4 drop-shadow-[0_0_10px_#ff4dd6]">
        🎯 Lucky Squares
      </h1>
      <p className="text-zinc-300 mb-6">Click a square and test your luck!</p>
      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: 25 }).map((_, i) => renderSquare(i))}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-3 rounded-lg bg-pink-600 text-white font-bold hover:bg-pink-500 transition shadow-md"
      >
        Play Again
      </button>
    </div>
  );
}
