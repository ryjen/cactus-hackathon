import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

export function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eyespie</Text>
            <Link href="/features/camera" style={styles.link}>
                <Text>New Game</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    link: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
});
