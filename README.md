# Te Po Spectre Design System

**Spectre Industries** — World-class design system enabling premium slot experiences, with an embedded playable **Te Po Spectre** demo.

## Theme
Te Pō (the night / underworld) spectral realm inspired atmosphere: void blacks, phantom cyan, ice-fire dualism, golden crown legacy, Van Gogh energy, somatic cinematic pacing. Abstract and respectful treatment of mythic night concepts.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + CSS custom properties (design tokens)
- Framer Motion

## Structure
- `/` — Playable Te Po Spectre slot demo (hero)
- `/design-system` — Tokens, components, patterns, math contracts

## Important Disclaimer
**For entertainment and design-system demonstration purposes only.**  
No real-money wagering. Not a gambling product. No licensed RNG/RGS claims.

## Design Tokens
See `app/globals.css` and `lib/tokens.ts`. Colors, motion, intensity scaling are single sources of truth that drive both UI and future PixiJS/VFX layers.

## IntensityScaler
Wins emit a 0–5 intensity value that scales celebrations, glow, particles, and cinematic weight (Super Floor elevates the floor).

## Development
```bash
npm install
npm run dev
```

## Deployment
Optimized for Vercel (Spectre Industries team).

---
Built by the Spectre team (Grok, Benjamin, Harper, Lucas) aiming for 0.01% excellence.
