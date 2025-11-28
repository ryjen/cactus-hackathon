import { GameCreationState, GameCreationAction } from '@/features/game-creation/types';

export const initialState: GameCreationState = {
    photo: null,
    obfuscatedUrl: null,
    obfuscationConfig: { method: 'blur', intensity: 0.5 },
    targetRegion: null,
    clues: [],
    status: 'idle',
    step: 'camera',
};

export function gameCreationReducer(
    state: GameCreationState,
    action: GameCreationAction
): GameCreationState {
    switch (action.type) {
        case 'SET_PHOTO':
            return { ...state, photo: action.payload, status: 'editing', step: 'obfuscate' };

        case 'UPDATE_OBFUSCATION':
            return { ...state, obfuscationConfig: action.payload };

        case 'SET_TARGET_REGION':
            return { ...state, targetRegion: action.payload, step: 'clues' };

        case 'OBFUSCATION_SUCCESS':
            return { ...state, obfuscatedUrl: action.payload };

        case 'FINALIZE_GAME':
            return { ...state, step: 'review', status: 'ready' };

        case 'RESET':
            return initialState;

        default:
            return state;
    }
}
