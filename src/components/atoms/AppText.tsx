import { ReactNode } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { TextVariant, textVariants } from '../../constants/fonts';
import { useThemeMode } from '../../hooks/useThemeMode';

type AppTextProps = TextProps & {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  tone?: 'inverse' | 'muted' | 'primary';
  variant?: TextVariant;
};

const toneStyles = {
  inverse: 'textInverse',
  muted: 'mutedText',
  primary: 'text',
} as const;

export function AppText({ children, style, tone = 'primary', variant = 'body', ...rest }: AppTextProps) {
  const { theme } = useThemeMode();

  return (
    <Text
      {...rest}
      style={[
        textVariants[variant],
        { color: theme.colors[toneStyles[tone]] },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
