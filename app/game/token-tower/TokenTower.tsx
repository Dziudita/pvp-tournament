// game/token-tower/TokenTower.tsx

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

    // Paskutinis blokas (tikrinimui ar griuvo)
    const last =
      tower.currentPlayer === 1
        ? updatedTower.player1Blocks.at(-1)
        : updatedTower.player2Blocks.at(-1);

    if (updatedTower.gameOver) {
      if (last?.collapsed) {
        playSound('/sounds/collapse.mp3');
      } else {
        playSound('/sounds/win.mp3');
      }
    }

    setTower(updatedTower);
  };

  const restartGame = () => {
    setTower(createInitialTower());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🗼 Token Tower Duel</h1>

      {/* Bokštai */}
      <div className="flex flex-row gap-12">
        {/* Player 1 (raudonas) */}
        <div className="flex flex-col items-center">
          <h2 className="text-red-400 font-semibold mb-2">Player 1</h2>
          <TowerVisualizer blocks={tower.player1Blocks} player={1} />
        </div>

        {/* Player 2 (mėlynas) */}
        <div className="flex flex-col items-center">
          <h2 className="text-blue-400 font-semibold mb-2">Player 2</h2>
          <TowerVisualizer blocks={tower.player2Blocks} player={2} />
        </div>
      </div>

      {/* 💥 Sprogimo animacija jei griuvo */}
      {tower.gameOver &&
        ((tower.currentPlayer === 1 && tower.player1Blocks.at(-1)?.collapsed) ||
         (tower.currentPlayer === 2 && tower.player2Blocks.at(-1)?.collapsed)) && (
          <CherryExplosion />
        )}

      {/* Veiksmų zona */}
      {tower.gameOver ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="text-xl font-semibold text-green-300">
            🎉 Player {tower.winner} wins!
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
          <button
            onClick={handleMove}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold shadow"
          >
            ➕ Add Block
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenTower;
