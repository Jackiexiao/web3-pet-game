import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Award className="w-6 h-6 mr-2 text-yellow-400" />
          Achievements
        </h2>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={false}
            animate={achievement.completed ? { scale: [1, 1.05, 1] } : {}}
            className={`bg-white/5 rounded-xl p-4 ${
              achievement.completed ? 'border border-yellow-400/50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className={`w-5 h-5 ${
                  achievement.completed ? 'text-yellow-400' : 'text-gray-400'
                }`} />
                <h3 className="font-medium">{achievement.name}</h3>
              </div>
              <span className="text-sm text-yellow-400">+{achievement.reward} PETS</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-400 rounded-full h-2 transition-all duration-500"
                style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
              />
            </div>
            <p className="text-right text-xs text-gray-400 mt-1">
              {achievement.progress}/{achievement.target}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};