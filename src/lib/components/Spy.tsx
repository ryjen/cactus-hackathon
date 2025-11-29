import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, type StyleProp, type ViewStyle } from 'react-native';

const SpyRunning = () => {
    return (
        <View style={styles.container}>
            {/* Head */}
            <View style={styles.head} />

            {/* Hat */}
            <View style={styles.hatBrim} />
            <View style={styles.hatTop} />

            {/* Body */}
            <View style={styles.body} />

            {/* Arms */}
            <View style={styles.armLeft} />
            <View style={styles.armRight} />

            {/* Legs */}
            <View style={styles.legLeft} />
            <View style={styles.legRight} />
        </View>
    );
};

const AnimatedSpyRunning = ({ style, color = 'black' }: { style: StyleProp<ViewStyle>, color: string }) => {
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 50,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [translateX]);

    return (
        <Animated.View style={[styles.container, style, { transform: [{ translateX }] }]}>
            {/* Head */}
            <View style={[styles.head, { backgroundColor: color }]} />
            {/* Hat */}
            <View style={[styles.hatBrim, { backgroundColor: color }]} />
            <View style={[styles.hatTop, { backgroundColor: color }]} />
            {/* Body */}
            <View style={[styles.body, { backgroundColor: color }]} />
            {/* Arms */}
            <View style={[styles.armLeft, { backgroundColor: color }]} />
            <View style={[styles.armRight, { backgroundColor: color }]} />
            {/* Legs */}
            <View style={[styles.legLeft, { backgroundColor: color }]} />
            <View style={[styles.legRight, { backgroundColor: color }]} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        position: 'relative',
    },
    head: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'absolute',
        top: 12,
        left: 35,
    },
    hatBrim: {
        width: 50,
        height: 5,
        position: 'absolute',
        top: 17,
        left: 25,
    },
    hatTop: {
        width: 30,
        height: 15,
        position: 'absolute',
        top: 7,
        left: 35,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    body: {
        width: 30,
        height: 40,
        position: 'absolute',
        top: 40,
        left: 35,
        borderRadius: 10,
    },
    armLeft: {
        width: 10,
        height: 30,
        position: 'absolute',
        top: 40,
        left: 25,
        transform: [{ rotate: '50deg' }],
        borderRadius: 5,
    },
    armRight: {
        width: 10,
        height: 30,
        position: 'absolute',
        top: 40,
        left: 65,
        transform: [{ rotate: '60deg' }],
        borderRadius: 5,
    },
    legLeft: {
        width: 10,
        height: 30,
        position: 'absolute',
        top: 70,
        left: 30,
        transform: [{ rotate: '30deg' }],
        borderRadius: 5,
    },
    legRight: {
        width: 10,
        height: 30,
        position: 'absolute',
        top: 70,
        left: 60,
        transform: [{ rotate: '-30deg' }],
        borderRadius: 5,
    },
});

export default AnimatedSpyRunning;
/*
const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        position: 'relative',
    },
    head: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'black',
        position: 'absolute',
        top: 10,
        left: 35,
    },
    hatBrim: {
        width: 50,
        height: 5,
        backgroundColor: 'black',
        position: 'absolute',
        top: 15,
        left: 25,
    },
    hatTop: {
        width: 30,
        height: 15,
        backgroundColor: 'black',
        position: 'absolute',
        top: 5,
        left: 35,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    body: {
        width: 30,
        height: 40,
        backgroundColor: 'black',
        position: 'absolute',
        top: 40,
        left: 35,
        borderRadius: 10,
    },
    armLeft: {
        width: 10,
        height: 30,
        backgroundColor: 'black',
        position: 'absolute',
        top: 40,
        left: 30,
        transform: [{ rotate: '-40deg' }],
    },
    armRight: {
        width: 10,
        height: 30,
        backgroundColor: 'black',
        position: 'absolute',
        top: 40,
        left: 60,
        transform: [{ rotate: '40deg' }],
    },
    legLeft: {
        width: 10,
        height: 20,
        backgroundColor: 'black',
        position: 'absolute',
        top: 80,
        left: 30,
        transform: [{ rotate: '30deg' }],
    },
    legRight: {
        width: 10,
        height: 20,
        backgroundColor: 'black',
        position: 'absolute',
        top: 80,
        left: 60,
        transform: [{ rotate: '-30deg' }],
    },
});

export default SpyRunning;*/
