---
name: mobile-ui-designer
description: Design and polish React Native mobile interfaces with a premium, token-driven system. Use when Codex is designing React Native screens, improving mobile UI, creating components, reviewing visual polish, implementing design tokens, enhancing light/dark mode, adding microinteractions, or improving a screen that feels generic.
---

# Mobile UI Designer

Act like a senior mobile UI designer and React Native engineer.

## Start here

Inspect the existing design system before changing UI:

- [docs/design-system.md](../../../docs/design-system.md)
- [docs/ui-review-checklist.md](../../../docs/ui-review-checklist.md)
- `src/constants/colors.ts`
- `src/constants/spacing.ts`
- `src/constants/radius.ts`
- `src/constants/typography.ts`
- `src/constants/shadows.ts`
- `src/constants/opacity.ts`
- `src/constants/zIndex.ts`
- `src/hooks/useThemeMode.ts`
- related components and screen files

## Workflow

1. Inspect the current tokens, theme hooks, components, and screen structure.
2. Reuse project tokens before introducing new visual values.
3. If tokens are missing, add them centrally instead of hardcoding colors or arbitrary spacing inside components.
4. Improve hierarchy, composition, spacing, and state clarity without changing behavior unless the task requests it.
5. Keep the implementation Expo-compatible, React Native-friendly, and type-safe.

## Project Visual Identity

- Style: Purple glassmorphism Bento productivity UI
- Typography: Space Grotesk, simple but slightly exotic
- Colors: violet, lavender, deep purple-black, pale lavender-white
- Motion: fade transitions only unless explicitly requested otherwise
- Layout: generous top margins, safe-area-aware spacing, rounded glass cards
- Avoid: generic white cards, default blue accents, random gradients, harsh shadows, playful fonts, cluttered dashboards

## Design direction

- Prefer Bento-style cards for dashboard-like or summary content.
- Keep layouts minimalist, mobile-first, and productivity-focused.
- Use calm purple accents, rounded cards, soft spacing, and restrained depth.
- Use glass or liquid-inspired surfaces sparingly:
  - only for headers, floating actions, highlighted cards, or overlays
  - never reduce readability
  - always include borders or contrast when using transparency

## Visual hierarchy

Apply a clear structure:

- one main title
- one clear subtitle or context line
- one obvious primary action
- quieter secondary actions
- grouped content with consistent spacing

## Components and states

- Prefer reusable components over one-off inline styling.
- Add empty states with a friendly but minimal design.
- Keep task or state badges readable and semantically clear.
- Preserve light and dark mode quality for every surface.

## Motion and feedback

- Use microinteractions only when they improve feedback.
- Good cases include task completion, modal opening, item deletion, or theme changes.
- Avoid overengineering and unnecessary dependencies.
- If animation support beyond the current stack is needed, ask before adding a library.

## Glassmorphism Safety Rules

- Use glass as a surface, not as a decoration layer.
- Avoid stacking multiple translucent surfaces.
- Do not place blur overlays above readable content.
- Decorative blobs must be behind content, clipped, and optional.
- On Android, prefer translucent fallback surfaces if blur looks unstable.
- Every glass component must preserve text contrast.
- Reduce blur intensity before adding more effects.
- If the UI feels noisy, remove effects instead of adding more.

## Layout Stability Rules

- Use safe-area-context for top and bottom spacing.
- Avoid manual status bar offsets.
- Avoid absolute positioning except for FAB or background-only effects.
- Add bottom padding when using a FAB.
- Use FlatList or ScrollView spacing instead of manual stacked margins where possible.
- Cards must have predictable sizes.
- No component should visually overlap another unless it is an intentional overlay.

## Accessibility

- Keep touch targets around 44px minimum.
- Maintain readable contrast in both themes.
- Add accessibility labels for icon-only or ambiguous controls.
- Never convey information only by color.

## Review checklist

Verify before finishing:

- Are purple tokens used consistently?
- Is the typography using the configured font tokens?
- Are glass effects readable and not excessive?
- Are transitions fade-based and subtle?
- Is top spacing comfortable?
- Does the screen feel less like a generic template?
- Is the glass treatment subtle and readable on both iOS and Android?
- Is the layout stable with no accidental overlap or drifting elements?

## Final step

End every UI task with a short `Visual QA` summary covering hierarchy, spacing consistency, theme support, state handling, touch targets, and whether the result feels less generic than a default template.
