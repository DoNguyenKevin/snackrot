"use client";
import { SpinWheel } from '@/components/SpinWheel';

export default function SpinsPage() {
  return (
    <div className="min-h-[80vh] p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Spins 🎡</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <SpinWheel tier="normal" />
        <SpinWheel tier="epic" />
        <SpinWheel tier="secret" />
      </div>
    </div>
  );
}
