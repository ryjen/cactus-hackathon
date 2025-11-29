import { View, Text, StyleSheet, TouchableOpacity, Image, Share } from "react-native";
import { ViewProps } from "@/lib/core/types";
import type { GameShareState, GameShareAction } from "../types";
import { useCallback, useMemo, useState, useEffect } from "react";
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import { Button } from "@/lib/components";
import { Theme } from "@/lib/core/theme";
import { ObfuscationService } from "@/lib/domain/services";
import { container } from "tsyringe";

export const ResultView = ({ state, dispatch }: ViewProps<GameShareState, GameShareAction>) => {

    const obfuscationService = useMemo(() => container.resolve(ObfuscationService), []);

    const [obfuscatedPhotoUrl, setObfuscatedPhotoUrl] = useState<string | undefined>();

    useEffect(() => {
        void obfuscationService.obfuscate(state.photoUrl!, { intensity: 50 }).then((url) => {
            setObfuscatedPhotoUrl(url);
        }).catch(console.warn);
    }, [state.photoUrl]);

    const game = useMemo(() => ({
        id: Date.now().toString(),
        photo: state.photoUrl,
        answer: state.answer,
    }), [state.photoUrl, state.answer]);

    // TODO: Save game to realtime database

    const gameUrl = useMemo(() => Linking.createURL(`features/game/${game.id}`), [game]);

    const share = useCallback(async () => {
        await Share.share({
            url: gameUrl,
            title: 'Eyespie Game',
            message: `Guess the photo from eyespie! ${gameUrl}`,
        });
    }, [gameUrl]);

    const copyToClipboard = useCallback(async () => {
        await Clipboard.setStringAsync(gameUrl);
    }, [gameUrl]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Share</Text>
            <Text style={styles.subtext}>Share your game with your friends!</Text>

            <View style={styles.resultContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: obfuscatedPhotoUrl ?? state.photoUrl }} style={styles.image} height={200} />
                </View>

                <View style={styles.clueContainer}>
                    {state.clues!.map((clue, index) => (
                        <Text key={index} style={styles.resultText}>{clue}</Text>
                    ))}
                </View>
            </View>

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={copyToClipboard}>
                    <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
                <Text style={styles.instructions}>the link:</Text>
            </View>
            <Text style={styles.link} selectable={true}>{gameUrl}</Text>

            <View style={styles.buttonContainer}>
                <Button onPress={share} title="Share" style={styles.shareButton} />

                <TouchableOpacity style={styles.doneButton} onPress={() => dispatch({ type: 'FINISH' })}>
                    <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
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
    subtext: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        width: '100%',
    },
    doneButton: {
    },
    shareButton: {

    },
    clueContainer: {
    },
    imageContainer: {
        height: 200,
        overflow: 'hidden',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
        shadowColor: 'black',
        shadowOffset: { width: 24, height: 24 },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 24,
    },
    doneText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    image: {
        height: 200,
        resizeMode: 'cover',
    },
    instructions: {
        fontSize: 18,
    },
    resultContainer: {
        gap: 20,
    },
    resultText: {
        fontSize: 15,
    },
    link: {
        fontSize: 14,
        marginBottom: 20,
    },
    linkContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 20,
    },
    copyText: {
        color: 'blue',
        fontSize: 18,
    },
});