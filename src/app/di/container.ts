import 'reflect-metadata';
import { container } from 'tsyringe';
import { GameCreationInteractor } from '@/features/game-creation/interactors/GameCreationInteractor';
import { CameraInteractor } from '@/features/camera/interactors/CameraInteractor';

// Register interactors
container.registerSingleton(GameCreationInteractor);
container.registerSingleton(CameraInteractor);

export { container };
