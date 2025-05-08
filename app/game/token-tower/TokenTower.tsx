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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">🗼 Token Tower</h1>

      <TowerVisualizer blocks={tower.blocks} />

      {tower.gameOver ? (
        <div className="mt-6 text-xl font-semibold text-red-500">
          Player {tower.winner} wins! 💥
        </div>
      ) : (
        <PlayerControls currentPlayer={tower.currentPlayer} onMove={handleMove} />
      )}
    </div>
  );
};

export default TokenTower;
