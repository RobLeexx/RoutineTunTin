import { TextStyle } from 'react-native';

export const fontFamily = {
  body: 'SpaceGrotesk_400Regular',
  bodyMedium: 'SpaceGrotesk_500Medium',
  heading: 'SpaceGrotesk_600SemiBold',
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  '2xl': 34,
} as const;

export const lineHeight = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 26,
  xl: 30,
  '2xl': 40,
} as const;

export type TextVariant = 'body' | 'button' | 'eyebrow' | 'hero' | 'subtitle' | 'title';

export const textVariants: Record<TextVariant, TextStyle> = {
  body: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.md,
  },
  button: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.md,
  },
  eyebrow: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: 1,
    lineHeight: lineHeight.xs,
    textTransform: 'uppercase',
  },
  hero: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    letterSpacing: -0.8,
    lineHeight: lineHeight['2xl'],
  },
  subtitle: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.lg,
  },
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    letterSpacing: -0.4,
    lineHeight: lineHeight.xl,
  },
};
