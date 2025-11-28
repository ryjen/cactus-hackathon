import { type DependencyContainer } from 'tsyringe';
import { CameraScreen } from './views';
import { CameraInteractor } from './interactors';
import { FeatureMetadata } from '@/lib/domain/types';

const feature: FeatureMetadata = {
    name: 'camera',
    entryComponent: CameraScreen,
    screens: { index: CameraScreen },
    init: (container: DependencyContainer) => {
        container.register(CameraInteractor, { useClass: CameraInteractor })
        container.register('CameraScreen', { useValue: CameraScreen })
    }
}

export default feature