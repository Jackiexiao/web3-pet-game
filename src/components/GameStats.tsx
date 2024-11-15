import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Zap } from 'lucide-react';

interface GameStatsProps {
  pet: {
    strength: number;
    health: number;
    level: number;
  };
}

export const GameStats: React.FC<GameStatsProps> = ({ pet }) => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/5 rounded-xl p-4 text-center"
      >
        <Sword className="w-6 h-6 mx-auto mb-2 text-red-400" />
        <p className="text-sm font-medium">Strength</p>
        <p className="text-lg font-bold">{pet.strength}</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/5 rounded-xl p-4 text-center"
      >
        <Shield className="w-6 h-6 mx-auto mb-2 text-blue-400" />
        <p className="text-sm font-medium">Defense</p>
        <p className="text-lg font-bold">{Math.floor(pet.level * 1.5)}</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/5 rounded-xl p-4 text-center"
      >
        <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
        <p className="text-sm font-medium">Speed</p>
        <p className="text-lg font-bold">{Math.floor(pet.level * 2)}</p>
      </motion.div>
    </div>
  );
};