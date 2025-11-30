import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Link, Text } from '@/lib/components';
import React from 'react';
import { Theme } from '@/lib/core/theme';

export function WelcomeView({ style }: { style?: StyleProp<ViewStyle> }) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.subText}>to Eyespie</Text>
            <View style={styles.spacer} />
            <Link href="/features/game-share" style={styles.link} title="New Game" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Theme.colors.outline,
        letterSpacing: 2,
    },
    subText: {
        fontSize: 18,
        color: Theme.colors.outline,
        opacity: 0.9,
        marginTop: 4,
    },
    spacer: {
        height: 40,
    },
    link: {
        padding: 10,
        borderRadius: 5,
    },
});
