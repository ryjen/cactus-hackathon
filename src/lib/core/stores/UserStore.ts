import { create } from 'zustand';
import { Player } from '../types';

interface UserState {
    player: Player | null;
    setPlayer: (player: Player) => void;
    updateName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    player: null,
    setPlayer: (player) => set({ player }),
    updateName: (name) =>
        set((state) => {
            if (!state.player) return {};
            return {
                player: {
                    ...state.player,
                    name,
                },
            };
        }),
}));
