import { CluesState, CluesAction } from "../types";

export const initialState: CluesState = {
    photoUrl: '',
    clues: [],
    loading: false,
    error: null,
};

export default function reducer(state: CluesState, action: CluesAction): CluesState {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                photoUrl: action.payload!,
                loading: true,
                error: null,
            };
        case 'RESULT':
            return {
                ...state,
                loading: false,
                error: null,
            };
        case 'SAVE':
            return {
                ...state,
                clues: [...state.clues, action.payload!],
                loading: false,
                error: null,
            };
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload!,
            };
    }
}