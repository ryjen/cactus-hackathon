import { useRef } from 'react';
import { container } from 'tsyringe';
import { GameCreationInteractor } from '@/features/game-creation/interactors/GameCreationInteractor';
import { useInteractor } from '@/lib/core/hooks/useInteractor';

export function useGameCreationInteractor() {
    const interactorRef = useRef<GameCreationInteractor | null>(null);
    if (!interactorRef.current) {
        interactorRef.current = container.resolve(GameCreationInteractor);
    }
    return useInteractor(interactorRef.current);
}
