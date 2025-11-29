import { View, Image, StyleSheet } from "react-native";
import { GameShareState, GameShareAction } from "../types";
import { ViewProps } from "@/lib/core/types";
import { useCallback, useState } from "react";
import { TextInput } from "react-native";
import { Text, Button } from "@/lib/components";


export const AnswerView = ({ state, dispatch }: ViewProps<GameShareState, GameShareAction>) => {

    const [answer, setAnswer] = useState<string | undefined>(state.answer);
    const [error, setError] = useState<string | undefined>();

    const handleGenerate = useCallback(() => {
        if (!answer) {
            setError('Please provide an answer');
            return;
        }
        dispatch({ type: 'GENERATE', payload: answer });
    }, [answer]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Answer</Text>

            <View style={styles.imageContainer}>
                <Image source={{ uri: state.photoUrl }} style={styles.image} width={300} height={300} />
            </View>
            <Text style={styles.instructions}>Provide an answer for people to guess.</Text>
            <TextInput
                placeholder="Whats in the photo?"
                value={answer}
                keyboardType="default"
                inputMode="text"
                returnKeyType="send"
                onSubmitEditing={handleGenerate}
                onChangeText={setAnswer}
                style={styles.input}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Next" onPress={handleGenerate} />
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
    imageContainer: {
        marginVertical: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: { width: 12, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 12,
        elevation: 12,
    },
    error: {
        color: 'red',
    },
    instructions: {
        fontSize: 16,
        marginBottom: 5,
    },
    spacer: {
        height: 20,
    },
    button: {
        marginVertical: 5,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        width: '80%',
        padding: 10,
        borderRadius: 10,
    },
    image: {
        height: 200,
    },
});
