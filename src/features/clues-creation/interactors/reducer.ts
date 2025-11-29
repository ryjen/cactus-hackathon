import { CluesState, CluesAction } from "../types";

export const initialState: CluesState = {
    photoUrl: '/data/user/0/com.rybertjen.eyespie/cache/ImagePicker/9dbbca94-ca8d-4c5a-b2de-43e2df9def03.jpeg',
    answer: 'flower',
    messages: [],
    busy: false,
    error: null,
    mode: 'image',
};

export default function reducer(state: CluesState, action: CluesAction): CluesState {
    switch (action.type) {
        case 'PHOTO':
            return {
                ...state,
                photoUrl: action.payload!,
                busy: false,
                error: null,
            };
        case 'GENERATE':
            return {
                ...state,
                busy: true,
                error: null,
            };
        case 'UPDATE':
            return {
                ...state,
                messages: [...state.messages, action.payload!],
            };
        case 'RESULT':
            return {
                ...state,
                busy: false,
                error: null,
            };
        case 'ERROR':
            return {
                ...state,
                busy: false,
                error: action.payload!,
            };
        default:
            return state;
    }
}