"use client";
import { create } from 'zustand';
import type { Brainrot } from '@/types/brainrot';

export interface WorldState {
  tacoRain: boolean;
  geometryCollab: boolean;
  spawnMultiplier: number; // EPS multiplier for brainrots spawned during current event
  roaming: Brainrot[]; // current roaming brainrots in world
  setTacoRain: (v: boolean) => void;
  setGeometryCollab: (v: boolean) => void;
  addRoaming: (b: Brainrot) => void;
  removeRoaming: (id: string) => void;
  clearRoaming: () => void;
}

export const useWorld = create<WorldState>((set) => ({
  tacoRain: false,
  geometryCollab: false,
  spawnMultiplier: 1,
  roaming: [],
  setTacoRain: (v: boolean) => set({ tacoRain: v, spawnMultiplier: v ? 1.1 : 1 }),
  setGeometryCollab: (v: boolean) => set({ geometryCollab: v }),
  addRoaming: (b: Brainrot) => set((s) => ({ roaming: [...s.roaming, b] })),
  removeRoaming: (id: string) => set((s) => ({ roaming: s.roaming.filter((x) => x.id !== id) })),
  clearRoaming: () => set({ roaming: [] })
}));
