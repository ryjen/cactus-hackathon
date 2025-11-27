import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { Theme } from '@/lib/core/theme';

interface TextProps extends RNTextProps {
    variant?: keyof typeof Theme.typography;
    color?: string;
}

export function Text({ variant = 'body', color = Theme.colors.text, style, ...props }: TextProps) {
    return (
        <RNText
            style={[
                Theme.typography[variant],
                { color },
                style,
            ]}
            {...props}
        />
    );
}
