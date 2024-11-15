import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

interface ConnectWalletProps {
  onConnect: () => void;
  onSkip: () => void;  // Add new prop for skip handler
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect, onSkip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        <Wallet className="w-16 h-16 mx-auto mb-4 text-purple-400" />
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-300 mb-6">
          Connect your wallet to start training your CryptoPet!
        </p>
        <div className="space-y-3">
          <button
            onClick={onConnect}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition hover:scale-105"
          >
            Connect MetaMask
          </button>
          <button
            onClick={onSkip}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition hover:scale-105"
          >
            Skip Connection
          </button>
        </div>
      </div>
    </motion.div>
  );
};