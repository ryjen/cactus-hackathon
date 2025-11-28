import { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '@/lib/components/Button';
import { Text } from '@/lib/components/Text';
import { Theme } from '@/lib/core/theme';
import { GameCreationState, GameCreationAction } from '../types';
import { ViewProps } from '@/lib/core/types';
import { Clue } from '@/lib/core/types';

export function ClueEditorView({ state, dispatch }: ViewProps<GameCreationState, GameCreationAction>) {
    const [clueText, setClueText] = useState('');
    const [difficulty, setDifficulty] = useState<Clue['difficulty']>('medium');

    const handleAddClue = useCallback(() => {
        if (!clueText.trim()) return;

        const costMap = { easy: 10, medium: 20, hard: 30 };
        const newClue: Clue = {
            id: Date.now().toString(),
            text: clueText,
            difficulty,
            cost: costMap[difficulty],
        };

        dispatch({ type: 'ADD_CLUE', payload: newClue });
        setClueText('');
    }, [clueText, difficulty]);

    const handleRemoveClue = useCallback((id: string) => {
        dispatch({ type: 'REMOVE_CLUE', payload: id });
    }, [dispatch]);

    const handleFinish = useCallback(() => {
        dispatch({ type: 'FINALIZE_GAME' });
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Text variant="h2" style={styles.title}>Add Clues</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a clue..."
                    placeholderTextColor="#999"
                    value={clueText}
                    onChangeText={setClueText}
                />

                <View style={styles.difficultyContainer}>
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                        <TouchableOpacity
                            key={level}
                            style={[
                                styles.difficultyButton,
                                difficulty === level && styles.difficultyButtonSelected,
                                { backgroundColor: difficulty === level ? getDifficultyColor(level) : '#333' }
                            ]}
                            onPress={() => setDifficulty(level)}
                        >
                            <Text style={styles.difficultyText}>{level.toUpperCase()}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Button title="Add Clue" onPress={handleAddClue} disabled={!clueText.trim()} />
            </View>

            <ScrollView style={styles.list}>
                {state.clues.map((clue) => (
                    <View key={clue.id} style={styles.clueItem}>
                        <View style={styles.clueInfo}>
                            <Text style={styles.clueText}>{clue.text}</Text>
                            <View style={[styles.badge, { backgroundColor: getDifficultyColor(clue.difficulty) }]}>
                                <Text style={styles.badgeText}>{clue.difficulty} ({clue.cost}pts)</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => handleRemoveClue(clue.id)}>
                            <Text style={styles.removeText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <Button title="Finish & Share" onPress={handleFinish} disabled={state.clues.length === 0} />
            </View>
        </View>
    );
}

function getDifficultyColor(difficulty: Clue['difficulty']) {
    switch (difficulty) {
        case 'easy': return '#4CAF50';
        case 'medium': return '#FFC107';
        case 'hard': return '#F44336';
        default: return '#999';
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Theme.spacing(4),
        backgroundColor: Theme.colors.background,
    },
    title: {
        marginBottom: Theme.spacing(4),
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: Theme.spacing(4),
    },
    input: {
        backgroundColor: '#333',
        color: 'white',
        padding: Theme.spacing(3),
        borderRadius: 8,
        marginBottom: Theme.spacing(3),
        fontSize: 16,
    },
    difficultyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Theme.spacing(3),
    },
    difficultyButton: {
        flex: 1,
        padding: Theme.spacing(2),
        borderRadius: 8,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    difficultyButtonSelected: {
        borderWidth: 2,
        borderColor: 'white',
    },
    difficultyText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    list: {
        flex: 1,
    },
    clueItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: Theme.spacing(3),
        borderRadius: 8,
        marginBottom: Theme.spacing(2),
    },
    clueInfo: {
        flex: 1,
    },
    clueText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 4,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
    },
    removeText: {
        color: '#F44336',
        fontSize: 20,
        padding: 8,
    },
    footer: {
        marginTop: Theme.spacing(4),
    },
});
