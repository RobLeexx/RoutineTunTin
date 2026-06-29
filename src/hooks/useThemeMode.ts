import { useContext } from 'react';

import { ThemeModeContext } from '../app/AppProvider';

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used inside AppProvider');
  }

  return context;
}
