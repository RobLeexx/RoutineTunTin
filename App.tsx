import { AppNavigator } from './src/app/AppNavigator';
import { useThemeMode } from './src/hooks/useThemeMode';

export default function App() {
  const { colors, isDark, isReady, mode, toggleMode } = useThemeMode();

  if (!isReady) {
    return null;
  }

  return (
    <AppNavigator
      colors={colors}
      isDark={isDark}
      mode={mode}
      onToggleTheme={toggleMode}
    />
  );
}
