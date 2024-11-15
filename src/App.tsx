import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Heart, Coins } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';
import { Pet } from './components/Pet';
import { ConnectWallet } from './components/ConnectWallet';
import { GameStats } from './components/GameStats';
import { MintPet } from './components/MintPet';
import { BattleArena } from './components/BattleArena';
import { Training } from './components/Training';
import { Inventory } from './components/Inventory';
import { Achievements } from './components/Achievements';
import type { Pet as PetType, Battle, Item, Achievement } from './types';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pet, setPet] = useState<PetType | null>(null);

  const handleConnect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        toast.success('Wallet connected successfully!');
      } else {
        toast.error('Please install MetaMask!');
      }
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleSkip = () => {
    setIsConnected(true);
    toast.success('Proceeding without wallet connection');
  };

  const handleMint = async (name: string) => {
    const rarity = Math.random();
    const newPet: PetType = {
      id: Date.now().toString(),
      name,
      level: 1,
      exp: 0,
      health: 100,
      strength: 10,
      wins: 0,
      tokenBalance: 0,
      rarity: rarity > 0.98 ? 'Legendary' :
              rarity > 0.90 ? 'Epic' :
              rarity > 0.70 ? 'Rare' : 'Common',
      lastBattleTime: 0,
      inventory: [
        {
          id: '1',
          name: 'Health Potion',
          type: 'Potion',
          rarity: 'Common',
          effect: { stat: 'health', value: 50 }
        },
        {
          id: '2',
          name: 'Strength Elixir',
          type: 'Potion',
          rarity: 'Rare',
          effect: { stat: 'strength', value: 5 }
        }
      ],
      achievements: [
        {
          id: '1',
          name: 'Battle Beginner',
          description: 'Win your first battle',
          reward: 10,
          completed: false,
          progress: 0,
          target: 1,
          type: 'wins'
        },
        {
          id: '2',
          name: 'Training Master',
          description: 'Complete 10 training sessions',
          reward: 25,
          completed: false,
          progress: 0,
          target: 10,
          type: 'training'
        }
      ],
      training: {
        lastTrainingTime: 0,
        sessionsToday: 0
      }
    };
    setPet(newPet);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleBattle = async (battle: Battle) => {
    if (!pet) return;

    const winChance = (pet.strength * pet.level) / 
                     (battle.opponent.strength * battle.opponent.level);
    const won = Math.random() < winChance;

    if (won) {
      const updatedAchievements = pet.achievements.map(achievement => {
        if (achievement.type === 'wins' && !achievement.completed) {
          const newProgress = achievement.progress + 1;
          return {
            ...achievement,
            progress: newProgress,
            completed: newProgress >= achievement.target
          };
        }
        return achievement;
      });

      setPet(prev => prev ? {
        ...prev,
        exp: prev.exp + 20,
        level: Math.floor((prev.exp + 20) / 100) + 1,
        wins: prev.wins + 1,
        tokenBalance: prev.tokenBalance + battle.reward,
        lastBattleTime: Date.now(),
        achievements: updatedAchievements
      } : null);
      toast.success(`Victory! Earned ${battle.reward} PETS tokens! 🎉`);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setPet(prev => prev ? {
        ...prev,
        exp: prev.exp + 5,
        lastBattleTime: Date.now()
      } : null);
      toast.error('Defeat! But gained some experience! 💪');
    }
  };

  const handleTrain = () => {
    if (!pet) return;

    const updatedAchievements = pet.achievements.map(achievement => {
      if (achievement.type === 'training' && !achievement.completed) {
        const newProgress = achievement.progress + 1;
        return {
          ...achievement,
          progress: newProgress,
          completed: newProgress >= achievement.target
        };
      }
      return achievement;
    });

    setPet(prev => prev ? {
      ...prev,
      strength: prev.strength + 2,
      exp: prev.exp + 50,
      training: {
        lastTrainingTime: Date.now(),
        sessionsToday: prev.training.sessionsToday + 1
      },
      achievements: updatedAchievements
    } : null);
  };

  const handleUseItem = (item: Item) => {
    if (!pet) return;

    setPet(prev => {
      if (!prev) return null;

      const updatedInventory = prev.inventory.map(i =>
        i.id === item.id ? { ...i, used: true } : i
      );

      return {
        ...prev,
        [item.effect.stat]: prev[item.effect.stat] + item.effect.value,
        inventory: updatedInventory
      };
    });
  };

  // Reset daily training sessions at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const resetTrainingSessions = () => {
      setPet(prev => prev ? {
        ...prev,
        training: {
          ...prev.training,
          sessionsToday: 0
        }
      } : null);
    };

    const timer = setTimeout(resetTrainingSessions, timeUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
      {showConfetti && <Confetti />}
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500"
          >
            CryptoPets
          </motion.h1>
          <p className="text-xl text-gray-300">Train and battle with your NFT companion!</p>
        </header>

        {!isConnected ? (
          <ConnectWallet onConnect={handleConnect} onSkip={handleSkip} />
        ) : !pet ? (
          <MintPet onMint={handleMint} disabled={false} />
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
              >
                <Pet pet={pet} />
                <GameStats pet={pet} />
              </motion.div>
              <Training pet={pet} onTrain={handleTrain} />
              <Inventory pet={pet} onUseItem={handleUseItem} />
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
              >
                <BattleArena pet={pet} onBattle={handleBattle} />
              </motion.div>
              <Achievements achievements={pet.achievements} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;