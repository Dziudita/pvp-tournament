// game/token-tower/TowerVisualizer.tsx

import React from 'react';
import { Block } from './TowerLogic';

interface TowerVisualizerProps {
  blocks: Block[];
}

const TowerVisualizer: React.FC<TowerVisualizerProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col-reverse items-center gap-1 mt-4">
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`w-40 h-6 rounded text-center text-sm font-bold shadow ${
            block.collapsed
              ? 'bg-gray-800 text-red-500 line-through'
              : block.type === 'stable'
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        >
          {block.collapsed
            ? `💥 COLLAPSED by P${block.player}`
            : `${block.type.toUpperCase()} by P${block.player}`}
        </div>
      ))}
    </div>
  );
};

export default TowerVisualizer;
