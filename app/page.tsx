"use client";

import { useState } from "react";
import { spin, BookEvent, SymbolId } from "@/lib/math";
import { Symbol } from "@/components/slot/Symbol";

export default function Home() {
  const [balance, setBalance] = useState(1000);
  const [bet] = useState(1);
  const [lastEvent, setLastEvent] = useState<BookEvent | null>(null);
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    if (spinning || balance < bet) return;
    setSpinning(true);
    setBalance((b) => b - bet);

    setTimeout(() => {
      const event = spin(bet, "base");
      setLastEvent(event);
      setBalance((b) => b + event.totalWin);
      setSpinning(false);
    }, 1600);
  };

  return (
    <main className="min-h-screen bg-[var(--tepo-void)] text-[var(--tepo-bone)] flex flex-col items-center justify-center p-4">
      <div className="fixed top-0 left-0 right-0 bg-[var(--tepo-night)] border-b border-[var(--tepo-phantom)] text-center text-xs py-2 text-[var(--tepo-muted)] z-50">
        FOR ENTERTAINMENT & DESIGN SYSTEM DEMONSTRATION ONLY — NO REAL MONEY WAGERING
      </div>

      <div className="mt-12 max-w-4xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[var(--tepo-cyan)] via-[var(--tepo-gold)] to-[var(--tepo-ember)] bg-clip-text text-transparent">
            Te Po Spectre
          </h1>
          <p className="mt-2 text-[var(--tepo-muted)] text-sm">
            Spectre Industries Design System — Playable Demo
          </p>
        </header>

        <div className="flex justify-between items-center mb-4 px-2 text-sm">
          <div>Balance: <span className="text-[var(--tepo-gold)] font-mono">{balance.toFixed(0)}</span></div>
          <div>Bet: <span className="font-mono">{bet}</span></div>
          <div>
            Intensity:{" "}
            <span className="text-[var(--tepo-cyan)] font-mono">
              {lastEvent?.intensity?.toFixed(1) ?? "0.0"}
            </span>
          </div>
        </div>

        <div className="bg-[var(--tepo-night)] border border-[var(--tepo-phantom)] rounded-2xl p-4 shadow-2xl">
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {(lastEvent?.reelWindow ?? (Array(5).fill(["void_rune", "night_fern", "ice_crystal"]) as SymbolId[][])).map(
              (col, reelIdx) => (
                <div key={reelIdx} className="flex flex-col gap-2 items-center">
                  {col.map((sym, rowIdx) => (
                    <Symbol
                      key={`${reelIdx}-${rowIdx}`}
                      id={sym}
                      intensity={spinning ? 0 : lastEvent?.intensity ?? 0}
                      size={72}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            onClick={handleSpin}
            disabled={spinning || balance < bet}
            className={`
              px-12 py-4 rounded-full font-bold text-lg tracking-wider
              bg-gradient-to-r from-[var(--tepo-cyan)] to-[var(--tepo-teal)]
              text-[var(--tepo-void)] shadow-lg
              hover:scale-105 active:scale-95 transition-all
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
              ${!spinning ? "glow-cyan" : ""}
            `}
          >
            {spinning ? "SPINNING…" : "SPIN"}
          </button>

          {lastEvent && lastEvent.totalWin > 0 && (
            <div className="text-center animate-pulse">
              <div className="text-2xl font-bold text-[var(--tepo-gold)] glow-gold">
                +{lastEvent.totalWin.toFixed(0)}
              </div>
              <div className="text-xs text-[var(--tepo-muted)]">
                {lastEvent.winMultiple.toFixed(1)}× • Intensity {lastEvent.intensity}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/design-system"
            className="text-[var(--tepo-cyan)] hover:underline text-sm"
          >
            View Design System →
          </a>
        </div>
      </div>
    </main>
  );
}
