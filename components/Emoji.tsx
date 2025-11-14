"use client";
import React from 'react';

export function Emoji({ label, children, className }: { label?: string; children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-label={label}
      className={"select-none" + (className ? ` ${className}` : '')}
      role={label ? 'img' : undefined}
    >
      {children}
    </span>
  );
}
