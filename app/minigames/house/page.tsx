"use client";
import Link from 'next/link';
import { usePlayer } from '@/stores/player';

export default function HousePage() {
  const spend = usePlayer((s: any) => s.spendMoney);
  const addTicket = usePlayer((s: any) => s.addTicket);
  const tickets = usePlayer((s: any) => s.tickets);

  const buyTicket = () => {
    if (spend(250)) {
      addTicket(1);
      alert('🎟️ Ticket purchased!');
    } else {
      alert('Not enough money (250 needed).');
    }
  };

  return (
    <div className="min-h-[80vh] p-6 text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Minigame House 🏠</h2>
      <div className="rounded-xl bg-white/10 p-4 border border-white/20">
        <p className="mb-3">Buy a ticket and enter the Boss Room. Beat the giant brainrot to win a special brainrot!</p>
        <div className="flex gap-2 items-center">
          <button onClick={buyTicket} className="px-3 py-1 rounded bg-amber-400 text-black hover:bg-amber-300">Buy Ticket (250)</button>
          <span className="text-sm opacity-80">You have: {tickets} 🎟️</span>
          <Link href="/minigames/boss" className="ml-auto px-3 py-1 rounded bg-rose-400 text-black hover:bg-rose-300">Enter ▶</Link>
        </div>
      </div>
    </div>
  );
}
