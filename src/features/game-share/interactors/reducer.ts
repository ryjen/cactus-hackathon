import type { GameShareAction, GameShareState } from "../types";

const reducer = (state: GameShareState, action: GameShareAction): GameShareState => {
    switch (action.type) {
        case 'PHOTO':
            return { ...state, mode: 'photo' };
        case 'ANSWER':
            return { ...state, photoUrl: action.payload, mode: 'answer' };
        case 'GENERATE':
            return { ...state, answer: action.payload, mode: 'generate' };
        case 'RESULT':
            return { ...state, clues: action.payload, mode: 'result' };
        case 'FINISH':
            return { ...state, mode: 'finish' };
        default:
            return state;
    }
}

export default reducer;
