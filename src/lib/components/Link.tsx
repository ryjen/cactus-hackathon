import { TouchableOpacity, StyleSheet, TouchableOpacityProps, } from 'react-native';
import { Text } from '@/lib/components/Text';
import { Theme } from '@/lib/core/theme';
import { Link as ExpoLink, LinkProps as RNLinkProps } from 'expo-router';

interface LinkProps extends RNLinkProps {
    href: string;
    title: string;
    variant?: 'primary' | 'secondary';
}

export function Link({ href, title, variant = 'primary', style, ...props }: LinkProps) {
    const backgroundColor = variant === 'primary' ? Theme.colors.primary : Theme.colors.secondary;
    const textColor = Theme.colors.onPrimary;

    return (
        <ExpoLink href={href}
            style={[styles.button, { backgroundColor }, style]}
            {...props}
        >
            <Text style={{ color: textColor, fontWeight: 'bold' }}>{title}</Text>
        </ExpoLink>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: Theme.spacing(3),
        paddingHorizontal: Theme.spacing(4),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
