import type { Ingredient } from '@/types/ingredient';
import type { Brainrot } from '@/types/brainrot';

export interface Recipe {
  id: string;
  inputs: string[]; // ingredient ids required
  output: Brainrot;
}

export const RECIPES: Recipe[] = [
  {
    id: 'special-boss-trophy',
    inputs: ['ing-stardust', 'ing-rainbow'],
    output: { id: 'special-boss', name: 'Boss Trophy', emoji: '🏆🧠', rarity: 'special', baseEarningsPerSecond: 100000 }
  },
  {
    id: 'secret-billion-cat',
    inputs: ['ing-truffle', 'ing-wagyu', 'ing-salmon', 'ing-rainbow'],
    output: { id: 'secret-billion-cat', name: 'Cat Billionaire', emoji: '😺💰', rarity: 'secret', baseEarningsPerSecond: 1000000000 }
  }
];

export function canCraft(inv: Ingredient[], recipe: Recipe): boolean {
  const ids = inv.map((i) => i.id);
  return recipe.inputs.every((need) => ids.includes(need));
}
