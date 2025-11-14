"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { createEngine, createWanderingCircle } from '@/game/physics/engine';
import { usePlayer } from '@/stores/player';
import { useWorld } from '@/stores/world';
import { FOOD_BASE, GEOMETRY_OG, pickRandomFood } from '@/game/brainrots';

// dynamic guard for SSR
const ClientOnly = dynamic(async () => () => null, { ssr: false });

type Sprite = {
  id: string;
  body: any;
  emoji: string;
};

export function GameScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const addBrainrot = usePlayer((s: any) => s.addBrainrot);
  const equip = usePlayer((s: any) => s.equip);
  const worldState = useWorld();

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const { clientWidth: width, clientHeight: height } = el;
    const engine = createEngine(width, height);

    const localSprites: Sprite[] = [];

    const spawn = (emoji: string, bps: number, id: string) => {
      const body = createWanderingCircle(
        Math.random() * width * 0.8 + width * 0.1,
        Math.random() * height * 0.6 + height * 0.2,
        18,
        emoji
      );
      (body as any).bps = bps;
      (body as any).id = id;
      engine.add(body);
      const sprite: Sprite = { id, body, emoji };
      localSprites.push(sprite);
      setSprites((prev) => [...prev, sprite]);
    };

    // initial spawns
    for (let i = 0; i < 10; i++) {
      const base = pickRandomFood();
      const mult = worldState.spawnMultiplier;
      const bps = Math.round(base.baseEarningsPerSecond * mult);
      spawn(base.emoji, bps, `${base.id}-${Math.random().toString(36).slice(2, 8)}`);
    }

    // event spawns
    if (worldState.geometryCollab) {
      for (const b of GEOMETRY_OG) {
        spawn(b.emoji, b.baseEarningsPerSecond, `${b.id}-${Math.random().toString(36).slice(2, 8)}`);
      }
    }

    const onClick = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // find nearest sprite within radius
      let near: Sprite | null = null;
      let best = 99999;
      for (const s of localSprites) {
        const p = s.body.position;
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < 36 && d < best) {
          best = d;
          near = s;
        }
      }
      if (near) {
        // catch: remove body and grant brainrot
        engine.remove(near.body);
        const baseEps = (near.body as any).bps || 1;
        const id = (near.body as any).id as string;
        addBrainrot({ id, name: 'Caught', emoji: near.emoji, rarity: 'normal', baseEarningsPerSecond: baseEps });
        equip(id);
        const idx = localSprites.findIndex((s) => s === near);
        if (idx >= 0) localSprites.splice(idx, 1);
        setSprites((prev) => prev.filter((s) => s !== near));
      }
    };

    el.addEventListener('click', onClick);

    const frame = () => {
      setSprites((prev) => [...prev]);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    return () => {
      el.removeEventListener('click', onClick);
      engine.cleanup();
      setSprites([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worldState.geometryCollab, worldState.spawnMultiplier]);

  return (
    <div ref={containerRef} className="relative w-full h-[75vh] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      {sprites.map((s) => (
        <div
          key={s.id}
          className="absolute text-3xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] select-none"
          style={{ left: s.body.position.x - 18, top: s.body.position.y - 18 }}
        >
          {s.emoji}
        </div>
      ))}
      <div className="absolute bottom-2 left-2 right-2 text-center text-white/90 text-sm">
        Tap brainrots to catch and auto-equip! ✨
      </div>
      <ClientOnly />
    </div>
  );
}
