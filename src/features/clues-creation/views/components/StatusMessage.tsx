import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, type TextStyle } from 'react-native';

const defaultMessages = [
    '🕵️‍♂️ Spy activated!',
    '🔍 Searching for clues...',
    '💼 Mission in progress...',
    '🚁 Extraction imminent...',
];

interface MessageRotatorProps {
    interval?: number;
    custom?: string[];
    textStyle?: TextStyle;
}

const MessageRotator = ({ interval = 3000, custom = [], textStyle }: MessageRotatorProps) => {
    const opacity = useRef(new Animated.Value(0)).current;

    const messages = useMemo(() => [...custom, ...defaultMessages], [custom]);
    const [index, setIndex] = useState(0);


    const fadeIn = useCallback(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [opacity]);

    const fadeOut = useCallback(() => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setIndex((prev) => (prev + 1) % messages.length);
            fadeIn();
        });
    }, [messages, fadeIn, opacity]);

    useEffect(() => {
        fadeIn();
        const timer = setInterval(() => {
            fadeOut();
        }, interval);
        return () => clearInterval(timer);
    }, [interval, fadeOut, fadeIn]);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, textStyle, { opacity }]}>
                {messages[index]}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default MessageRotator;
