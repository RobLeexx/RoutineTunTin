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
