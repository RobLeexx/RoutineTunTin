import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors, ThemeMode } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { ThemeToggle } from './ThemeToggle';

type HeaderProps = {
  colors: ThemeColors;
  mode: ThemeMode;
  pendingCount: number;
  onToggleTheme: () => void | Promise<void>;
};

export function Header({ colors, mode, pendingCount, onToggleTheme }: HeaderProps) {
  const subtitle =
    pendingCount === 0
      ? 'Everything is clear for now.'
      : `${pendingCount} pending ${pendingCount === 1 ? 'task' : 'tasks'}`;

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={[styles.eyebrow, { color: colors.accent }]}>Daily Focus</Text>
        <Text style={[styles.title, { color: colors.text }]}>Todo Flow</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
      </View>
      <ThemeToggle colors={colors} mode={mode} onToggle={onToggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  textBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
  },
});

