import type { DependencyContainer } from 'tsyringe';
import { CluesScreen } from './views';
import { CluesInteractor } from './interactors';
import { useCluesInteractor } from './hooks';
import { FeatureMetadata } from '@/lib/domain/types';

const feature: FeatureMetadata = {
    name: 'clues-creation',
    entryComponent: CluesScreen,
    hooks: {
        interactor: useCluesInteractor,
    },
    screens: {
        index: CluesScreen
    },
    init: (container: DependencyContainer) => {
        container.register('CluesScreen', { useValue: CluesScreen })
        container.register(CluesInteractor, { useClass: CluesInteractor })
    }
}

export default feature
