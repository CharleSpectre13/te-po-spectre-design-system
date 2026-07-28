# Te Po Spectre Design System

**Spectre Industries** — World-class design system for premium spectral slot experiences, optimized for **v0 Design Systems 2.0** import and Vercel deployment.

## Theme
Te Pō (the night / underworld) spectral realm: void blacks, phantom cyan, ice-fire dualism, golden crown legacy, Van Gogh energy, somatic cinematic pacing. Abstract and respectful treatment of mythic night concepts.

## Import into v0 DS 2.0
1. Go to [v0.app/design-systems](https://v0.app/design-systems)
2. Click **Import your design system** / New
3. Point v0 at this GitHub repository: `https://github.com/CharleSpectre13/te-po-spectre-design-system`
4. Optionally add the live Vercel deployment as a consumer app source
5. v0 will learn tokens, components (Symbol, etc.), IntensityScaler conventions, Mode Contracts, and generate UIs that respect them.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + CSS custom properties (design tokens)
- Framer Motion ready

## Structure
- `/` — Playable Te Po Spectre slot demo (hero)
- `/design-system` — Live tokens, IntensityScaler map, Mode Contracts, Symbol gallery, conventions
- `lib/tokens.ts` — Single source of truth for colors, motion, intensity levels
- `lib/math.ts` — Deterministic BookEvent engine + IntensityScaler + Mode Contracts
- `components/slot/Symbol.tsx` — Intensity-aware symbol component

## Design Tokens
See `app/globals.css` and `lib/tokens.ts`. Colors, motion, and intensity scaling drive both UI and future PixiJS/VFX layers.

## IntensityScaler
Wins emit a 0–5 intensity value that scales celebrations, glow, particles, and cinematic weight. Super Floor elevates the floor.

## Important Disclaimer
**For entertainment and design-system demonstration purposes only.**  
No real-money wagering. Not a gambling product. No licensed RNG/RGS claims.

## Development
```bash
npm install
npm run dev
```

## Deployment
Optimized for Vercel (Spectre Industries team).

---
Built by the Spectre team (Grok, Benjamin, Harper, Lucas) aiming for 0.01% excellence.
Ready for v0 DS 2.0 import.
