// lib/math.ts
// Te Po Spectre – Demo Spin Engine (Entertainment Only)
// Spectre Industries Design System

export type SymbolId =
  | "void_rune"
  | "night_fern"
  | "ice_crystal"
  | "ember_shard"
  | "golden_crown"
  | "phantom_mask"
  | "phantom_gaze"
  | "void_portal";

export const SYMBOLS: Record<SymbolId, { name: string; tier: "low" | "mid" | "high" | "wild" | "scatter" }> = {
  void_rune:     { name: "Void Rune",     tier: "low" },
  night_fern:    { name: "Night Fern",    tier: "low" },
  ice_crystal:   { name: "Ice Crystal",   tier: "mid" },
  ember_shard:   { name: "Ember Shard",   tier: "mid" },
  golden_crown:  { name: "Golden Crown",  tier: "high" },
  phantom_mask:  { name: "Phantom Mask",  tier: "high" },
  phantom_gaze:  { name: "Phantom Gaze",  tier: "wild" },
  void_portal:   { name: "Void Portal",   tier: "scatter" },
};

const REEL_STRIP: SymbolId[] = [
  "void_rune", "void_rune", "night_fern", "ice_crystal", "ember_shard",
  "void_rune", "night_fern", "golden_crown", "ice_crystal", "phantom_mask",
  "void_rune", "ember_shard", "night_fern", "void_portal", "ice_crystal",
  "phantom_gaze", "void_rune", "night_fern", "ember_shard", "golden_crown",
  "void_rune", "ice_crystal", "phantom_mask", "night_fern", "void_rune",
  "ember_shard", "void_portal", "ice_crystal", "night_fern", "golden_crown",
];

export type GameMode = "base" | "free_spins" | "super";

export interface ModeContract {
  id: GameMode;
  displayName: string;
  intensityFloor: number;
  winMultiplier: number;
  fsAwarded?: number;
}

export const MODE_CONTRACTS: Record<GameMode, ModeContract> = {
  base: {
    id: "base",
    displayName: "Base Game",
    intensityFloor: 0,
    winMultiplier: 1,
  },
  free_spins: {
    id: "free_spins",
    displayName: "Spectral Descent",
    intensityFloor: 1.5,
    winMultiplier: 1,
    fsAwarded: 8,
  },
  super: {
    id: "super",
    displayName: "Super Floor – God Tier",
    intensityFloor: 2.8,
    winMultiplier: 5,
    fsAwarded: 8,
  },
};

const PAYTABLE: Partial<Record<SymbolId, Record<number, number>>> = {
  void_rune:    { 3: 5,  4: 15,  5: 40 },
  night_fern:   { 3: 5,  4: 15,  5: 40 },
  ice_crystal:  { 3: 10, 4: 30,  5: 80 },
  ember_shard:  { 3: 10, 4: 30,  5: 80 },
  golden_crown: { 3: 25, 4: 80,  5: 200 },
  phantom_mask: { 3: 25, 4: 80,  5: 200 },
  phantom_gaze: { 3: 50, 4: 150, 5: 400 },
};

export function calculateIntensity(winMultiple: number, mode: GameMode): number {
  let level = 0;
  if (winMultiple >= 1) level = 1;
  if (winMultiple >= 5) level = 2;
  if (winMultiple >= 15) level = 3;
  if (winMultiple >= 40) level = 4;
  if (winMultiple >= 100) level = 5;

  const floor = MODE_CONTRACTS[mode].intensityFloor;
  return Math.min(5, Math.max(level, floor));
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface PaylineWin {
  lineId: number;
  symbol: SymbolId;
  count: number;
  multiplier: number;
  win: number;
}

export interface BookEvent {
  id: string;
  seed: number;
  mode: GameMode;
  reelWindow: SymbolId[][];
  paylines: PaylineWin[];
  totalWin: number;
  winMultiple: number;
  featuresTriggered: { type: string; count?: number }[];
  intensity: number;
  meta: {
    isDemo: true;
    realMoneyEligible: false;
    engine: string;
    disclaimer: string;
  };
}

const PAYLINES = [
  [1,1,1,1,1],
  [0,0,0,0,0],
  [2,2,2,2,2],
  [0,1,2,1,0],
  [2,1,0,1,2],
];

export function spin(
  bet: number = 1,
  mode: GameMode = "base",
  seed?: number
): BookEvent {
  const actualSeed = seed ?? Date.now() % 1_000_000_000;
  const rand = mulberry32(actualSeed);

  const reelWindow: SymbolId[][] = [];
  for (let r = 0; r < 5; r++) {
    const start = Math.floor(rand() * REEL_STRIP.length);
    const col: SymbolId[] = [];
    for (let row = 0; row < 3; row++) {
      col.push(REEL_STRIP[(start + row) % REEL_STRIP.length]);
    }
    reelWindow.push(col);
  }

  const paylines: PaylineWin[] = [];
  let totalWin = 0;

  PAYLINES.forEach((line, lineId) => {
    const symbolsOnLine = line.map((row, reel) => reelWindow[reel][row]);
    let paySymbol: SymbolId | null = null;
    let count = 0;

    for (const sym of symbolsOnLine) {
      if (sym === "phantom_gaze") {
        count++;
        continue;
      }
      if (paySymbol === null) {
        paySymbol = sym;
        count++;
      } else if (sym === paySymbol) {
        count++;
      } else {
        break;
      }
    }

    if (paySymbol === null && count >= 3) {
      paySymbol = "phantom_gaze";
    }

    if (paySymbol && count >= 3 && PAYTABLE[paySymbol]?.[count]) {
      const mult = PAYTABLE[paySymbol]![count];
      const win = bet * mult * MODE_CONTRACTS[mode].winMultiplier;
      paylines.push({ lineId, symbol: paySymbol, count, multiplier: mult, win });
      totalWin += win;
    }
  });

  const scatterCount = reelWindow.flat().filter(s => s === "void_portal").length;
  const featuresTriggered: { type: string; count?: number }[] = [];
  if (scatterCount >= 3) {
    featuresTriggered.push({ type: "scatter_fs", count: scatterCount });
  }

  const winMultiple = bet > 0 ? totalWin / bet : 0;
  const intensity = calculateIntensity(winMultiple, mode);

  return {
    id: `spin_${actualSeed}_${Date.now()}`,
    seed: actualSeed,
    mode,
    reelWindow,
    paylines,
    totalWin,
    winMultiple,
    featuresTriggered,
    intensity,
    meta: {
      isDemo: true,
      realMoneyEligible: false,
      engine: "Spectre-Design-System-Demo-v1",
      disclaimer: "Entertainment and design-system demonstration only. No real money wagering."
    }
  };
}

export function simulate(spins: number = 10000, bet = 1, mode: GameMode = "base") {
  let totalWin = 0;
  let hits = 0;
  for (let i = 0; i < spins; i++) {
    const result = spin(bet, mode, i * 9973 + 42);
    totalWin += result.totalWin;
    if (result.totalWin > 0) hits++;
  }
  return {
    spins,
    totalBet: spins * bet,
    totalWin,
    rtp: (totalWin / (spins * bet)) * 100,
    hitFrequency: (hits / spins) * 100
  };
}
