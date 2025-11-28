import { injectable, inject } from 'tsyringe';
import { Interactor } from '@/lib/core/interactors/Interactor';
import { GameCreationState, GameCreationAction } from '../types';
import { initialState, gameCreationReducer } from '../reducers/GameCreationReducer';
import { ObfuscationService } from '@/lib/domain/services/ObfuscationService';
import { PhotoFromUrl } from '../usecases/PhotoFromUrl';
import { SharingService } from '@/lib/domain/services/SharingService';

@injectable()
export class GameCreationInteractor extends Interactor<
    GameCreationState,
    GameCreationAction
> {
    constructor(
        @inject(ObfuscationService) private obfuscationService: ObfuscationService,
        @inject(PhotoFromUrl) private loadPhoto: PhotoFromUrl,
        @inject(SharingService) private sharingService: SharingService
    ) {
        super(initialState, gameCreationReducer);
    }

    public async induce(intent: GameCreationAction, state: GameCreationState): Promise<void> {
        switch (intent.type) {
            case 'LOAD_PHOTO':
                const photo = await this.loadPhoto.execute(intent.payload.photoUrl);
                this.dispatch({ type: 'SET_PHOTO', payload: photo });
                break;
            case 'SET_TARGET_REGION':
                if (state.photo && state.targetRegion) {
                    try {
                        const newUrl = await this.obfuscationService.obfuscate(
                            state.photo,
                            state.targetRegion,
                            state.obfuscationConfig
                        );
                        this.dispatch({ type: 'OBFUSCATION_SUCCESS', payload: newUrl });
                    } catch (error) {
                        console.error('Obfuscation failed', error);
                        // Handle error (dispatch error action)
                    }
                }
                break;
            case 'FINALIZE_GAME':
                // Construct the game object
                // For now, we'll just mock it or use what we have in state
                // Ideally, we should save it to a backend or local storage first
                if (state.photo && state.obfuscatedUrl) {
                    const game = {
                        id: state.photo.id,
                        photoUrl: state.obfuscatedUrl, // Sharing the obfuscated one? Or original?
                        // We need a proper Game type construction here
                        // But for sharing service, we just need an ID mostly
                    };

                    // TODO: Save game

                    this.sharingService.shareGame(game as any);
                }
                break;
            default:
                break;
        }
    }
}
