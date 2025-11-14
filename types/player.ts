import type { Brainrot } from './brainrot';
import type { Ingredient } from './ingredient';

export interface PlayerProfile {
  id: string;
  money: number;
  inventory: Brainrot[];
  equipped: string[]; // brainrot ids
  ingredients: Ingredient[];
  tickets: number;
  isAdmin: boolean;
}
