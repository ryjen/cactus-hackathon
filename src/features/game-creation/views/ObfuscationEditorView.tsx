import { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Image, PanResponder } from 'react-native';
import { BlurView } from 'expo-blur';
import { Button } from '@/lib/components/Button';
import { Text } from '@/lib/components/Text';
import { Theme } from '@/lib/core/theme';
import { GameCreationState, GameCreationAction } from '../types';
import { ViewProps } from '@/lib/core/types';

export function ObfuscationEditorView({ state, dispatch }: ViewProps<GameCreationState, GameCreationAction>) {
    const [region, setRegion] = useState({ x: 100, y: 100, width: 150, height: 150 });

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            setRegion(prev => ({
                ...prev,
                x: Math.max(0, prev.x + gestureState.dx),
                y: Math.max(0, prev.y + gestureState.dy),
            }));
        },
    }), [setRegion]);

    const handleSave = useCallback(() => {
        dispatch({ type: 'SET_TARGET_REGION', payload: region });
        // Transition to next step (handled by interactor or parent)
    }, [dispatch, region]);

    if (!state.photo) return null;

    return (
        <View style={styles.container}>
            <Image source={{ uri: state.photo.originalUrl }} style={styles.image} resizeMode="contain" />

            {/* Overlay Blur */}
            <View
                style={[styles.blurContainer, { left: region.x, top: region.y, width: region.width, height: region.height }]}
                {...panResponder.panHandlers}
            >
                <BlurView intensity={50} style={StyleSheet.absoluteFill} tint="dark" />
                <View style={styles.border} />
            </View>

            <View style={styles.controls}>
                <Text variant="body" style={styles.instruction}>Drag to position the obfuscation area</Text>
                <Button title="Next: Add Clues" onPress={handleSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
        width: '100%',
    },
    blurContainer: {
        position: 'absolute',
        overflow: 'hidden',
        borderRadius: 10,
    },
    border: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderColor: Theme.colors.primary,
        borderRadius: 10,
    },
    controls: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    instruction: {
        color: 'white',
        marginBottom: 20,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    }
});
