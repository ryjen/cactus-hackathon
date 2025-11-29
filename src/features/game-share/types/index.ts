import type { Action } from "@/lib/core/types";

export interface GameShareState {
    photoUrl?: string;
    answer?: string;
    clues?: string[];
    mode: 'start' | 'photo' | 'answer' | 'generate' | 'result' | 'finish'
}

export type GameShareMode = GameShareState['mode'];

export type GameShareAction =
    Action<'PHOTO', string> |
    Action<'ANSWER', string> |
    Action<'GENERATE', string> |
    Action<'FINISH'> |
    Action<'ERROR', string> |
    Action<'RESULT', string[]>;