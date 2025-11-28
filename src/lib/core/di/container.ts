import 'reflect-metadata';
import { container } from 'tsyringe';
import { GameCreationInteractor } from '@/features/game-creation/interactors/GameCreationInteractor';
import { CameraInteractor } from '@/features/camera/interactors/CameraInteractor';
import { CluesInteractor } from '@/features/clues-creation/interactors/CluesInteractor';
import { ObfuscationService } from '@/lib/domain/services/ObfuscationService';
import { SharingService } from '@/lib/domain/services/SharingService';
import { router } from 'expo-router';

// Register interactors
container.registerSingleton(GameCreationInteractor);
container.registerSingleton(CameraInteractor);
container.registerSingleton(CluesInteractor);

// Register services
container.registerSingleton(ObfuscationService);
container.registerSingleton(SharingService);
container.registerInstance('Router', router);

export { container };
