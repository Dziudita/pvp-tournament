// game/token-tower/TokenTower.tsx

'use client';
import React, { useState } from 'react';
import { createInitialTower, placeBlock, TowerState, BlockType } from './TowerLogic';
import PlayerControls from './PlayerControls';
import TowerVisualizer from './TowerVisualizer';
import CherryExplosion from './CherryExplosion';
import { playSound } from '@/utils/playSound';

const TokenTower: React.FC = () => {
  const [tower, setTower] = useState<TowerState>(createInitialTower());

  const handleMove = (type: BlockType) => {
    playSound('/sounds/place.mp3'); // 🎵 garsas kai pastatoma kaladėlė

    const updatedTower = placeBlock(tower, type);

    if (updatedTower.gameOver) {
      const last = updatedTower.blocks.at(-1);
      if (last?.collapsed) {
        playSound('/sounds/collapse.mp3'); // 💥 garsas griuvimui
      } else if (updatedTower.winner !== null) {
        playSound('/sounds/win.mp3'); // 🏆 pergalės garsas
      }
    }

    setTower(updatedTower);
  };

  const restartGame = () => {
    setTower(createInitialTower());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🗼 Token Tower</h1>

      <TowerVisualizer blocks={tower.blocks} />

      {/* 💥 Cherry explosion jei žaidimas baigtas dėl griuvimo */}
      {tower.gameOver && tower.winner !== null && tower.blocks.at(-1)?.collapsed && (
        <CherryExplosion />
      )}

      {tower.gameOver ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="text-xl font-semibold text-red-400">
            💥 Player {tower.winner !== null ? tower.winner : '🤝 Draw'} wins!
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
