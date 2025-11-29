import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import { Text, Link } from '@/lib/components';
import { Theme } from '@/lib/core/theme';

const { width, height } = Dimensions.get('window');

export const AnimatedWelcomeScreen = () => {
    // Cloud animations (floating up/down)
    const cloud1Anim = useRef(new Animated.Value(0)).current;
    const cloud2Anim = useRef(new Animated.Value(0)).current;
    const cloud3Anim = useRef(new Animated.Value(0)).current;

    // Spy circle pulse
    const circlePulse = useRef(new Animated.Value(0)).current;

    // Magnifying glass pulse
    const glassPulse = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const float = (anim: Animated.Value | Animated.ValueXY, delay = 0) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 2500,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: -1,
                        duration: 2500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        float(cloud1Anim, 200);
        float(cloud2Anim, 600);
        float(cloud3Anim, 1000);

        Animated.loop(
            Animated.sequence([
                Animated.timing(circlePulse, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: false,
                }),
                Animated.timing(circlePulse, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: false,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(glassPulse, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(glassPulse, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [cloud1Anim, cloud2Anim, cloud3Anim, circlePulse, glassPulse]);

    const circleScale = circlePulse.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.03],
    });

    const glassBorderWidth = glassPulse.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 4],
    });

    const cloudTranslate = (anim: Animated.Value) =>
        anim.interpolate({ inputRange: [-1, 1], outputRange: [-4, 4] });

    return (
        <View style={styles.container}>
            {/* Sky background */}
            <View style={styles.sky} />

            {/* Clouds */}
            <Animated.View
                style={[
                    styles.cloud,
                    {
                        top: height * 0.08,
                        left: width * 0.1,
                        transform: [{ translateY: cloudTranslate(cloud1Anim) }],
                    },
                ]}
            >
                <View style={[styles.cloudPart, { width: 80, height: 50 }]} />
                <View style={[styles.cloudPart, { width: 50, height: 40, left: -15, top: -20 }]} />
                <View style={[styles.cloudPart, { width: 60, height: 35, left: 40, top: -10 }]} />
            </Animated.View>

            <Animated.View
                style={[
                    styles.cloud,
                    {
                        top: height * 0.16,
                        left: width * 0.62,
                        transform: [{ translateY: cloudTranslate(cloud2Anim) }],
                    },
                ]}
            >
                <View style={[styles.cloudPart, { width: 70, height: 40 }]} />
                <View style={[styles.cloudPart, { width: 40, height: 30, left: -10, top: -15 }]} />
                <View style={[styles.cloudPart, { width: 55, height: 35, left: 35, top: -8 }]} />
            </Animated.View>

            <Animated.View
                style={[
                    styles.cloud,
                    {
                        top: height * 0.22,
                        left: width * 0.3,
                        transform: [{ translateY: cloudTranslate(cloud3Anim) }],
                    },
                ]}
            >
                <View style={[styles.cloudPart, { width: 90, height: 55 }]} />
                <View style={[styles.cloudPart, { width: 50, height: 40, left: -20, top: -18 }]} />
                <View style={[styles.cloudPart, { width: 65, height: 35, left: 50, top: -12 }]} />
            </Animated.View>

            {/* Upper half container */}
            <View style={styles.topHalf}>
                {/* Circle backdrop */}
                <Animated.View style={[styles.circle, { transform: [{ scale: circleScale }] }]}>
                    {/* Spy outline built from Views */}

                    {/* Hat brim */}
                    <View style={styles.hatBrim} />
                    {/* Hat crown */}
                    <View style={styles.hatCrown} />

                    {/* Face silhouette (angled triangle-ish via rotated rectangle + mask edges) */}
                    <View style={styles.faceLine} />
                    {/* Nose line */}
                    <View style={styles.noseLine} />

                    {/* Coat collar */}
                    <View style={styles.collarLeft} />
                    <View style={styles.collarRight} />

                    {/* Magnifying glass (circle + handle) */}
                    <View style={styles.glassWrapper}>
                        <Animated.View
                            style={[
                                styles.glassCircle,
                                { borderWidth: glassBorderWidth },
                            ]}
                        />
                        <View style={styles.glassHandle} />
                    </View>

                    {/* Eye dot (small outlined dot inside glass area) */}
                    <View style={styles.eyeDot} />
                </Animated.View>
            </View>

            {/* Title */}
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.subText}>to Eyespie</Text>
                <View style={styles.spacer} />
                <View style={styles.spacer} />
                <Link href="/features/game-share" style={styles.link} title="New Game" />
                <View style={styles.spacer} />
                <Link href="/storybook" style={styles.link} title="Storybook" />
            </View>
        </View>
    );
};

