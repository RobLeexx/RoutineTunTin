import { HomeScreen } from '../screens/HomeScreen';
import { ThemeColors, ThemeMode } from '../constants/colors';

type AppNavigatorProps = {
  colors: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
  onToggleTheme: () => void | Promise<void>;
};

export function AppNavigator({ colors, isDark, mode, onToggleTheme }: AppNavigatorProps) {
  return <HomeScreen colors={colors} isDark={isDark} mode={mode} onToggleTheme={onToggleTheme} />;
}
