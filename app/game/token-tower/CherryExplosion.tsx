// game/token-tower/CherryExplosion.tsx

'use client';
import { motion } from 'framer-motion';
import React from 'react';

const CherryExplosion: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1.5, opacity: 1 }}
      exit={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="text-8xl animate-ping-slow">🍒💥</div>
    </motion.div>
  );
};

export default CherryExplosion;
