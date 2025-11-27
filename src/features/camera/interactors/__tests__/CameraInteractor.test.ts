import 'reflect-metadata';
import { CameraInteractor } from '../CameraInteractor';
import { CameraAction } from '../../types';

describe('CameraInteractor', () => {
    let interactor: CameraInteractor;

    beforeEach(() => {
        interactor = new CameraInteractor();
    });

    describe('Initial State', () => {
        it('should have null url initially', () => {
            expect(interactor.state.url).toBeNull();
        });
    });

    describe('CAPTURE Action', () => {
        it('should update url when CAPTURE action is dispatched', () => {
            const testUrl = 'file:///path/to/photo.jpg';
            const action: CameraAction = {
                type: 'CAPTURE',
                payload: testUrl,
            };

            interactor.dispatch(action);

            expect(interactor.state.url).toBe(testUrl);
        });

        it('should handle undefined payload', () => {
            const action: CameraAction = {
                type: 'CAPTURE',
                payload: undefined,
            };

            interactor.dispatch(action);

            expect(interactor.state.url).toBeNull();
        });
    });

    describe('State Observation', () => {
        it('should notify observers when state changes', (done) => {
            const testUrl = 'file:///path/to/photo.jpg';

            const subscription = interactor.observe((state) => {
                if (state.url === testUrl) {
                    expect(state.url).toBe(testUrl);
                    subscription.unsubscribe();
                    done();
                }
            });

            interactor.dispatch({
                type: 'CAPTURE',
                payload: testUrl,
            });
        });
    });

    describe('State Immutability', () => {
        it('should not mutate previous state', () => {
            const initialState = interactor.state;
            const testUrl = 'file:///path/to/photo.jpg';

            interactor.dispatch({
                type: 'CAPTURE',
                payload: testUrl,
            });

            expect(initialState.url).toBeNull();
            expect(interactor.state.url).toBe(testUrl);
        });
    });
});
