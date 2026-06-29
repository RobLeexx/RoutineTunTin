import { Pressable, StyleSheet } from 'react-native';

import { radius } from '../../constants/radius';
import { spacing } from '../../constants/spacing';
import { useThemeMode } from '../../hooks/useThemeMode';
import { ThemeMode } from '../../types/theme';
import { AppText } from './AppText';

type ThemeToggleProps = {
  mode: ThemeMode;
  onToggle: () => void | Promise<void>;
};

export function ThemeToggle({ mode, onToggle }: ThemeToggleProps) {
  const { theme } = useThemeMode();
  const nextMode = mode === 'light' ? 'dark' : 'light';
  const icon = mode === 'light' ? '\u263E' : '\u263C';

  return (
    <Pressable
      accessibilityLabel={`Switch to ${nextMode} mode`}
      onPress={onToggle}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? theme.colors.secondary : theme.colors.primary,
          borderColor: pressed ? theme.colors.secondary : theme.colors.primary,
        },
      ]}
    >
      <AppText style={styles.icon} tone="inverse" variant="title">
        {icon}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    height: spacing.touch,
    justifyContent: 'center',
    width: spacing.touch,
  },
  icon: {
    lineHeight: 28,
    textAlign: 'center',
  },
});
