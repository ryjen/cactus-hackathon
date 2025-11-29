import { DependencyContainer } from "tsyringe";
import { GameShareScreen } from "./views";
import { FeatureMetadata } from "@/lib/domain/types";
import { GameShareInteractor } from "./interactors";

const feature: FeatureMetadata = {
    name: 'game-share',
    entryComponent: GameShareScreen,
    hooks: [],
    screens: { index: GameShareScreen },
    init: (container: DependencyContainer) => {
        container.registerSingleton(GameShareInteractor);
        container.register('GameShareScreen', { useValue: GameShareScreen })
    }
}

export default feature