const PRIMARY = Theme.colors.primary;
const PRIMARY_DARK = Theme.colors.primaryLight;
const OUTLINE = Theme.colors.outline;
const CLOUD = Theme.colors.background;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: PRIMARY,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    sky: {
        ...StyleSheet.absoluteFillObject,
        //backgroundColor: PRIMARY,
    },
    link: {
        padding: 10,
        //backgroundColor: PRIMARY_DARK,
        borderRadius: 5,
    },
    spacer: {
        height: 20,
    },
    // Clouds
    cloud: {
        position: 'absolute',
    },
    cloudPart: {
        position: 'absolute',
        backgroundColor: CLOUD,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#e6f2ff',
    },

    // Upper half and circle
    topHalf: {
        height: '50%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: width * 0.62,
        height: width * 0.62,
        borderRadius: width * 0.31,
        backgroundColor: PRIMARY_DARK,
        borderWidth: 2,
        borderColor: '#b7dcff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Spy parts
    hatBrim: {
        position: 'absolute',
        top: '18%',
        width: '60%',
        height: 6,
        backgroundColor: OUTLINE,
        borderRadius: 3,
    },
    hatCrown: {
        position: 'absolute',
        top: '8%',
        width: '35%',
        height: '14%',
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: OUTLINE,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    faceLine: {
        position: 'absolute',
        top: '28%',
        left: '47%',
        width: '22%',
        height: 0,
        borderTopWidth: 4,
        borderColor: OUTLINE,
        transform: [{ rotate: '25deg' }],
    },
    noseLine: {
        position: 'absolute',
        top: '36%',
        left: '56%',
        width: '10%',
        height: 0,
        borderTopWidth: 4,
        borderColor: OUTLINE,
        transform: [{ rotate: '-20deg' }],
    },
    collarLeft: {
        position: 'absolute',
        top: '42%',
        left: '30%',
        width: '22%',
        height: 0,
        borderTopWidth: 6,
        borderColor: OUTLINE,
        transform: [{ rotate: '-25deg' }],
    },
    collarRight: {
        position: 'absolute',
        top: '48%',
        left: '52%',
        width: '26%',
        height: 0,
        borderTopWidth: 6,
        borderColor: OUTLINE,
        transform: [{ rotate: '15deg' }],
    },

    // Magnifying glass
    glassWrapper: {
        position: 'absolute',
        top: '38%',
        left: '45%',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glassCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderColor: OUTLINE,
        backgroundColor: 'transparent',
    },
    glassHandle: {
        position: 'absolute',
        bottom: -12,
        right: -4,
        width: 30,
        height: 4,
        backgroundColor: OUTLINE,
        transform: [{ rotate: '35deg' }],
        borderRadius: 2,
    },
    eyeDot: {
        position: 'absolute',
        top: '43%',
        left: '56%',
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: OUTLINE,
    },

    // Text
    textContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: OUTLINE,
        letterSpacing: 2,
    },
    subText: {
        fontSize: 18,
        color: OUTLINE,
        opacity: 0.9,
        marginTop: 4,
    },
});

