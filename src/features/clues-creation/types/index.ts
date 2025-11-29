import { Action } from "@/lib/core/types";

export interface CluesState {
    photoUrl: string | null;
    answer: string | null;
    messages: string[];
    busy: boolean;
    error: string | null;
    mode: 'audio' | 'image';
}

export interface CluesScreenParams {
    photoUrl: string;
}

export interface CluesScreenProps {
    params: CluesScreenParams
}

export interface CluesResult {
    answer: string;
    clues: Array<{
        clue: string;
        difficulty: string;
    }>;
}

export type CluesAction =
    Action<'PHOTO', string> |
    Action<'GENERATE', string> |
    Action<'UPDATE', string> |
    Action<'RESULT', { answer: string | null, result: string | null } | null> |
    Action<'SAVE', string> |
    Action<'MODE', 'audio' | 'image'> |
    Action<'ERROR', string>;