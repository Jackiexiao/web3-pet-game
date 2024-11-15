import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Clock, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Pet } from '../types';

interface TrainingProps {
  pet: Pet;
  onTrain: () => void;
}

export const Training: React.FC<TrainingProps> = ({ pet, onTrain }) => {
  const MAX_DAILY_SESSIONS = 5;
  const TRAINING_COOLDOWN = 1800000; // 30 minutes in milliseconds

  const canTrain = Date.now() - pet.training.lastTrainingTime > TRAINING_COOLDOWN &&
                  pet.training.sessionsToday < MAX_DAILY_SESSIONS;

  const remainingTime = Math.max(0, TRAINING_COOLDOWN - (Date.now() - pet.training.lastTrainingTime));
  const remainingMinutes = Math.ceil(remainingTime / 60000);

  const handleTraining = () => {
    if (!canTrain) {
      if (pet.training.sessionsToday >= MAX_DAILY_SESSIONS) {
        toast.error('Maximum daily training sessions reached!');
      } else {
        toast.error(`Training cooldown: ${remainingMinutes} minutes remaining`);
      }
      return;
    }
    onTrain();
    toast.success('Training completed! Stats improved! 💪');
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Dumbbell className="w-6 h-6 mr-2 text-blue-400" />
          Training Ground
        </h2>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-sm">{MAX_DAILY_SESSIONS - pet.training.sessionsToday} sessions left</span>
        </div>
      </div>

      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={handleTraining}
          disabled={!canTrain}
          className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition ${
            canTrain ? 'hover:from-blue-600 hover:to-purple-600' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Train Pet (+2 Strength, +50 EXP)
        </motion.button>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-sm font-medium">Daily Progress</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-400 rounded-full h-2"
                style={{ width: `${(pet.training.sessionsToday / MAX_DAILY_SESSIONS) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <Clock className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-sm font-medium">Next Session</p>
            <p className="text-lg font-bold">
              {canTrain ? 'Ready!' : `${remainingMinutes}m`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
