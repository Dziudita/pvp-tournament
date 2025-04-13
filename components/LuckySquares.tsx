"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LuckySquares() {
  const [squares, setSquares] = useState<number[]>([]);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  useEffect(() => {
    const arr = Array.from({ length: 20 }, (_, i) => i); // ← 20 vietoje 25
    setSquares(arr);
    setWinnerIndex(Math.floor(Math.random() * 20));
  }, []);

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  const handleClick = (index: number) => {
    if (clickedIndex !== null) return;
    setClickedIndex(index);
    playSound("/sounds/click.mp3");

    if (index === winnerIndex) {
      playSound("/sounds/win.mp3");
    } else {
      playSound("/sounds/lose.mp3");
    }
  };

  const resetGame = () => {
    setWinnerIndex(Math.floor(Math.random() * 20));
    setClickedIndex(null);
  };

  return (
    <div className="text-center flex flex-col items-center">
      <div className="p-4 rounded-2xl ring-4 ring-pink-500 shadow-xl bg-black/40">
        <div className="grid grid-cols-5 gap-3 justify-center">
          {squares.map((_, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`w-16 h-16 cursor-pointer flex items-center justify-center border-2 border-zinc-600 rounded-xl text-2xl transition
                ${
                  clickedIndex === index && index === winnerIndex
                    ? "bg-green-500"
                    : clickedIndex === index
                    ? "bg-red-500"
                    : "bg-zinc-700 hover:bg-pink-400"
                }`}
            >
              {clickedIndex !== null && index === winnerIndex ? (
                <Image
                  src="/assets/glowing-cherry-bag.png"
                  alt="Cherry Bag"
                  width={36}
                  height={36}
                />
              ) : ""}
              {clickedIndex === index && index !== winnerIndex ? "❌" : ""}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg font-bold text-white"
      >
        Play Again
      </button>
    </div>
  );
}
