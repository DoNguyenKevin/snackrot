import type { Brainrot } from '@/types/brainrot';

export const FOOD_BASE: Brainrot[] = [
  { id: 'food-taco', name: 'Taco', emoji: '🌮', rarity: 'normal', baseEarningsPerSecond: 3 },
  { id: 'food-burger', name: 'Burger', emoji: '🍔', rarity: 'normal', baseEarningsPerSecond: 4 },
  { id: 'food-pizza', name: 'Pizza', emoji: '🍕', rarity: 'normal', baseEarningsPerSecond: 5 },
  { id: 'food-sushi', name: 'Sushi', emoji: '🍣', rarity: 'epic', baseEarningsPerSecond: 15 },
  { id: 'food-ramen', name: 'Ramen', emoji: '🍜', rarity: 'epic', baseEarningsPerSecond: 20 },
  { id: 'food-cake', name: 'Cake', emoji: '🍰', rarity: 'epic', baseEarningsPerSecond: 25 },
  { id: 'secret-billion-cat', name: 'Cat Billionaire', emoji: '😺💰', rarity: 'secret', baseEarningsPerSecond: 1_000_000_000 },
  { id: 'special-boss', name: 'Boss Trophy', emoji: '🏆🧠', rarity: 'special', baseEarningsPerSecond: 100_000 }
];

export const GEOMETRY_OG: Brainrot[] = [
  { id: 'og-spike', name: 'Spike', emoji: '🗡️', rarity: 'og', baseEarningsPerSecond: 5 },
  { id: 'og-cube', name: 'Cube', emoji: '🧊', rarity: 'og', baseEarningsPerSecond: 7 },
  { id: 'og-ball', name: 'Ball', emoji: '⚽', rarity: 'og', baseEarningsPerSecond: 8 },
  { id: 'og-robot', name: 'Robot', emoji: '🤖', rarity: 'og', baseEarningsPerSecond: 10 },
  { id: 'og-spider', name: 'Spider', emoji: '🕷️', rarity: 'og', baseEarningsPerSecond: 12 }
];

export function pickRandomFood(): Brainrot {
  const list = FOOD_BASE.filter((b) => b.rarity === 'normal' || b.rarity === 'epic');
  return list[Math.floor(Math.random() * list.length)];
}
