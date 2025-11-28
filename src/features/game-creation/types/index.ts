import { Photo, ObfuscationConfig, Clue } from '@/lib/core/types';

export interface GameCreationState {
    photo: Photo | null;
    obfuscatedUrl: string | null;
    obfuscationConfig: ObfuscationConfig;
    targetRegion: { x: number; y: number; width: number; height: number } | null;
    clues: Clue[];
    status: 'idle' | 'editing' | 'ready';
    step: 'camera' | 'obfuscate' | 'clues' | 'review';
}

export interface GameCreationParams {
    photoUrl: string,
    clues: string[],
}

export interface GameCreationProps {
    params: GameCreationParams
}

export type GameCreationAction =
    | { type: 'LOAD_PHOTO'; payload: GameCreationParams }
    | { type: 'SET_PHOTO'; payload: Photo }
    | { type: 'UPDATE_OBFUSCATION'; payload: ObfuscationConfig }
    | { type: 'SET_TARGET_REGION'; payload: { x: number; y: number; width: number; height: number } }
    | { type: 'OBFUSCATION_SUCCESS'; payload: string }
    | { type: 'ADD_CLUE'; payload: Clue }
    | { type: 'REMOVE_CLUE'; payload: string }
    | { type: 'FINALIZE_GAME' }
    | { type: 'RESET' };
