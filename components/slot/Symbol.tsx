"use client";

import { SymbolId, SYMBOLS } from "@/lib/math";

interface SymbolProps {
  id: SymbolId;
  intensity?: number;
  size?: number;
  className?: string;
}

const TIER_STYLES: Record<string, { bg: string; border: string; text: string; glow?: string }> = {
  low: {
    bg: "bg-[var(--tepo-elevated)]",
    border: "border-[var(--tepo-muted)]",
    text: "text-[var(--tepo-muted)]",
  },
  mid: {
    bg: "bg-[var(--tepo-surface)]",
    border: "border-[var(--tepo-cyan)]",
    text: "text-[var(--tepo-cyan)]",
    glow: "glow-cyan",
  },
  high: {
    bg: "bg-[var(--tepo-surface)]",
    border: "border-[var(--tepo-gold)]",
    text: "text-[var(--tepo-gold)]",
    glow: "glow-gold",
  },
  wild: {
    bg: "bg-gradient-to-br from-[var(--tepo-phantom)] to-[var(--tepo-elevated)]",
    border: "border-[var(--tepo-cyan-bright)]",
    text: "text-[var(--tepo-cyan-bright)]",
    glow: "glow-cyan",
  },
  scatter: {
    bg: "bg-gradient-to-br from-[var(--tepo-void)] to-[var(--tepo-phantom)]",
    border: "border-[var(--tepo-ember)]",
    text: "text-[var(--tepo-ember-soft)]",
    glow: "glow-ember",
  },
};

export function Symbol({ id, intensity = 0, size = 64, className = "" }: SymbolProps) {
  const meta = SYMBOLS[id];
  const style = TIER_STYLES[meta.tier];
  const showGlow = intensity >= 2 && style.glow;

  return (
    <div
      className={`
        relative flex items-center justify-center rounded-lg border-2
        ${style.bg} ${style.border} ${style.text}
        ${showGlow ? style.glow : ""}
        transition-all duration-300
        ${className}
      `}
      style={{ width: size, height: size }}
      title={meta.name}
    >
      <span className="text-xs font-bold tracking-wider uppercase text-center leading-tight px-1">
        {meta.name.split(" ").map((w) => w[0]).join("")}
      </span>
      {intensity >= 3 && (
        <div className="absolute inset-0 rounded-lg animate-pulse opacity-40 bg-current pointer-events-none" />
      )}
    </div>
  );
}
