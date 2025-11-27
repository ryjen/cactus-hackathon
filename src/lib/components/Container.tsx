import { View, ViewProps, StyleSheet } from 'react-native';
import { Theme } from '../core/theme';

interface ContainerProps extends ViewProps {
    centered?: boolean;
}

export function Container({ centered, style, children, ...props }: ContainerProps) {
    return (
        <View
            style={[
                styles.container,
                centered && styles.centered,
                style,
            ]}
            {...props}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        padding: Theme.spacing(4),
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
