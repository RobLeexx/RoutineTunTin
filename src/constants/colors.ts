export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  textSoft: string;
  accent: string;
  accentSoft: string;
  accentContrast: string;
  border: string;
  success: string;
  danger: string;
  dangerSoft: string;
  shadow: string;
  overlay: string;
};

const common = {
  accent: '#5C8DFF',
  accentContrast: '#F8FBFF',
  success: '#2E9E72',
  danger: '#D66573',
};

export const themeColors: Record<ThemeMode, ThemeColors> = {
  light: {
    background: '#F4F6FB',
    surface: '#FFFFFF',
    surfaceAlt: '#EEF3FF',
    surfaceMuted: '#F8FAFF',
    text: '#182033',
    textMuted: '#5A657D',
    textSoft: '#8A94AA',
    accent: common.accent,
    accentSoft: '#E2EBFF',
    accentContrast: common.accentContrast,
    border: '#E1E8F5',
    success: common.success,
    danger: common.danger,
    dangerSoft: '#FFE8EC',
    shadow: 'rgba(17, 24, 39, 0.08)',
    overlay: 'rgba(15, 23, 42, 0.32)',
  },
  dark: {
    background: '#111827',
    surface: '#1A2234',
    surfaceAlt: '#202B42',
    surfaceMuted: '#152032',
    text: '#F5F7FC',
    textMuted: '#BBC5D9',
    textSoft: '#93A0BA',
    accent: '#7DA7FF',
    accentSoft: '#243454',
    accentContrast: '#F5F9FF',
    border: '#2A3752',
    success: '#52C39A',
    danger: '#F08A97',
    dangerSoft: '#3C2630',
    shadow: 'rgba(0, 0, 0, 0.28)',
    overlay: 'rgba(2, 6, 23, 0.56)',
  },
};

export const getThemeColors = (mode: ThemeMode) => themeColors[mode];

