import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, type TextStyle } from 'react-native';

interface StatusMessageProps {
    interval?: number;
    messages: string[];
    textStyle?: TextStyle;
}

export const StatusMessage = ({ interval = 3000, messages, textStyle }: StatusMessageProps) => {
    const opacity = useRef(new Animated.Value(0)).current;

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

    if (!messages || messages.length === 0) {
        return null;
    }

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
