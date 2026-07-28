// lib/tokens.ts
// Te Po Spectre Design Tokens – single source of truth for v0 / design system

export const colors = {
  void: "#03010A",
  night: "#0A0614",
  surface: "#120C24",
  elevated: "#1A1235",
  phantom: "#2E1A5E",
  cyan: "#00E5D0",
  cyanBright: "#5EFBF0",
  ice: "#A8D8FF",
  teal: "#00C2A8",
  gold: "#F5C542",
  goldBright: "#FFE08A",
  ember: "#FF4D2E",
  emberSoft: "#FF8A3D",
  bone: "#F2EDE4",
  muted: "#9B93B0",
} as const;

export const glows = {
  cyan: "0 0 24px rgba(0, 229, 208, 0.45)",
  gold: "0 0 28px rgba(245, 197, 66, 0.5)",
  ember: "0 0 20px rgba(255, 77, 46, 0.4)",
} as const;

export const motion = {
  spinDuration: "1.6s",
  stopStagger: "100ms",
  winPulse: "0.6s",
  easeAnticipation: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeStop: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const intensityLevels = {
  0: { label: "None", glow: "none", particles: 0, scale: 1 },
  1: { label: "Whisper", glow: "cyan", particles: 8, scale: 1.02 },
  2: { label: "Phantom", glow: "cyan", particles: 20, scale: 1.05 },
  3: { label: "Spectral", glow: "gold", particles: 40, scale: 1.08 },
  4: { label: "Descent", glow: "gold", particles: 70, scale: 1.12 },
  5: { label: "God Tier", glow: "ember", particles: 120, scale: 1.18 },
} as const;

export type IntensityLevel = keyof typeof intensityLevels;
