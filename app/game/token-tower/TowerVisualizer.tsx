// game/token-tower/TowerVisualizer.tsx

'use client';
import React from 'react';
import { Block } from './TowerLogic';
import { motion, AnimatePresence } from 'framer-motion';

interface TowerVisualizerProps {
  blocks: Block[];
}

const TowerVisualizer: React.FC<TowerVisualizerProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col-reverse items-center gap-1 mt-4">
      <AnimatePresence initial={false}>
        {blocks.map((block, index) => {
          const imageSrc = block.collapsed
            ? "/images/cherry-broken.png"
            : block.type === "stable"
            ? "/images/cherry-stable.png"
            : "/images/cherry-risky.png";

          return (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-16 h-16 flex items-center justify-center"
            >
              <img
                src={imageSrc}
                alt="Cherry Block"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TowerVisualizer;
