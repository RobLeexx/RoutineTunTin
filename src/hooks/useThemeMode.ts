import { useEffect, useMemo, useState } from 'react';

import { ThemeMode, getThemeColors } from '../constants/colors';
import { getStorageItem, setStorageItem, storageKeys } from '../utils/storage';

export function useThemeMode() {
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadThemeMode = async () => {
      const savedMode = await getStorageItem<ThemeMode>(storageKeys.themeMode, 'light');
      setModeState(savedMode);
      setIsReady(true);
    };

    void loadThemeMode();
  }, []);

  const setMode = async (nextMode: ThemeMode) => {
    setModeState(nextMode);
    await setStorageItem(storageKeys.themeMode, nextMode);
  };

  const toggleMode = async () => {
    const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light';
    await setMode(nextMode);
  };

  const colors = useMemo(() => getThemeColors(mode), [mode]);

  return {
    mode,
    setMode,
    toggleMode,
    colors,
    isReady,
    isDark: mode === 'dark',
  };
}

