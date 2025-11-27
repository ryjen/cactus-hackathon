import { injectable } from 'tsyringe';
import { Interactor } from '@/lib/core/interactors/Interactor';
import { GameCreationState, GameCreationAction } from '@/features/game-creation/types';
import { initialState, gameCreationReducer } from '@/features/game-creation/reducers/GameCreationReducer';

@injectable()
export class GameCreationInteractor extends Interactor<
    GameCreationState,
    GameCreationAction
> {
    constructor() {
        super(initialState, gameCreationReducer);
    }
}
