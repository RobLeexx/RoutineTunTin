import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius } from '../../constants/radius';
import { spacing } from '../../constants/spacing';
import { useThemeMode } from '../../hooks/useThemeMode';

type HomeTemplateProps = {
  children: ReactNode;
};

export function HomeTemplate({ children }: HomeTemplateProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeMode();

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <View
        pointerEvents="none"
        style={[
          styles.glowTop,
          {
            backgroundColor: theme.colors.backgroundAccent,
          },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.glowBottom,
          {
            backgroundColor: theme.colors.surfaceMuted,
          },
        ]}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: insets.bottom + spacing['3xl'],
            paddingTop: insets.top + spacing['3xl'],
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: spacing.xl,
    paddingHorizontal: spacing.screen,
  },
  glowTop: {
    borderRadius: radius.pill,
    height: spacing['4xl'] * 3,
    opacity: 0.32,
    position: 'absolute',
    right: -spacing['3xl'],
    top: -spacing.xl,
    width: spacing['4xl'] * 3,
  },
  glowBottom: {
    borderRadius: radius.pill,
    bottom: -spacing['3xl'],
    height: spacing['4xl'] * 2.5,
    left: -spacing['3xl'],
    opacity: 0.2,
    position: 'absolute',
    width: spacing['4xl'] * 2.5,
  },
});
