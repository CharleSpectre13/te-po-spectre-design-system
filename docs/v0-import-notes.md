# v0 Design Systems 2.0 – Import Notes for Te Po Spectre

**Primary source:** https://github.com/CharleSpectre13/te-po-spectre-design-system

## What this design system is
A world-class design system for Spectre Industries that enables creation of premium, cinematic slot experiences in the Te Po Spectre style (spectral underworld / night realm, ice-fire dualism, Phantom Gaze, IntensityScaler-driven celebrations).

It is **entertainment / design-system demo only**. No real-money wagering.

## Key Tokens (CSS custom properties)
All colors live under `--tepo-*` in `app/globals.css`:
- Surfaces: `--tepo-void`, `--tepo-night`, `--tepo-surface`, `--tepo-elevated`
- Ice/Phantom: `--tepo-cyan`, `--tepo-cyan-bright`, `--tepo-ice`
- Fire/Legacy: `--tepo-ember`, `--tepo-gold`, `--tepo-gold-bright`
- Text: `--tepo-bone`, `--tepo-muted`
- Glows: `--tepo-glow-cyan`, `--tepo-glow-gold`, `--tepo-glow-ember`

Prefer these variables over hard-coded colors. Tailwind theme is extended from them.

## Core Conventions (important for generation)
1. **IntensityScaler is the single source of truth** for visual energy.
   - Wins and features emit a number `intensity` from 0 to 5.
   - Super mode raises the floor to ~2.8.
   - All celebrations, glows, particle density, and cinematic weight must be driven by this value. Do not invent free-running animations.

2. **Mode contracts**
   - `base` – standard play
   - `free_spins` / “Spectral Descent” – 8 free spins
   - `super` / “Super Floor – God Tier” – 8 free spins + global ×5 multiplier + elevated intensity floor

3. **BookEvent**
   - Every spin produces a deterministic, serializable `BookEvent` containing reel window, paylines, totalWin, intensity, features, and meta.
   - Visual layer consumes the BookEvent; it does not generate its own outcomes.

4. **Disclaimer**
   - Every generated surface that looks like a game must include a clear “For entertainment purposes only. No real money.” notice.

5. **Aesthetic**
   - Dark void backgrounds, electric cyan + molten gold accents, ice-fire dualism, subtle Van Gogh-like energy in motion, high somatic weight on big wins.
   - Abstract / respectful spectral night theme. No literal sacred iconography.

## Recommended components to learn
- `lib/math.ts` – full contracts + IntensityScaler + spin engine
- `app/globals.css` – design tokens
- Future: `components/slot/*` (Symbol, Reel, SlotMachine, WinCelebration)

## Notes for v0
When generating UIs or the full Te Po Spectre slot, always:
- Use the `--tepo-*` token set
- Drive motion and celebration strength from an `intensity` value
- Keep the Super Floor (×5 + intensity floor) and Spectral Descent naming if implementing features
- Maintain the entertainment-only posture

This system is optimized for Next.js + Tailwind + TypeScript on Vercel.
