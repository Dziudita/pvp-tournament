// game/token-tower/TowerVisualizer.tsx

'use client';
import React from 'react';
import { Block } from './TowerLogic';
import { motion, AnimatePresence } from 'framer-motion';

interface TowerVisualizerProps {
  blocks: Block[];
  player: 1 | 2;
}

const TowerVisualizer: React.FC<TowerVisualizerProps> = ({ blocks, player }) => {
  return (
    <div className="flex flex-col-reverse items-center gap-1 mt-4">
      <AnimatePresence initial={false}>
        {blocks.map((block, index) => {
          let imageSrc = "/images/cherry-stable.png"; // default

          if (block.collapsed) {
            imageSrc = "/images/cherry-broken.png";
          } else if (player === 1) {
            imageSrc = "/images/cherry-stable.png"; // raudona
          } else if (player === 2) {
            imageSrc = "/images/cherry-risky.png"; // mėlyna
          }

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
                className={`w-full h-full object-contain ${
                  block.collapsed ? 'animate-pulse' : ''
                }`}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TowerVisualizer;
