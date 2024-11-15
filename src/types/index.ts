export interface Pet {
  id: string;
  name: string;
  level: number;
  exp: number;
  health: number;
  strength: number;
  wins: number;
  tokenBalance: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  lastBattleTime: number;
  inventory: Item[];
  achievements: Achievement[];
  training: {
    lastTrainingTime: number;
    sessionsToday: number;
  };
}

export interface Battle {
  id: string;
  opponent: Pet;
  reward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Item {
  id: string;
  name: string;
  type: 'Potion' | 'Equipment' | 'Food';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  effect: {
    stat: 'health' | 'strength' | 'exp';
    value: number;
  };
  used?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  reward: number;
  completed: boolean;
  progress: number;
  target: number;
  type: 'wins' | 'level' | 'items' | 'training';
}