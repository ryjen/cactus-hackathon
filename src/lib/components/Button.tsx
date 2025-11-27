import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Text } from '@/lib/components/Text';
import { Theme } from '@/lib/core/theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary';
}

export function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
    const backgroundColor = variant === 'primary' ? Theme.colors.primary : Theme.colors.secondary;
    const textColor = Theme.colors.onPrimary;

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, style]}
            {...props}
        >
            <Text style={{ color: textColor, fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity>
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
