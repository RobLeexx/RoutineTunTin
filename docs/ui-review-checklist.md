# UI Review Checklist

## Layout

- Is the screen clearly organized?
- Is the top spacing comfortable after the safe area?
- Does the layout feel mobile-first?

## Hierarchy

- Is there one obvious title?
- Is the primary action easy to find?
- Is supporting copy quieter than the title?

## Tokens

- Do all colors come from `src/constants/colors.ts`?
- Do spacing and radius come from shared tokens?
- Is Space Grotesk applied through `src/constants/fonts.ts`?

## Theme support

- Does the screen look intentional in both light and dark mode?
- Do text and borders remain readable in both modes?

## Accessibility

- Are touch targets large enough?
- Is contrast readable?
- Are controls clearly labeled?

## Quality bar

- Is the result less generic than a default template?
- Did we keep the implementation simple and reusable?
