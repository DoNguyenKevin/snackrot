"use client";
import React from 'react';
import { usePlayer } from '@/stores/player';
import { RECIPES, canCraft } from './recipes';

export function FusionUI() {
  const ingredients = usePlayer((s: any) => s.ingredients);
  const addBrainrot = usePlayer((s: any) => s.addBrainrot);
  const spendIngredient = usePlayer((s: any) => (ids: string[]) => {
    const s0 = usePlayer.getState();
    const remaining = [...s0.ingredients];
    for (const id of ids) {
      const idx = remaining.findIndex((x) => x.id === id);
      if (idx >= 0) remaining.splice(idx, 1);
    }
    usePlayer.setState({ ingredients: remaining });
  });

  const craft = (recipeId: string) => {
    const recipe = RECIPES.find((r) => r.id === recipeId)!;
    if (!canCraft(ingredients, recipe)) return alert('Missing ingredients');
    spendIngredient(recipe.inputs);
    addBrainrot(recipe.output);
    alert(`Crafted ${recipe.output.emoji} ${recipe.output.name}!`);
  };

  return (
    <div className="grid gap-3">
      <div className="text-white/80 text-sm">Ingredients: {ingredients.map((i: any) => i.emoji).join(' ') || 'None'}</div>
      {RECIPES.map((r) => (
        <div key={r.id} className="flex items-center justify-between rounded bg-white/10 border border-white/20 p-3 text-white">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🍳</div>
            <div className="text-sm opacity-90">{r.inputs.join(' + ')} ➜ {r.output.emoji} {r.output.name}</div>
          </div>
          <button
            className="px-3 py-1 rounded bg-emerald-400 text-black disabled:opacity-50"
            disabled={!canCraft(ingredients, r)}
            onClick={() => craft(r.id)}
          >
            Fuse
          </button>
        </div>
      ))}
    </div>
  );
}
