'use client';
import React, { useState } from 'react';
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

  const restartGame = () => {
    setTower(createInitialTower());
  };

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
      <h1 className="text-4xl font-bold mb-6">🗼 Token Tower Duel</h1>

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

      {/* 💥 Animacija */}
      {isCollapse && <CherryExplosion />}

      {/* Veiksmų zona */}
      {tower.gameOver ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="text-xl font-semibold text-green-300">
            {isCollapse
              ? `💥 Player ${tower.winner} wins by collapse!`
              : tower.winner
              ? `🏆 Player ${tower.winner} wins by score!`
              : `🤝 It's a draw!`}
          </div>
          <button
            onClick={restartGame}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow"
          >
            🔄 Restart Game
          </button>
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
