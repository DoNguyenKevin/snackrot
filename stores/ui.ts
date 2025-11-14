"use client";
import { create } from 'zustand';

export interface UIState {
  showAdmin: boolean;
  codeInput: string;
  setCode: (v: string) => void;
  unlockAdmin: () => void;
}

export const useUI = create<UIState>((set) => ({
  showAdmin: false,
  codeInput: '',
  setCode: (v: string) => set({ codeInput: v }),
  unlockAdmin: () => set({ showAdmin: true })
}));
