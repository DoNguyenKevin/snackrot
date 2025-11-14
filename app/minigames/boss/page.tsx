"use client";
import React, { useEffect, useRef, useState } from 'react';
import { usePlayer, grantSecretBillion } from '@/stores/player';

interface Bullet { x: number; y: number; vx: number; vy: number }

export default function BossPage() {
  const tickets = usePlayer((s: any) => s.tickets);
  const setTickets = (n: number) => usePlayer.setState({ tickets: n });
  const addBrainrot = usePlayer((s: any) => s.addBrainrot);

  const [playing, setPlaying] = useState(false);
  const [boss, setBoss] = useState({ x: 200, y: 120, hp: 100 });
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [player, setPlayer] = useState({ x: 200, y: 260 });

  useEffect(() => {
    if (!playing) return;
    let anim = 0;
    const loop = () => {
      // move boss slowly
      setBoss((b) => ({ ...b, x: b.x + Math.sin(Date.now() / 500) * 0.8 }));
      // move bullets
      setBullets((arr) => arr.filter((bt) => bt.y > -10).map((bt) => ({ ...bt, x: bt.x + bt.vx, y: bt.y + bt.vy })));
      anim = requestAnimationFrame(loop);
    };
    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, [playing]);

  const start = () => {
    if (tickets <= 0) return alert('No ticket! Buy one in the house.');
    setTickets(tickets - 1);
    setBoss({ x: 200, y: 120, hp: 100 });
    setBullets([]);
    setPlaying(true);
  };

  const shoot = (e: React.MouseEvent) => {
    if (!playing) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - player.x;
    const dy = y - player.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = 6;
    setBullets((arr) => [...arr, { x: player.x, y: player.y, vx: (dx / len) * speed, vy: (dy / len) * speed }]);
  };

  useEffect(() => {
    if (!playing) return;
    // collision check
    setBullets((arr) => {
      const hit: number[] = [];
      arr.forEach((b, i) => {
        if (Math.hypot(b.x - boss.x, b.y - boss.y) < 24) hit.push(i);
      });
      if (hit.length) {
        setBoss((bs) => ({ ...bs, hp: Math.max(0, bs.hp - hit.length * 5) }));
      }
      return arr.filter((_, i) => !hit.includes(i));
    });
  }, [bullets, boss.x, boss.y, playing]);

  useEffect(() => {
    if (playing && boss.hp <= 0) {
      setPlaying(false);
      addBrainrot({ id: 'special-boss', name: 'Boss Trophy', emoji: '🏆🧠', rarity: 'special', baseEarningsPerSecond: 100000 });
      grantSecretBillion();
      alert('Boss defeated! You received special rewards!');
    }
  }, [playing, boss.hp, addBrainrot]);

  return (
    <div className="min-h-[80vh] p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Boss Room 💥</h2>
      <div
        className="relative mx-auto max-w-xl h-[320px] rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 border border-white/20 overflow-hidden"
        onMouseMove={(e) => setPlayer((p) => ({ ...p, x: (e.nativeEvent as any).offsetX, y: (e.nativeEvent as any).offsetY }))}
        onClick={shoot}
      >
        {/* boss */}
        <div className="absolute text-5xl" style={{ left: boss.x - 24, top: boss.y - 24 }}>🧠👑</div>
        <div className="absolute left-2 top-2 right-2 h-2 bg-white/10 rounded">
          <div className="h-full bg-rose-500 rounded" style={{ width: boss.hp + '%' }} />
        </div>
        {/* player */}
        <div className="absolute text-3xl" style={{ left: player.x - 12, top: player.y - 12 }}>🔫</div>
        {/* bullets */}
        {bullets.map((b, i) => (
          <div key={i} className="absolute w-2 h-2 bg-yellow-300 rounded-full" style={{ left: b.x, top: b.y }} />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 rounded bg-emerald-400 text-black hover:bg-emerald-300" onClick={start}>Start (uses 1 ticket)</button>
        <div className="text-sm opacity-80">Tickets: {tickets}</div>
      </div>
    </div>
  );
}
