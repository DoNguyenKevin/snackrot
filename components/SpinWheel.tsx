"use client";
import React, { useState } from 'react';
import { weightedChoice } from '@/lib/rng';
import type { Ingredient } from '@/types/ingredient';
import { usePlayer } from '@/stores/player';

export type SpinTier = 'normal' | 'epic' | 'secret';

const ING_POOL: Record<SpinTier, Ingredient[]> = {
  normal: [
    { id: 'ing-tomato', name: 'Tomato', emoji: '🍅', rarity: 'normal', value: 1 },
    { id: 'ing-lettuce', name: 'Lettuce', emoji: '🥬', rarity: 'normal', value: 1 },
    { id: 'ing-onion', name: 'Onion', emoji: '🧅', rarity: 'normal', value: 1 }
  ],
  epic: [
    { id: 'ing-salmon', name: 'Salmon', emoji: '🐟', rarity: 'epic', value: 5 },
    { id: 'ing-wagyu', name: 'Wagyu', emoji: '🥩', rarity: 'epic', value: 6 },
    { id: 'ing-truffle', name: 'Truffle', emoji: '🍄', rarity: 'epic', value: 7 }
  ],
  secret: [
    { id: 'ing-stardust', name: 'Stardust', emoji: '✨', rarity: 'secret', value: 10 },
    { id: 'ing-rainbow', name: 'Rainbow Syrup', emoji: '🌈', rarity: 'secret', value: 12 }
  ]
};

const COST: Record<SpinTier, number> = { normal: 10, epic: 100, secret: 1000 };

export function SpinWheel({ tier }: { tier: SpinTier }) {
  const [spinning, setSpinning] = useState(false);
  const spend = usePlayer((s: any) => s.spendMoney);
  const addIngredient = usePlayer((s: any) => s.addIngredient);

  const spin = () => {
    if (spinning) return;
    const cost = COST[tier];
    if (!spend(cost)) {
      alert('Not enough money');
      return;
    }
    setSpinning(true);
    setTimeout(() => {
      const pool = ING_POOL[tier];
      const item = weightedChoice(pool.map((i) => ({ item: i, weight: 1 })));
      addIngredient(item);
      setSpinning(false);
      alert(`You won ${item.emoji} ${item.name}!`);
    }, 1000);
  };

  return (
    <div className="rounded-xl p-4 bg-white/10 backdrop-blur border border-white/20 text-white flex flex-col items-center gap-2">
      <div className="text-lg font-bold capitalize">{tier} wheel 🎡</div>
      <div className="text-5xl animate-pulse">🎯</div>
      <button
        className="px-3 py-1 rounded bg-amber-400 text-black hover:bg-amber-300 disabled:opacity-50"
        disabled={spinning}
        onClick={spin}
      >
        {spinning ? 'Spinning…' : `Spin (${COST[tier]})`}
      </button>
    </div>
  );
}
