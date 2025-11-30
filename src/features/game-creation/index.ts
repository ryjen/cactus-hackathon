import { DependencyContainer } from "tsyringe"
import { useGameCreationInteractor } from "./hooks"
import { GameCreationInteractor } from "./interactors"
import { GameCreationScreen } from "./views"
import { PhotoFromUrl } from "./usecases/PhotoFromUrl"
import { FeatureMetadata } from "@/lib/domain/types"

const feature: FeatureMetadata = {
    name: 'game-creation',
    entryComponent: GameCreationScreen,
    hooks: [useGameCreationInteractor],
    screens: { index: GameCreationScreen },
    init: (container: DependencyContainer) => {
        container.register('GameCreationScreen', { useValue: GameCreationScreen })
        container.register(GameCreationInteractor, { useClass: GameCreationInteractor })
        container.register(PhotoFromUrl, { useClass: PhotoFromUrl })
    }
}

export default feature