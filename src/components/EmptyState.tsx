import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '../constants/colors';
import { spacing } from '../constants/spacing';

type EmptyStateProps = {
  colors: ThemeColors;
};

export function EmptyState({ colors }: EmptyStateProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={[styles.orb, { backgroundColor: colors.accentSoft }]}>
        <View style={[styles.innerOrb, { backgroundColor: colors.accent }]} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>No tasks yet</Text>
      <Text style={[styles.description, { color: colors.textMuted }]}>
        Start with a small win. Add your first task and build momentum from there.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: spacing.radiusLg,
    borderWidth: 1,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 24,
  },
  orb: {
    alignItems: 'center',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    marginBottom: spacing.lg,
    width: 64,
  },
  innerOrb: {
    borderRadius: 12,
    height: 24,
    width: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 280,
    textAlign: 'center',
  },
});

