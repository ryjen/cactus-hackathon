import { Interactor } from "@/lib/core/interactors";
import type { GameShareAction, GameShareState } from "../types";
import reducer from "./reducer";
import { injectable, inject, container, singleton } from "tsyringe";
import type { Router } from "expo-router";
import { useInteractor } from "@/lib/core/hooks";

@singleton()
@injectable()
export class GameShareInteractor extends Interactor<GameShareState, GameShareAction> {

    constructor(
        @inject('Router') private router: Router,
    ) {
        super(
            {
                mode: 'start',
            },
            reducer,
        )
    }

    async induce(intent: GameShareAction, state: GameShareState): Promise<void> {
        switch (intent.type) {
            case 'FINISH':
                this.router.replace('/features/welcome');
                break;
        }
    }

}

export const useGameShareInteractor = () => {
    return useInteractor(container.resolve(GameShareInteractor));
}