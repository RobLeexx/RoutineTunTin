import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  tasks: 'routine-tuntin:tasks',
  themeMode: 'routine-tuntin:theme-mode',
} as const;

export async function setStorageItem<T>(key: string, value: T) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getStorageItem<T>(key: string, fallback: T): Promise<T> {
  const value = await AsyncStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

