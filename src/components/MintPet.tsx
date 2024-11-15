import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface MintPetProps {
  onMint: (name: string) => void;
  disabled: boolean;
}

export const MintPet: React.FC<MintPetProps> = ({ onMint, disabled }) => {
  const [name, setName] = useState('');
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    if (!name) {
      toast.error('Please enter a name for your pet!');
      return;
    }
    setIsMinting(true);
    try {
      await onMint(name);
      toast.success('Successfully minted your CryptoPet!');
      setName('');
    } catch (error) {
      toast.error('Failed to mint pet');
    }
    setIsMinting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-yellow-400 mr-2" />
        <h2 className="text-2xl font-bold">Mint New Pet</h2>
      </div>
      
      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter pet name"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          disabled={disabled || isMinting}
        />
        
        <button
          onClick={handleMint}
          disabled={disabled || isMinting}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{isMinting ? 'Minting...' : 'Mint Pet NFT (0.01 ETH)'}</span>
        </button>
      </div>
    </motion.div>
  );
};