"use client";
import React from 'react';

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur p-3 shadow-lg text-white">
      <div className="font-bold mb-2 text-sm opacity-80">{title}</div>
      <div>{children}</div>
    </div>
  );
}
