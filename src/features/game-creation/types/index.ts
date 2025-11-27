import { Photo, ObfuscationConfig, Clue } from '@/lib/core/types';

export interface GameCreationState {
    photo: Photo | null;
    obfuscationConfig: ObfuscationConfig;
    targetRegion: { x: number; y: number; width: number; height: number } | null;
    clues: Clue[];
    status: 'idle' | 'editing' | 'ready';
}

export type GameCreationAction =
    | { type: 'SET_PHOTO'; payload: Photo }
    | { type: 'UPDATE_OBFUSCATION'; payload: ObfuscationConfig }
    | { type: 'SET_TARGET_REGION'; payload: { x: number; y: number; width: number; height: number } }
    | { type: 'ADD_CLUE'; payload: Clue }
    | { type: 'REMOVE_CLUE'; payload: string }
    | { type: 'RESET' };
