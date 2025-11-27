import { CameraState, CameraAction } from '@/features/camera/types';

export const initialState: CameraState = {
    url: null,
};

export function cameraReducer(
    state: CameraState,
    action: CameraAction
): CameraState {
    switch (action.type) {
        case 'CAPTURE':
            return { ...state, url: action.payload ?? null };

        default:
            return state;
    }
}
