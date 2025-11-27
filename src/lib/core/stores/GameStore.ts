import { create } from 'zustand';
import { Game, Guess } from '../types';

interface GameState {
    game: Game | null;
    setGame: (game: Game) => void;
    addGuess: (guess: Guess) => void;
    reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    game: null,
    setGame: (game) => set({ game }),
    addGuess: (guess) =>
        set((state) => {
            if (!state.game) return {};
            return {
                game: {
                    ...state.game,
                    guesses: [...state.game.guesses, guess],
                },
            };
        }),
    reset: () => set({ game: null }),
}));
