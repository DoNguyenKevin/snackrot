"use client";
import { HUD } from '@/components/HUD';
import { GameScene } from '@/components/GameScene';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-sky-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-extrabold text-white drop-shadow">🍔🧠 Snackrot: Emoji Tycoon</h1>
          <p className="text-white/70">Catch roaming brainrots, equip them, and get rich! ✨</p>
        </div>
        <HUD />
        <GameScene />
        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-white/80 text-sm">
          <div className="rounded bg-white/10 p-3 border border-white/20">Taco Rain 🌮: +10% EPS on spawned brainrots during event.</div>
          <div className="rounded bg-white/10 p-3 border border-white/20">Geometry Collab 🧩: Spawns Spike, Cube, Ball, Robot, Spider.</div>
          <div className="rounded bg-white/10 p-3 border border-white/20">Boss House 🏠: Buy ticket, shoot boss, win special loot.</div>
        </div>
      </div>
    </div>
  );
}
