import { GameCreationState, GameCreationAction } from '@/features/game-creation/types';

export const initialState: GameCreationState = {
    photo: null,
    obfuscationConfig: { method: 'blur', intensity: 0.5 },
    targetRegion: null,
    clues: [],
    status: 'idle',
};

export function gameCreationReducer(
    state: GameCreationState,
    action: GameCreationAction
): GameCreationState {
    switch (action.type) {
        case 'SET_PHOTO':
            return { ...state, photo: action.payload, status: 'editing' };

        case 'UPDATE_OBFUSCATION':
            return { ...state, obfuscationConfig: action.payload };

        case 'SET_TARGET_REGION':
            return { ...state, targetRegion: action.payload };

        case 'ADD_CLUE':
            return { ...state, clues: [...state.clues, action.payload] };

        case 'REMOVE_CLUE':
            return {
                ...state,
                clues: state.clues.filter((clue) => clue.id !== action.payload),
            };

        case 'RESET':
            return initialState;

        default:
            return state;
    }
}
