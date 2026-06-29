import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  useFonts,
} from '@expo-google-fonts/space-grotesk';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createTheme } from '../constants/theme';
import { getStoredThemeMode, setStoredThemeMode } from '../storage/themeStorage';
import { AppTheme, ThemeMode } from '../types/theme';

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => Promise<void>;
  theme: AppTheme;
  toggleMode: () => Promise<void>;
};

export const ThemeModeContext = createContext<ThemeContextValue | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
  });

  useEffect(() => {
    let isMounted = true;

    const loadMode = async () => {
      const storedMode = await getStoredThemeMode();

      if (!isMounted) {
        return;
      }

      setModeState(storedMode);
      setIsReady(true);
    };

    void loadMode();

    return () => {
      isMounted = false;
    };
  }, []);

  const setMode = async (nextMode: ThemeMode) => {
    setModeState(nextMode);
    await setStoredThemeMode(nextMode);
  };

  const toggleMode = async () => {
    const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light';
    await setMode(nextMode);
  };

  const value = useMemo(
    () => ({
      mode,
      setMode,
      theme: createTheme(mode),
      toggleMode,
    }),
    [mode],
  );

  if (!isReady || (!fontsLoaded && !fontError)) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
    </SafeAreaProvider>
  );
}
