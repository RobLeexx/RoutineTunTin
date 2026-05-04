import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemeColors, ThemeMode } from '../constants/colors';
import { spacing } from '../constants/spacing';

type ThemeToggleProps = {
  colors: ThemeColors;
  mode: ThemeMode;
  onToggle: () => void | Promise<void>;
};

export function ThemeToggle({ colors, mode, onToggle }: ThemeToggleProps) {
  const nextLabel = mode === 'light' ? 'Dark' : 'Light';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        void onToggle();
      }}
      style={[
        styles.button,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: colors.accent }]} />
      <Text style={[styles.label, { color: colors.text }]}>{nextLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: spacing.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 18,
  },
  dot: {
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
});

