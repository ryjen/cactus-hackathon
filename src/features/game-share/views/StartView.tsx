import { View, StyleSheet } from "react-native";
import { ViewProps } from "@/lib/core/types";
import type { GameShareState, GameShareAction } from "../types";
import { Text, Button } from "@/lib/components";

export const StartView = ({ dispatch }: ViewProps<GameShareState, GameShareAction>) => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>To play the game:</Text>
            <View style={styles.spacer} />
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructions}>1. Take a photo of something</Text>
                <Text style={styles.instructions}>2. Set the answer and generate clues</Text>
                <Text style={styles.instructions}>3. Share the game with your friends</Text>
            </View>
            <View style={styles.spacer} />
            <Button title="Next" onPress={() => {
                dispatch({ type: 'PHOTO' });
            }} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    instructionsContainer: {
        flexDirection: 'column',
        gap: 5,
    },
    instructions: {
        fontSize: 16,
    },
    spacer: {
        height: 20,
    },
});
