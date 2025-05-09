'use client';
import React, { useState, useEffect } from 'react';
import {
  createInitialTower,
  placeBlock,
  TowerState,
} from './TowerLogic';
import TowerVisualizer from './TowerVisualizer';
import CherryExplosion from './CherryExplosion';
import { playSound } from '@/utils/playSound';

const TokenTower: React.FC = () => {
  const [tower, setTower] = useState<TowerState>(createInitialTower());
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const [matchOver, setMatchOver] = useState(false);

  const handleMove = () => {
    playSound('/sounds/place.mp3');
    const updatedTower = placeBlock(tower);

    const lastBlock =
      tower.currentPlayer === 1
        ? updatedTower.player1Blocks.at(-1)
        : updatedTower.player2Blocks.at(-1);

    if (updatedTower.gameOver) {
      if (lastBlock?.collapsed) {
        playSound('/sounds/collapse.mp3');
      } else {
        playSound('/sounds/win.mp3');
      }
    }

    setTower(updatedTower);
  };

  const handleStop = () => {
    const updatedTower = { ...tower };

    if (tower.currentPlayer === 1) {
      updatedTower.player1Stopped = true;
    } else {
      updatedTower.player2Stopped = true;
    }

    const p1Healthy = updatedTower.player1Blocks.filter(b => !b.collapsed).length;
    const p2Healthy = updatedTower.player2Blocks.filter(b => !b.collapsed).length;

    if (updatedTower.player1Stopped && updatedTower.player2Stopped) {
      updatedTower.gameOver = true;
      updatedTower.winner =
        p1Healthy > p2Healthy
          ? 1
          : p2Healthy > p1Healthy
          ? 2
          : null;
    } else {
      updatedTower.currentPlayer = tower.currentPlayer === 1 ? 2 : 1;
    }

    setTower(updatedTower);
  };

  const restartMatch = () => {
    setTower(createInitialTower());
    setScore({ p1: 0, p2: 0 });
    setRound(1);
    setMatchOver(false);
  };

  const handleRoundEnd = (winner: 1 | 2 | null) => {
    if (winner === 1) {
      setScore(prev => ({ ...prev, p1: prev.p1 + 1 }));
    } else if (winner === 2) {
      setScore(prev => ({ ...prev, p2: prev.p2 + 1 }));
    }

    const nextRound = round + 1;

    if ((winner && (score.p1 === 1 || score.p2 === 1)) || nextRound > 3) {
      setMatchOver(true);
    } else {
      setRound(nextRound);
      setTower(createInitialTower());
    }
  };

  useEffect(() => {
    if (tower.gameOver && !matchOver) {
      setTimeout(() => {
        handleRoundEnd(tower.winner);
      }, 2000);
    }
  }, [tower.gameOver]);

  const isCollapse =
    tower.gameOver &&
    (
      (tower.currentPlayer === 1 && tower.player1Blocks.at(-1)?.collapsed) ||
      (tower.currentPlayer === 2 && tower.player2Blocks.at(-1)?.collapsed)
    );

  const currentPlayerStopped =
    (tower.currentPlayer === 1 && tower.player1Stopped) ||
    (tower.currentPlayer === 2 && tower.player2Stopped);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">🗼 Token Tower Duel</h1>

      {/* Rodyti raundą ir rezultatą */}
      <h2 className="text-lg text-white mb-4">
        Round {round} of 3 — Score: 🟥 {score.p1} : {score.p2} 🟦
      </h2>

      {/* Bokštai */}
      <div className="flex flex-row gap-12">
        <div className="flex flex-col items-center">
          <h2 className="text-red-400 font-semibold mb-2">Player 1</h2>
          <TowerVisualizer blocks={tower.player1Blocks} player={1} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-blue-400 font-semibold mb-2">Player 2</h2>
          <TowerVisualizer blocks={tower.player2Blocks} player={2} />
        </div>
      </div>

      {/* 💥 Animacija jei griuvo */}
      {isCollapse && <CherryExplosion />}

      {/* Pergalė visame mače */}
      {matchOver ? (
        <div className="mt-6 text-center text-2xl text-green-400 font-bold">
          🎉 Match Over! Winner: Player {score.p1 > score.p2 ? 1 : 2}
          <br />
          <button
            onClick={restartMatch}
            className="mt-4 px-5 py-3 bg-green-600 hover:bg-green-700 rounded text-white"
          >
            🔁 Play Again
          </button>
        </div>
      ) : tower.gameOver ? (
        <div className="mt-6 text-xl text-green-300 font-semibold">
          {isCollapse
            ? `💥 Player ${tower.winner} wins by collapse!`
            : tower.winner
            ? `🏆 Player ${tower.winner} wins by score!`
            : `🤝 It's a draw!`}
        </div>
      ) : (
        <div className="mt-6 text-center">
          <p className="mb-3 text-lg">👉 Player {tower.currentPlayer}'s turn</p>

          {!currentPlayerStopped && (
            <>
              <button
                onClick={handleMove}
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold shadow"
              >
                ➕ Add Block
              </button>
              <button
                onClick={handleStop}
                className="mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold shadow"
              >
                🛑 Stop Turn
              </button>
            </>
          )}

          {currentPlayerStopped && (
            <p className="text-sm text-gray-400 mt-2">Player {tower.currentPlayer} has stopped</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenTower;
