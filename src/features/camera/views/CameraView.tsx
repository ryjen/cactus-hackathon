import { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView as Camera, CameraType, useCameraPermissions } from 'expo-camera';
import { Text } from '@/lib/components/Text';
import { Button } from '@/lib/components/Button';
import { Theme } from '@/lib/core/theme';
import { CameraState, CameraAction } from '../types';
import { ViewProps } from '@/lib/core/types';

export function CameraView({ state, dispatch }: ViewProps<CameraState, CameraAction>) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<Camera>(null);

    const takePicture = useCallback(async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo) {
                dispatch({ type: 'CAPTURE', payload: photo.uri });
            }
        }
    }, [cameraRef, dispatch]);

    const toggleCameraFacing = useCallback(() => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }, [facing]);

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text variant="body" style={styles.message}>
                    We need your permission to use the camera
                </Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                        <Text style={styles.buttonText}>Flip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.background,
    },
    message: {
        textAlign: 'center',
        paddingBottom: Theme.spacing(4),
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    controls: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: Theme.spacing(16),
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    flipButton: {
        padding: Theme.spacing(4),
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Theme.colors.primary,
    },
});
