import { ThemeColors, ThemeMode } from '../types/theme';

const brandColors = {
  primary: '#FF4F00',
  primarySoft: '#F8F4F0',
  secondary: '#201515',
} as const;

const palettes: Record<ThemeMode, Omit<ThemeColors, 'primary' | 'primarySoft' | 'secondary'>> = {
  dark: {
    background: '#201515',
    backgroundAccent: '#2F2A26',
    border: 'rgba(197,192,177,0.24)',
    mutedText: '#C5C0B1',
    surface: 'rgba(255,254,251,0.06)',
    surfaceMuted: 'rgba(255,254,251,0.10)',
    surfaceStrong: 'rgba(255,254,251,0.14)',
    text: '#FFFEFB',
    textInverse: '#FFFEFB',
  },
  light: {
    background: '#FFFEFB',
    backgroundAccent: '#F8F4F0',
    border: 'rgba(32,21,21,0.12)',
    mutedText: '#605D52',
    surface: 'rgba(248,244,240,0.9)',
    surfaceMuted: 'rgba(248,244,240,0.96)',
    surfaceStrong: 'rgba(255,254,251,0.98)',
    text: '#201515',
    textInverse: '#FFFEFB',
  },
};

export const getThemeColors = (mode: ThemeMode): ThemeColors => ({
  ...brandColors,
  ...palettes[mode],
});
