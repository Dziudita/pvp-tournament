// game/token-tower/TowerVisualizer.tsx

'use client';
import React from 'react';
import { Block } from './TowerLogic';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface TowerVisualizerProps {
  blocks: Block[];
}

const TowerVisualizer: React.FC<TowerVisualizerProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col-reverse items-center gap-1 mt-4">
      <AnimatePresence initial={false}>
        {blocks.map((block, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={clsx(
              "w-40 h-8 rounded text-center text-sm font-bold shadow-md border",
              {
                "bg-gray-800 text-red-400 border-red-500 line-through animate-pulse":
                  block.collapsed,
                "bg-gradient-to-r from-green-400 to-green-600 text-black border-green-300":
                  !block.collapsed && block.type === 'stable',
                "bg-gradient-to-r from-red-500 to-red-700 text-white border-red-300 animate-pulse":
                  !block.collapsed && block.type === 'risky',
              }
            )}
          >
            {block.collapsed
              ? `💥 COLLAPSED by P${block.player}`
              : `${block.type.toUpperCase()} by P${block.player}`}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TowerVisualizer;
