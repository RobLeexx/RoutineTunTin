import { StyleSheet, View } from 'react-native';

import { ThemeToggle } from '../components/atoms/ThemeToggle';
import { HomeHeader } from '../components/organisms/HomeHeader';
import { HomeTemplate } from '../components/templates/HomeTemplate';
import { spacing } from '../constants/spacing';
import { useThemeMode } from '../hooks/useThemeMode';

export function HomeScreen() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <HomeTemplate>
      <View style={styles.stack}>
        <View style={styles.headerRow}>
          <HomeHeader />
          <ThemeToggle mode={mode} onToggle={toggleMode} />
        </View>
      </View>
    </HomeTemplate>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stack: {
    gap: spacing.xl,
  },
});
