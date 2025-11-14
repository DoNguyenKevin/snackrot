export type Rarity = 'og' | 'normal' | 'epic' | 'secret' | 'special';

export interface Brainrot {
  id: string;
  name: string;
  emoji: string;
  rarity: Rarity;
  baseEarningsPerSecond: number; // money per second when equipped
  tags?: string[];
}
