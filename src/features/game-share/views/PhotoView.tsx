import { View, StyleSheet } from "react-native";
import { GameShareState, GameShareAction } from "../types";
import { useImageSelector } from "./ImageSelector";
import { useEffect } from "react";
import { ViewProps } from "@/lib/core/types";
import { Button, Text } from "@/lib/components";

export const PhotoView = ({ state, dispatch }: ViewProps<GameShareState, GameShareAction>) => {

    const { image, pickImage, takePhoto, error } = useImageSelector();

    useEffect(() => {
        if (image) {
            dispatch({ type: 'ANSWER', payload: image });
        }
    }, [image]);

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Choose a photo</Text>
            <View style={styles.spacer} />
            <Text style={styles.instructions}>Find something interesting</Text>
            <Text style={styles.instructions}>with an object in it.</Text>
            <View style={styles.spacer} />
            <Text style={styles.subtext}>Not of a person or place.</Text>
            <View style={styles.spacer} />

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.spacer} />

            <View style={styles.buttonContainer}>
                <Button title="Camera" onPress={takePhoto} />
                <Button title="Photo Library" onPress={pickImage} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    subtext: {
        fontSize: 12,
        color: 'gray',
    },
    instructions: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
    },
    spacer: {
        height: 20,
    },
    error: {
        color: 'red',
    },
});
