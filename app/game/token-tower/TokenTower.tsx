// game/token-tower/TokenTower.tsx

'use client';
import React, { useState } from 'react';
import { createInitialTower, placeBlock, TowerState, BlockType } from './TowerLogic';
import PlayerControls from './PlayerControls';
import TowerVisualizer from './TowerVisualizer';

const TokenTower: React.FC = () => {
  const [tower, setTower] = useState<TowerState>(createInitialTower());

  const handleMove = (type: BlockType) => {
    const updatedTower = placeBlock(tower, type);
    setTower(updatedTower);
  };

  const restartGame = () => {
    setTower(createInitialTower());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🗼 Token Tower</h1>

      <TowerVisualizer blocks={tower.blocks} />

      {tower.gameOver ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="text-xl font-semibold text-red-400">
            💥 Player {tower.winner} wins!
          </div>
          <button
            onClick={restartGame}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow"
          >
            🔄 Restart Game
          </button>
        </div>
      ) : (
        <PlayerControls currentPlayer={tower.currentPlayer} onMove={handleMove} />
      )}
    </div>
  );
};

export default TokenTower;
