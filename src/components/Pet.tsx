import React from 'react';
import { motion } from 'framer-motion';
import { Dog, Crown, Star } from 'lucide-react';
import type { Pet as PetType } from '../types';

interface PetProps {
  pet: PetType;
}

export const Pet: React.FC<PetProps> = ({ pet }) => {
  const rarityColors = {
    Common: 'from-gray-400 to-gray-500',
    Rare: 'from-blue-400 to-blue-500',
    Epic: 'from-purple-400 to-purple-500',
    Legendary: 'from-yellow-400 to-yellow-500'
  };

  return (
    <div className="text-center">
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`w-32 h-32 mx-auto bg-gradient-to-br ${rarityColors[pet.rarity]} rounded-full flex items-center justify-center mb-4`}
        >
          <Dog className="w-16 h-16 text-white" />
        </motion.div>
        
        <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-2">
          <Crown className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-2 mb-2">
        <h2 className="text-2xl font-bold">{pet.name}</h2>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium">{pet.wins}</span>
        </div>
      </div>
      
      <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-medium mb-4">
        {pet.rarity}
      </div>
      
      <div className="space-y-2">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-purple-500">
                EXP
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block">
                {pet.exp % 100}/100
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-purple-200">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${(pet.exp % 100)}%` }}
              transition={{ duration: 0.5 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};