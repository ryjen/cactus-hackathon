import 'reflect-metadata';

// Mock ObfuscationService to avoid Jest parsing issues with expo-image-manipulator
jest.mock('@/lib/domain/services/ObfuscationService', () => ({
    ObfuscationService: jest.fn().mockImplementation(() => ({
        obfuscate: jest.fn(),
    })),
}));

// Mock PhotoFromUrl to avoid any potential dependencies
jest.mock('../../usecases/PhotoFromUrl', () => ({
    PhotoFromUrl: jest.fn().mockImplementation(() => ({
        execute: jest.fn(),
    })),
}));

import { GameCreationInteractor } from '../GameCreationInteractor';
import { GameCreationAction } from '../../types';
import { Photo, ObfuscationConfig, Clue } from '@/lib/core/types';

describe('GameCreationInteractor', () => {
    let interactor: GameCreationInteractor;
    let mockObfuscationService: any;
    let mockPhotoFromUrl: any;

    beforeEach(() => {
        mockObfuscationService = {
            obfuscate: jest.fn(),
        };
        mockPhotoFromUrl = {
            execute: jest.fn(),
        };
        interactor = new GameCreationInteractor(mockObfuscationService, mockPhotoFromUrl);
    });

    describe('Initial State', () => {
        it('should have correct initial state', () => {
            const state = interactor.state;

            expect(state.photo).toBeNull();
            expect(state.obfuscationConfig).toEqual({
                method: 'blur',
                intensity: 0.5,
            });
            expect(state.targetRegion).toBeNull();
            expect(state.clues).toEqual([]);
            expect(state.status).toBe('idle');
        });
    });

    describe('SET_PHOTO Action', () => {
        it('should set photo and change status to editing', () => {
            const photo: Photo = {
                id: 'photo-1',
                originalUrl: 'file:///path/to/photo.jpg',
                width: 1920,
                height: 1080,
            };

            const action: GameCreationAction = {
                type: 'SET_PHOTO',
                payload: photo,
            };

            interactor.dispatch(action);

            expect(interactor.state.photo).toEqual(photo);
            expect(interactor.state.status).toBe('editing');
        });
    });

    describe('UPDATE_OBFUSCATION Action', () => {
        it('should update obfuscation config', () => {
            const config: ObfuscationConfig = {
                method: 'pixelate',
                intensity: 0.8,
            };

            const action: GameCreationAction = {
                type: 'UPDATE_OBFUSCATION',
                payload: config,
            };

            interactor.dispatch(action);

            expect(interactor.state.obfuscationConfig).toEqual(config);
        });
    });

    describe('SET_TARGET_REGION Action', () => {
        it('should set target region', () => {
            const region = { x: 100, y: 200, width: 300, height: 400 };

            const action: GameCreationAction = {
                type: 'SET_TARGET_REGION',
                payload: region,
            };

            interactor.dispatch(action);

            expect(interactor.state.targetRegion).toEqual(region);
        });
    });

    describe('ADD_CLUE Action', () => {
        it('should add a clue to the clues array', () => {
            const clue: Clue = {
                id: 'clue-1',
                text: 'It has four wheels',
                difficulty: 'easy',
                cost: 10,
            };

            const action: GameCreationAction = {
                type: 'ADD_CLUE',
                payload: clue,
            };

            interactor.dispatch(action);

            expect(interactor.state.clues).toHaveLength(1);
            expect(interactor.state.clues[0]).toEqual(clue);
        });

        it('should add multiple clues', () => {
            const clue1: Clue = {
                id: 'clue-1',
                text: 'First clue',
                difficulty: 'hard',
                cost: 5,
            };

            const clue2: Clue = {
                id: 'clue-2',
                text: 'Second clue',
                difficulty: 'medium',
                cost: 10,
            };

            interactor.dispatch({ type: 'ADD_CLUE', payload: clue1 });
            interactor.dispatch({ type: 'ADD_CLUE', payload: clue2 });

            expect(interactor.state.clues).toHaveLength(2);
            expect(interactor.state.clues[0]).toEqual(clue1);
            expect(interactor.state.clues[1]).toEqual(clue2);
        });
    });

    describe('REMOVE_CLUE Action', () => {
        it('should remove a clue by id', () => {
            const clue1: Clue = {
                id: 'clue-1',
                text: 'First clue',
                difficulty: 'hard',
                cost: 5,
            };

            const clue2: Clue = {
                id: 'clue-2',
                text: 'Second clue',
                difficulty: 'medium',
                cost: 10,
            };

            interactor.dispatch({ type: 'ADD_CLUE', payload: clue1 });
            interactor.dispatch({ type: 'ADD_CLUE', payload: clue2 });
            interactor.dispatch({ type: 'REMOVE_CLUE', payload: 'clue-1' });

            expect(interactor.state.clues).toHaveLength(1);
            expect(interactor.state.clues[0].id).toBe('clue-2');
        });

        it('should not affect state if clue id does not exist', () => {
            const clue: Clue = {
                id: 'clue-1',
                text: 'First clue',
                difficulty: 'hard',
                cost: 5,
            };

            interactor.dispatch({ type: 'ADD_CLUE', payload: clue });
            interactor.dispatch({ type: 'REMOVE_CLUE', payload: 'non-existent' });

            expect(interactor.state.clues).toHaveLength(1);
        });
    });

    describe('RESET Action', () => {
        it('should reset to initial state', () => {
            const photo: Photo = {
                id: 'photo-1',
                originalUrl: 'file:///path/to/photo.jpg',
                width: 1920,
                height: 1080,
            };

            const clue: Clue = {
                id: 'clue-1',
                text: 'A clue',
                difficulty: 'easy',
                cost: 10,
            };

            // Set up some state
            interactor.dispatch({ type: 'SET_PHOTO', payload: photo });
            interactor.dispatch({ type: 'ADD_CLUE', payload: clue });
            interactor.dispatch({
                type: 'SET_TARGET_REGION',
                payload: { x: 0, y: 0, width: 100, height: 100 },
            });

            // Reset
            interactor.dispatch({ type: 'RESET' });

            // Verify reset to initial state
            expect(interactor.state.photo).toBeNull();
            expect(interactor.state.clues).toEqual([]);
            expect(interactor.state.targetRegion).toBeNull();
            expect(interactor.state.status).toBe('idle');
            expect(interactor.state.obfuscationConfig).toEqual({
                method: 'blur',
                intensity: 0.5,
            });
        });
    });

    describe('State Observation', () => {
        it('should notify observers when state changes', (done) => {
            const photo: Photo = {
                id: 'photo-1',
                originalUrl: 'file:///path/to/photo.jpg',
                width: 1920,
                height: 1080,
            };

            const subscription = interactor.observe((state) => {
                if (state.photo?.id === 'photo-1') {
                    expect(state.photo).toEqual(photo);
                    expect(state.status).toBe('editing');
                    subscription.unsubscribe();
                    done();
                }
            });

            interactor.dispatch({ type: 'SET_PHOTO', payload: photo });
        });
    });

    describe('State Immutability', () => {
        it('should not mutate previous state', () => {
            const initialState = interactor.state;
            const photo: Photo = {
                id: 'photo-1',
                originalUrl: 'file:///path/to/photo.jpg',
                width: 1920,
                height: 1080,
            };

            interactor.dispatch({ type: 'SET_PHOTO', payload: photo });

            expect(initialState.photo).toBeNull();
            expect(initialState.status).toBe('idle');
            expect(interactor.state.photo).toEqual(photo);
            expect(interactor.state.status).toBe('editing');
        });

        it('should not mutate clues array', () => {
            const clue: Clue = {
                id: 'clue-1',
                text: 'A clue',
                difficulty: 'easy',
                cost: 10,
            };

            const stateBefore = interactor.state;
            const cluesBefore = stateBefore.clues;

            interactor.dispatch({ type: 'ADD_CLUE', payload: clue });

            expect(cluesBefore).toHaveLength(0);
            expect(interactor.state.clues).toHaveLength(1);
        });
    });
});
