import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Dimensions, Easing } from 'react-native';
import { default as RunningSpy } from './Spy';

const { width: screenWidth } = Dimensions.get('window');

const width = screenWidth + 100;

// Adjust these speeds to fine-tune the parallax effect
const SKY_SPEED = 25000;
const CITY_SPEED = 20000;
const ROAD_SPEED = 8000;
const SPY_SPEED = 4000;

interface ProgressAnimationProps {
    visible: boolean;
    children: React.ReactNode;
}

export const ProgressAnimation = ({ visible, children }: ProgressAnimationProps) => {
    // Animation values
    const skyAnim = useRef(new Animated.Value(0)).current;
    const cityAnim = useRef(new Animated.Value(0)).current;
    const roadAnim = useRef(new Animated.Value(0)).current;
    const blackSpyAnim = useRef(new Animated.Value(-100)).current;
    const whiteSpyAnim = useRef(new Animated.Value(-250)).current;
    const buildingWidth = useRef(Math.ceil(width / 6)).current;

    useEffect(() => {
        if (visible) {
            const createLoop = (anim: Animated.Value, duration: number) => {
                anim.setValue(0);
                Animated.loop(
                    Animated.timing(anim, {
                        toValue: -width,
                        duration: duration,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    })
                ).start();
            };

            createLoop(skyAnim, SKY_SPEED);
            createLoop(cityAnim, CITY_SPEED);
            createLoop(roadAnim, ROAD_SPEED);

            // Spies Loop
            const startSpiesLoop = () => {
                blackSpyAnim.setValue(-100);
                whiteSpyAnim.setValue(-250);

                const runAnimation = Animated.parallel([
                    Animated.timing(blackSpyAnim, {
                        toValue: width + 200,
                        duration: SPY_SPEED,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(whiteSpyAnim, {
                        toValue: width + 100,
                        duration: SPY_SPEED,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]);

                Animated.loop(runAnimation).start();
            };

            startSpiesLoop();
        } else {
            skyAnim.stopAnimation();
            cityAnim.stopAnimation();
            roadAnim.stopAnimation();
            blackSpyAnim.stopAnimation();
            whiteSpyAnim.stopAnimation();
        }
    }, [visible, skyAnim, cityAnim, roadAnim, blackSpyAnim, whiteSpyAnim]);

    if (!visible) return null;

    // Sky layer with moon and stars
    const renderSkyLayer = () => (
        <Animated.View
            style={[
                styles.bgLayer,
                {
                    transform: [{ translateX: skyAnim }],
                    zIndex: 1,
                },
            ]}
        >
            <View style={styles.skyBackground}>
                {/* Moon */}
                <View style={[styles.moon, { left: 100, top: 100 }]} />
                {/* Stars */}
                <View style={[styles.star, { left: 200, top: 50 }]} />
                <View style={[styles.star, { left: 400, top: 150 }]} />
                <View style={[styles.star, { left: 600, top: 80 }]} />
                <View style={[styles.star, { left: 700, top: 200 }]} />
            </View>
            <View style={[styles.skyBackground, { left: width }]}>
                {/* Duplicate for seamless loop */}
                <View style={[styles.moon, { left: 100, top: 100 }]} />
                <View style={[styles.star, { left: 200, top: 50 }]} />
                <View style={[styles.star, { left: 400, top: 150 }]} />
                <View style={[styles.star, { left: 600, top: 80 }]} />
                <View style={[styles.star, { left: 700, top: 200 }]} />
            </View>
        </Animated.View>
    );

    // City layer with building silhouettes
    const renderCityLayer = () => (
        <Animated.View
            style={[
                styles.bgLayer,
                {
                    transform: [{ translateX: cityAnim }],
                    zIndex: 2,
                },
            ]}
        >
            <View style={styles.cityBackground}>
                {/* Simple building shapes */}
                <View style={[styles.building, { left: 0, height: 250, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth, height: 200, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth * 2, height: 120, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth * 3, height: 250, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth * 4, height: 180, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth * 5, height: 120, width: buildingWidth }]} />
            </View>
            <View style={[styles.cityBackground, { left: width }]}>
                {/* Duplicate for seamless loop */}
                <View style={[styles.building, { left: 0, height: 250, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth, height: 200, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth * 2, height: 120, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth * 3, height: 250, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth * 4, height: 190, width: buildingWidth }]} />
                <View style={[styles.building, { left: buildingWidth * 5, height: 130, width: buildingWidth }]} />
            </View>
        </Animated.View>
    );

    // Road layer
    const renderRoadLayer = () => (
        <Animated.View
            style={[
                styles.bgLayer,
                {
                    transform: [{ translateX: roadAnim }],
                    zIndex: 3,
                },
            ]}
        >
            <View style={styles.roadBackground}>
                <View style={styles.road} />
                {/* Lane markings */}
                <View style={[styles.laneMarking, { left: 0 }]} />
                <View style={[styles.laneMarking, { left: 200 }]} />
                <View style={[styles.laneMarking, { left: 400 }]} />
                <View style={[styles.laneMarking, { left: 600 }]} />
            </View>
            <View style={[styles.roadBackground, { left: width }]}>
                <View style={styles.road} />
                <View style={[styles.laneMarking, { left: 0 }]} />
                <View style={[styles.laneMarking, { left: 200 }]} />
                <View style={[styles.laneMarking, { left: 400 }]} />
                <View style={[styles.laneMarking, { left: 600 }]} />
            </View>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            {children}
            <View style={styles.sceneContainer}>
                {renderSkyLayer()}
                {renderCityLayer()}
                {renderRoadLayer()}

                {/* Green Spy (Leading) */}
                <Animated.View
                    style={[
                        styles.spyContainer,
                        {
                            transform: [{ translateX: blackSpyAnim }],
                            zIndex: 10,
                        },
                    ]}
                >
                    <RunningSpy style={styles.spy} color="darkgreen" />
                </Animated.View>

                {/* Red Spy (Chasing) */}
                <Animated.View
                    style={[
                        styles.spyContainer,
                        {
                            transform: [{ translateX: whiteSpyAnim }],
                            zIndex: 11,
                        },
                    ]}
                >
                    <RunningSpy style={styles.spy} color="crimson" />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    sceneContainer: {
        width: width,
        height: 600,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1a1a1a',
    },
    bgLayer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        width: width * 2,
    },
    // Sky layer styles
    skyBackground: {
        width: width,
        height: '100%',
        position: 'absolute',
        backgroundColor: '#1a1a1a',
    },
    moon: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
        opacity: 0.8,
    },
    star: {
        position: 'absolute',
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ffffff',
    },
    // City layer styles
    cityBackground: {
        width: width,
        height: '100%',
        position: 'absolute',
    },
    building: {
        position: 'absolute',
        bottom: 100,
        backgroundColor: '#333333',
    },
    // Road layer styles
    roadBackground: {
        width: width,
        height: '100%',
        position: 'absolute',
    },
    road: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        backgroundColor: '#000000',
    },
    laneMarking: {
        position: 'absolute',
        bottom: 50,
        width: 100,
        height: 10,
        backgroundColor: '#ffffff',
    },
    // Spy styles
    spyContainer: {
        position: 'absolute',
        bottom: 90,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spy: {}
});
