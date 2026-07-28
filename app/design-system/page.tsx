"use client";

import { colors, intensityLevels, motion } from "@/lib/tokens";
import { MODE_CONTRACTS, SYMBOLS } from "@/lib/math";
import { Symbol } from "@/components/slot/Symbol";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-[var(--tepo-void)] text-[var(--tepo-bone)] p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--tepo-cyan)] to-[var(--tepo-gold)] bg-clip-text text-transparent">
            Te Po Spectre Design System
          </h1>
          <p className="text-[var(--tepo-muted)] mt-2">
            Tokens · Components · IntensityScaler · Mode Contracts · Conventions for v0 DS 2.0
          </p>
        </header>

        {/* Colors */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[var(--tepo-cyan)]">Color Tokens</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {Object.entries(colors).map(([name, value]) => (
              <div key={name} className="rounded-lg overflow-hidden border border-[var(--tepo-phantom)]">
                <div className="h-16" style={{ backgroundColor: value }} />
                <div className="p-2 text-xs bg-[var(--tepo-night)]">
                  <div className="font-mono">{name}</div>
                  <div className="text-[var(--tepo-muted)]">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Intensity */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[var(--tepo-cyan)]">IntensityScaler Levels</h2>
          <div className="grid gap-2">
            {Object.entries(intensityLevels).map(([level, meta]) => (
              <div key={level} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--tepo-night)] border border-[var(--tepo-phantom)]">
                <span className="font-mono text-[var(--tepo-gold)] w-8">{level}</span>
                <span className="w-24">{meta.label}</span>
                <span className="text-sm text-[var(--tepo-muted)]">glow: {meta.glow} · particles: {meta.particles} · scale: {meta.scale}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Modes */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[var(--tepo-cyan)]">Mode Contracts</h2>
          <div className="grid gap-3">
            {Object.values(MODE_CONTRACTS).map((mode) => (
              <div key={mode.id} className="p-4 rounded-lg bg-[var(--tepo-night)] border border-[var(--tepo-phantom)]">
                <div className="font-semibold text-[var(--tepo-gold)]">{mode.displayName}</div>
                <div className="text-sm text-[var(--tepo-muted)] mt-1">
                  intensityFloor: {mode.intensityFloor} · winMultiplier: ×{mode.winMultiplier}
                  {mode.fsAwarded ? ` · FS: ${mode.fsAwarded}` : ""}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Symbols */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[var(--tepo-cyan)]">Symbol Components</h2>
          <div className="flex flex-wrap gap-4">
            {Object.keys(SYMBOLS).map((id) => (
              <div key={id} className="flex flex-col items-center gap-2">
                <Symbol id={id as any} intensity={3} size={64} />
                <span className="text-xs text-[var(--tepo-muted)]">{SYMBOLS[id as keyof typeof SYMBOLS].name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Conventions */}
        <section className="prose prose-invert max-w-none">
          <h2 className="text-xl font-semibold mb-4 text-[var(--tepo-cyan)]">Conventions for v0</h2>
          <ul className="text-sm text-[var(--tepo-muted)] space-y-2 list-disc pl-5">
            <li>Always use CSS variables from globals.css / tokens.ts for colors and glows.</li>
            <li>Drive visual intensity from the single <code>intensity</code> number (0–5) emitted by BookEvent.</li>
            <li>Respect ModeContracts (Base / Spectral Descent / Super Floor).</li>
            <li>Entertainment-only: include clear “no real money” disclaimers.</li>
            <li>Prefer abstract spectral / night-realm imagery; avoid literal sacred iconography.</li>
            <li>Motion: use the defined ease curves and duration tokens for cinematic feel.</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-[var(--tepo-phantom)] text-center text-sm text-[var(--tepo-muted)]">
          <a href="/" className="text-[var(--tepo-cyan)] hover:underline">← Back to Playable Demo</a>
        </div>
      </div>
    </main>
  );
}
