"use client";
import { usePlayer } from '@/stores/player';
import { useWorld } from '@/stores/world';
import { FOOD_BASE, GEOMETRY_OG } from '@/game/brainrots';

export default function AdminPage() {
  const isAdmin = usePlayer((s: any) => s.isAdmin);
  const addBrainrot = usePlayer((s: any) => s.addBrainrot);
  const addMoney = usePlayer((s: any) => s.addMoney);
  const setTacoRain = useWorld((s: any) => s.setTacoRain);
  const setGeometryCollab = useWorld((s: any) => s.setGeometryCollab);

  if (!isAdmin) {
    return <div className="p-6 text-white">Enter the code from HUD to unlock admin.</div>;
  }

  return (
    <div className="p-6 text-white grid gap-4">
      <h2 className="text-2xl font-bold">Admin Panel ⚙️</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded p-3 bg-white/10 border border-white/20">
          <div className="font-semibold mb-2">Money</div>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-emerald-400 text-black" onClick={() => addMoney(1_000)}>+1k</button>
            <button className="px-2 py-1 rounded bg-emerald-400 text-black" onClick={() => addMoney(1_000_000)}>+1M</button>
            <button className="px-2 py-1 rounded bg-emerald-400 text-black" onClick={() => addMoney(1_000_000_000)}>+1B</button>
          </div>
        </div>
        <div className="rounded p-3 bg-white/10 border border-white/20">
          <div className="font-semibold mb-2">Spawn Brainrots</div>
          <div className="flex flex-wrap gap-2">
            {FOOD_BASE.concat(GEOMETRY_OG).map((b) => (
              <button key={b.id} className="px-2 py-1 rounded bg-sky-400 text-black" onClick={() => addBrainrot(b)}>
                {b.emoji} {b.name}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded p-3 bg-white/10 border border-white/20">
          <div className="font-semibold mb-2">Events</div>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-amber-300 text-black" onClick={() => setTacoRain(true)}>🌮 Taco Rain</button>
            <button className="px-2 py-1 rounded bg-amber-300 text-black" onClick={() => setTacoRain(false)}>Stop</button>
            <button className="px-2 py-1 rounded bg-fuchsia-300 text-black" onClick={() => setGeometryCollab(true)}>🧩 Geometry</button>
            <button className="px-2 py-1 rounded bg-fuchsia-300 text-black" onClick={() => setGeometryCollab(false)}>Stop</button>
          </div>
          <div className="text-xs opacity-80 mt-2">Taco Rain: brainrots spawned during event have +10% earnings.</div>
        </div>
      </div>
    </div>
  );
}
