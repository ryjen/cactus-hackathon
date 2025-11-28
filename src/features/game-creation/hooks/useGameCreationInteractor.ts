import { container } from 'tsyringe';
import { GameCreationInteractor } from '@/features/game-creation/interactors/GameCreationInteractor';
import { useInteractor } from '@/lib/core/hooks/useInteractor';

export function useGameCreationInteractor() {
    const interactor = container.resolve(GameCreationInteractor);
    return useInteractor(interactor);
}
