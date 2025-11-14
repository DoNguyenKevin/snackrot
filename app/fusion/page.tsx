"use client";
import { FusionUI } from '@/features/fusion/FusionUI';

export default function FusionPage() {
  return (
    <div className="min-h-[80vh] p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Fusion Lab 🍳</h2>
      <FusionUI />
    </div>
  );
}
