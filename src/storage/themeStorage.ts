import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeMode } from '../types/theme';

const themeStorageKey = 'routine-tuntin:theme-mode';

export async function getStoredThemeMode(): Promise<ThemeMode> {
  try {
    const value = await AsyncStorage.getItem(themeStorageKey);
    return value === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export async function setStoredThemeMode(mode: ThemeMode) {
  await AsyncStorage.setItem(themeStorageKey, mode);
}
