# Design System

## Product personality

Routine TunTin is a calm, premium, focused starter app. The interface should feel polished, quiet, and practical rather than feature-heavy.

## Design principles

- Calm, not playful
- Premium, not corporate
- Minimal, not empty
- Token-first, not ad hoc
- Mobile-first, not desktop-adapted

## Visual identity

- Style: subtle purple glass-inspired surfaces
- Typography: Space Grotesk through shared font tokens
- Motion: fade-only when motion is needed
- Layout: safe-area-aware, single-column, generous top spacing
- Avoid: generic white cards, default blue accents, noisy overlays, clutter

## Tokens

Defined in `src/constants`.

- `colors.ts`: primary, secondary, background, surface, text, border
- `fonts.ts`: Space Grotesk families and text variants
- `spacing.ts`: layout rhythm and touch sizes
- `radius.ts`: shared corner sizes
- `theme.ts`: assembled app theme

Rules:

- Never hardcode new colors in components.
- Prefer shared spacing and radius tokens.
- Keep purple and lavender surfaces subtle and readable.

## Layout rules

- Prefer a single-column composition.
- Add comfortable top padding after the safe area.
- Keep one clear title, one supporting subtitle, and one obvious primary action.
- Use decorative background shapes only behind content.

## Light and dark mode

- Light mode should feel pale lavender and airy.
- Dark mode should feel deep violet and calm, not flat charcoal.
- Both modes must preserve contrast and hierarchy.

## Accessibility

- Keep touch targets around `44px` minimum.
- Maintain readable contrast in both modes.
- Do not rely on color alone to convey meaning.

## Anti-generic check

- Are shared purple tokens used consistently?
- Is Space Grotesk applied through shared variants?
- Is the layout calm and intentional?
- Does the screen feel lighter than a generic starter template?
