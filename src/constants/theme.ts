import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { getThemeColors } from './colors';
import { fontFamily, textVariants } from './fonts';
import { radius } from './radius';
import { spacing } from './spacing';
import { AppTheme, ThemeMode } from '../types/theme';

export function createTheme(mode: ThemeMode): AppTheme {
  return {
    colors: getThemeColors(mode),
    fonts: fontFamily,
    isDark: mode === 'dark',
    mode,
    radius,
    spacing,
    textVariants,
  };
}

export function createPaperTheme(theme: AppTheme) {
  const baseTheme = theme.isDark ? MD3DarkTheme : MD3LightTheme;

  return {
    ...baseTheme,
    roundness: theme.radius.md,
    colors: {
      ...baseTheme.colors,
      background: theme.colors.background,
      onPrimary: theme.colors.textInverse,
      onSecondary: theme.colors.textInverse,
      onSurface: theme.colors.text,
      onSurfaceVariant: theme.colors.mutedText,
      outline: theme.colors.border,
      outlineVariant: theme.colors.border,
      primary: theme.colors.primary,
      primaryContainer: theme.colors.primarySoft,
      secondary: theme.colors.secondary,
      secondaryContainer: theme.colors.surfaceMuted,
      surface: theme.colors.surfaceStrong,
      surfaceDisabled: theme.colors.surfaceMuted,
      surfaceVariant: theme.colors.surfaceMuted,
    },
    fonts: {
      ...baseTheme.fonts,
      bodyLarge: {
        ...baseTheme.fonts.bodyLarge,
        fontFamily: theme.fonts.body,
      },
      bodyMedium: {
        ...baseTheme.fonts.bodyMedium,
        fontFamily: theme.fonts.body,
      },
      bodySmall: {
        ...baseTheme.fonts.bodySmall,
        fontFamily: theme.fonts.body,
      },
      headlineMedium: {
        ...baseTheme.fonts.headlineMedium,
        fontFamily: theme.fonts.heading,
      },
      headlineSmall: {
        ...baseTheme.fonts.headlineSmall,
        fontFamily: theme.fonts.heading,
      },
      labelLarge: {
        ...baseTheme.fonts.labelLarge,
        fontFamily: theme.fonts.bodyMedium,
      },
      titleLarge: {
        ...baseTheme.fonts.titleLarge,
        fontFamily: theme.fonts.heading,
      },
      titleMedium: {
        ...baseTheme.fonts.titleMedium,
        fontFamily: theme.fonts.heading,
      },
    },
  };
}
