import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Coins } from 'lucide-react';
import type { Battle, Pet } from '../types';

interface BattleArenaProps {
  pet: Pet;
  onBattle: (battle: Battle) => void;
}

export const BattleArena: React.FC<BattleArenaProps> = ({ pet, onBattle }) => {
  const battles: Battle[] = [
    {
      id: '1',
      opponent: {
        id: 'cpu1',
        name: 'Rookie Rover',
        level: Math.max(1, pet.level - 1),
        exp: 0,
        health: 80,
        strength: 8,
        wins: 0,
        tokenBalance: 0,
        rarity: 'Common',
        lastBattleTime: 0
      },
      reward: 10,
      difficulty: 'Easy'
    },
    {
      id: '2',
      opponent: {
        id: 'cpu2',
        name: 'Veteran Viper',
        level: pet.level,
        exp: 0,
        health: 100,
        strength: 12,
        wins: 0,
        tokenBalance: 0,
        rarity: 'Rare',
        lastBattleTime: 0
      },
      reward: 25,
      difficulty: 'Medium'
    },
    {
      id: '3',
      opponent: {
        id: 'cpu3',
        name: 'Elite Emperor',
        level: pet.level + 1,
        exp: 0,
        health: 120,
        strength: 15,
        wins: 0,
        tokenBalance: 0,
        rarity: 'Epic',
        lastBattleTime: 0
      },
      reward: 50,
      difficulty: 'Hard'
    }
  ];

  const canBattle = Date.now() - pet.lastBattleTime > 500; // 0.5 seconds cooldown

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Swords className="w-6 h-6 mr-2 text-red-400" />
          Battle Arena
        </h2>
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="font-bold">{pet.tokenBalance} PETS</span>
        </div>
      </div>

      <div className="grid gap-4">
        {battles.map((battle) => (
          <motion.button
            key={battle.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => canBattle && onBattle(battle)}
            disabled={!canBattle}
            className={`w-full bg-white/5 backdrop-blur-lg p-4 rounded-xl flex items-center justify-between ${
              canBattle ? 'hover:bg-white/10' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${battle.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  battle.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'}
              `}>
                <Swords className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold">{battle.opponent.name}</h3>
                <p className="text-sm text-gray-300">Level {battle.opponent.level}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">{battle.reward}</span>
              </div>
              <span className={`text-sm ${
                battle.difficulty === 'Easy' ? 'text-green-400' :
                battle.difficulty === 'Medium' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {battle.difficulty}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {!canBattle && (
        <p className="text-center text-sm text-gray-400">
          Battle cooldown: Please wait 0.5 seconds between battles
        </p>
      )}
    </div>
  );
};