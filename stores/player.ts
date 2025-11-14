"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Brainrot } from '@/types/brainrot';
import type { Ingredient } from '@/types/ingredient';
import type { PlayerProfile } from '@/types/player';
import { save } from '@/lib/storage';

const SECRET_OP = {
  id: 'secret-billion-cat',
  name: '💎🧠 Cat Billionaire',
  emoji: '😺💰',
  rarity: 'secret' as const,
  baseEarningsPerSecond: 1_000_000_000,
  tags: ['secret']
};

export interface PlayerState extends PlayerProfile {
  addMoney: (amount: number) => void;
  spendMoney: (amount: number) => boolean;
  addBrainrot: (b: Brainrot) => void;
  equip: (id: string) => void;
  unequip: (id: string) => void;
  addIngredient: (ing: Ingredient) => void;
  addTicket: (n?: number) => void;
  setAdmin: (v: boolean) => void;
  reset: () => void;
}

const initial: PlayerProfile = {
  id: 'local-player',
  money: 0,
  inventory: [
    { id: 'og-spike', name: 'Spike', emoji: '🗡️', rarity: 'og', baseEarningsPerSecond: 5 },
    { id: 'og-cube', name: 'Cube', emoji: '🧊', rarity: 'og', baseEarningsPerSecond: 7 },
    { id: 'og-ball', name: 'Ball', emoji: '⚽', rarity: 'og', baseEarningsPerSecond: 8 },
    { id: 'og-robot', name: 'Robot', emoji: '🤖', rarity: 'og', baseEarningsPerSecond: 10 },
    { id: 'og-spider', name: 'Spider', emoji: '🕷️', rarity: 'og', baseEarningsPerSecond: 12 }
  ],
  equipped: [],
  ingredients: [],
  tickets: 0,
  isAdmin: false
};

export const usePlayer = create<PlayerState>()(
  persist(
    (set: (partial: Partial<PlayerState> | ((state: PlayerState) => Partial<PlayerState>)) => void, get: () => PlayerState) => ({
      ...initial,
      addMoney: (amount: number) => set((s: PlayerState) => ({ money: s.money + amount })),
      spendMoney: (amount: number) => {
        const s = get();
        if (s.money < amount) return false;
        set({ money: s.money - amount });
        return true;
      },
      addBrainrot: (b: Brainrot) => set((s: PlayerState) => ({ inventory: [...s.inventory, b] })),
      equip: (id: string) => set((s: PlayerState) => ({ equipped: Array.from(new Set([...s.equipped, id])) })),
      unequip: (id: string) => set((s: PlayerState) => ({ equipped: s.equipped.filter((x: string) => x !== id) })),
      addIngredient: (ing: Ingredient) => set((s: PlayerState) => ({ ingredients: [...s.ingredients, ing] })),
      addTicket: (n: number = 1) => set((s: PlayerState) => ({ tickets: s.tickets + n })),
      setAdmin: (v: boolean) => set({ isAdmin: v }),
      reset: () => set(initial)
    }),
    { name: 'snackrot-player' }
  )
);

// Income ticker
let lastTs = 0;
if (typeof window !== 'undefined') {
  const loop = (ts: number) => {
    const dt = lastTs ? (ts - lastTs) / 1000 : 0;
    lastTs = ts;
    const s = usePlayer.getState();
    const equipped = s.equipped
      .map((id) => s.inventory.find((i) => i.id === id))
      .filter(Boolean) as Brainrot[];
    const earnings = equipped.reduce((sum, b) => sum + b.baseEarningsPerSecond * dt, 0);
    if (earnings > 0) {
      usePlayer.getState().addMoney(earnings);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

// Helper to grant the ultra secret
export function grantSecretBillion(): void {
  const s = usePlayer.getState();
  if (!s.inventory.find((b) => b.id === SECRET_OP.id)) {
    s.addBrainrot(SECRET_OP);
  }
}
