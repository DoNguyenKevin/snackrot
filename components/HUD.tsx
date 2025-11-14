"use client";
import Link from 'next/link';
import { usePlayer } from '@/stores/player';
import { useUI } from '@/stores/ui';
import { formatMoney } from '@/lib/format';
import { Panel } from './Panel';

export function HUD() {
  const money = usePlayer((s: any) => s.money);
  const tickets = usePlayer((s: any) => s.tickets);
  const code = useUI((s: any) => s.codeInput);
  const setCode = useUI((s: any) => s.setCode);
  const unlockAdmin = useUI((s: any) => s.unlockAdmin);
  const setAdmin = usePlayer((s: any) => s.setAdmin);

  const submit = () => {
    if (code.trim() === 'tqkhoi12345678910') {
      unlockAdmin();
      setAdmin(true);
      alert('Admin panel unlocked!');
    } else {
      alert('Invalid code');
    }
  };

  return (
    <div className="fixed top-2 left-2 right-2 flex flex-wrap gap-2 z-50">
      <Panel title="Wallet 💰">
        <div className="text-lg font-bold">{formatMoney(money)}</div>
        <div className="text-xs opacity-80">Tickets 🎟️: {tickets}</div>
        <div className="mt-2 flex gap-2 text-xs">
          <Link className="px-2 py-1 rounded bg-emerald-500/80 hover:bg-emerald-400 text-white" href="/spins">Spins 🎡</Link>
          <Link className="px-2 py-1 rounded bg-fuchsia-500/80 hover:bg-fuchsia-400 text-white" href="/fusion">Fusion 🍳</Link>
          <Link className="px-2 py-1 rounded bg-cyan-500/80 hover:bg-cyan-400 text-white" href="/minigames/house">Minigame 🏠</Link>
        </div>
      </Panel>
      <Panel title="Code 🔐">
        <div className="flex gap-2">
          <input
            className="px-2 py-1 rounded bg-black/40 border border-white/20 text-white"
            placeholder="enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="px-2 py-1 rounded bg-yellow-500/80 hover:bg-yellow-400 text-black" onClick={submit}>
            Enter
          </button>
          <Link className="px-2 py-1 rounded bg-indigo-500/80 hover:bg-indigo-400 text-white" href="/admin">Admin ⚙️</Link>
        </div>
      </Panel>
    </div>
  );
}
