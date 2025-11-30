import 'reflect-metadata';
import { container } from 'tsyringe';
import { ObfuscationService } from '@/lib/domain/services';
import { router } from 'expo-router';
import { PhotoRepository } from '@/lib/data/repositories';
import { PromptRepository } from '@/lib/data/repositories/PromptRepository';
import { CluesPromptDataSource, PhotoLocalSource } from '@/lib/data/datasources';
import type { PromptRepository as IPromptRepository, PhotoRepository as IPhotoRepository } from '@/lib/domain/types';
import { PromptRepositoryToken } from '@/lib/domain/types/repositories';

// Register services
container.registerSingleton(ObfuscationService);
container.registerInstance('Router', router);

container.register<IPhotoRepository>(PhotoRepository, {
    useClass: PhotoRepository
})

container.register(PhotoLocalSource, {
    useClass: PhotoLocalSource
})

container.register<IPromptRepository>(PromptRepositoryToken, {
    useClass: PromptRepository
})

container.register(CluesPromptDataSource, {
    useClass: CluesPromptDataSource
})

export { container };
