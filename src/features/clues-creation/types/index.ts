import { Action } from "@/lib/core/types";

export interface CluesState {
    photoUrl: string;
    clues: string[];
    loading: boolean;
    error: string | null;
}

export interface CluesScreenParams {
    photoUrl: string;
}

export interface CluesScreenProps {
    params: CluesScreenParams
}

export type CluesAction =
    Action<'START', string> |
    Action<'RESULT', string> |
    Action<'SAVE', string> |
    Action<'ERROR', string>;