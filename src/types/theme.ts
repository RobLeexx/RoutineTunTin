import { TextStyle } from 'react-native';

export type ThemeMode = 'dark' | 'light';

export type ThemeColors = {
  background: string;
  backgroundAccent: string;
  border: string;
  mutedText: string;
  primary: string;
  primarySoft: string;
  secondary: string;
  surface: string;
  surfaceMuted: string;
  surfaceStrong: string;
  text: string;
  textInverse: string;
};

export type ThemeFontFamilies = {
  body: string;
  bodyMedium: string;
  heading: string;
};

export type ThemeTextVariant = 'body' | 'button' | 'eyebrow' | 'hero' | 'subtitle' | 'title';

export type ThemeTextStyles = Record<ThemeTextVariant, TextStyle>;

export type TokenScale = Readonly<Record<string, number>>;

export type AppTheme = {
  colors: ThemeColors;
  fonts: ThemeFontFamilies;
  isDark: boolean;
  mode: ThemeMode;
  radius: TokenScale;
  spacing: TokenScale;
  textVariants: ThemeTextStyles;
};
