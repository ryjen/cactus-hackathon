import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import type { GameShareState, GameShareAction } from "../types";
import type { ViewProps } from "@/lib/core/types";
import { useCluesAI } from "@/lib/core/hooks";
import { useCallback, useEffect, useState } from "react";
import { ProgressAnimation, StatusMessage } from "@/lib/components";


export const GenerateView = ({ state, dispatch }: ViewProps<GameShareState, GameShareAction>) => {

    const { analyze, response, isDownloading, downloadInfo, error } = useCluesAI(state.photoUrl!.replace('file://', ''), state.answer);

    useEffect(() => {
        void analyze().then(() => console.log('analyzing')).catch(console.warn)
    }, []);

    const [messages, setMessages] = useState<string[]>([
        '🕵️‍♂️ Spy activated!',
        '🔍 Searching for clues...',
        '💼 Mission in progress...',
        '🚁 Extraction imminent...',
    ]);

    const parseClues = useCallback(async (response: string): Promise<string[]> => {
        const clues = response.trim().split('\n');
        return clues;
    }, []);

    useEffect(() => {
        if (response) {
            void parseClues(response).then((clues) => {
                dispatch({ type: 'RESULT', payload: clues });
            }).catch(console.warn)
        }
    }, [response]);

    if (isDownloading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text style={styles.progressText}>Downloading models...</Text>
                <View style={styles.spacer} />
                {downloadInfo.map((info, index) => (
                    <Text style={styles.progressText} key={index}>{info.model}: {info.progress}%</Text>
                ))}
            </View>
        );
    }

    return (
        <>
            <ProgressAnimation visible={true}>
                <StatusMessage messages={messages} textStyle={{ color: 'white' }} />
            </ProgressAnimation>
            <Text style={styles.error}>{error}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    progressText: {
        color: 'white',
        textAlign: 'center',
    },
    spacer: {
        height: 20,
    },
});
