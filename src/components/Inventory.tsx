import React from 'react';
import { motion } from 'framer-motion';
import { Package, Star, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Pet, Item } from '../types';

interface InventoryProps {
  pet: Pet;
  onUseItem: (item: Item) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ pet, onUseItem }) => {
  const rarityColors = {
    Common: 'border-gray-400 bg-gray-400/10',
    Rare: 'border-blue-400 bg-blue-400/10',
    Epic: 'border-purple-400 bg-purple-400/10',
    Legendary: 'border-yellow-400 bg-yellow-400/10'
  };

  const handleUseItem = (item: Item) => {
    if (item.used) {
      toast.error('Item already used!');
      return;
    }
    onUseItem(item);
    toast.success(`Used ${item.name}!`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Package className="w-6 h-6 mr-2 text-purple-400" />
          Inventory
        </h2>
        <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-2">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {pet.inventory.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleUseItem(item)}
            disabled={item.used}
            className={`relative p-4 rounded-xl border ${rarityColors[item.rarity]} ${
              item.used ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Star className={`w-4 h-4 ${
                item.rarity === 'Legendary' ? 'text-yellow-400' :
                item.rarity === 'Epic' ? 'text-purple-400' :
                item.rarity === 'Rare' ? 'text-blue-400' :
                'text-gray-400'
              }`} />
              <span className="font-medium">{item.name}</span>
            </div>
            <p className="text-sm text-gray-300">
              +{item.effect.value} {item.effect.stat}
            </p>
            {item.used && (
              <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                <span className="text-sm font-medium">Used</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}