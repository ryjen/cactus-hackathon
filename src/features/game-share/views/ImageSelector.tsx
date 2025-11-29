import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Alert, ViewStyle, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export const useImageSelector = () => {
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            setError('Permission required.  Please allow access to your photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            setError('Permission required.  Please allow access to your camera.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return {
        image,
        pickImage,
        takePhoto,
        error,
    }
}
