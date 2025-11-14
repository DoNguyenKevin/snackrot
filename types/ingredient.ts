export type IngredientRarity = 'normal' | 'epic' | 'secret';

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  rarity: IngredientRarity;
  value: number;
}
