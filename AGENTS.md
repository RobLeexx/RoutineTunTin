# AGENTS.md

## Project Overview

- Routine TunTin is a minimal React Native + Expo + TypeScript starter.
- The only app feature is global light/dark theme switching with local persistence.
- Keep the app calm, premium, mobile-first, and intentionally minimal.
- Do not reintroduce Todo or task-management features unless explicitly requested.

## Architecture Rules

- Keep the app organized around Atomic Design and small focused files.
- Prefer composition over branching screen logic.
- Keep the current app shape:
  - `src/app` for providers
  - `src/components` for atoms, molecules, organisms, and templates
  - `src/constants` for global design tokens and theme builders
  - `src/hooks` for app-facing hooks
  - `src/screens` for screen composition only
  - `src/storage` for persistence helpers
  - `src/types` for shared app types
- Preserve Expo and React Native compatibility with the existing dependency set unless a change is required.

## UI Rules

- Always read [docs/design-system.md](/c:/odoo/RoutineTunTin/docs/design-system.md) before changing UI.
- Always review [docs/ui-review-checklist.md](/c:/odoo/RoutineTunTin/docs/ui-review-checklist.md) before finishing UI work.
- Support both light and dark mode on every surface you touch.
- Respect safe areas with `react-native-safe-area-context`.
- Keep layouts mobile-first with generous top spacing and steady vertical rhythm.
- Avoid generic template-looking screens.

## Theme System Rules

- Theme mode defaults to light.
- Theme mode is the only persisted app preference.
- Apply the active theme globally through the provider and hook layer.
- Reuse the theme object instead of duplicating color decisions in components.

## Global Token Rules

- Do not hardcode colors, spacing, radius, or font values inside components.
- Use shared constants from `src/constants`.
- Add missing tokens centrally before reaching for ad hoc values.
- Keep the palette inside the existing purple and lavender direction.

## Font Rules

- Use Space Grotesk through the shared font tokens in `src/constants/fonts.ts`.
- Keep headings and body text on the shared typography variants.
- Do not introduce random font families or one-off text styling systems.

## Atomic Design Conventions

- Atoms stay primitive and reusable.
- Molecules combine a few atoms into a focused unit.
- Organisms shape meaningful sections.
- Templates handle layout.
- Screens compose templates and pass state down.

## Coding Style

- Keep components small, typed, and reusable.
- Prefer deletion over adding abstraction.
- Remove unused code, imports, and files during refactors.
- Keep props explicit and TypeScript-friendly.

## Must Not Return

- No Todo UI
- No task CRUD flows
- No task storage
- No task types or hooks
- No hardcoded styling values inside components
- No one-off visual systems outside the shared tokens
