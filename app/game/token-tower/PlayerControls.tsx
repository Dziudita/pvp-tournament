// game/token-tower/PlayerControls.tsx

import React from 'react';
import { BlockType } from './TowerLogic';

interface PlayerControlsProps {
  currentPlayer: number;
  onMove: (type: BlockType) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ currentPlayer, onMove }) => {
  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="mb-4 text-lg">🎮 Player {currentPlayer}'s turn</p>
      <div className="flex gap-4">
        <button
          onClick={() => onMove('stable')}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow font-semibold"
        >
          🧱 Stable Block
        </button>
        <button
          onClick={() => onMove('risky')}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg shadow font-semibold"
        >
          💣 Risky Block
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
