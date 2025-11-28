import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { Interactor } from '@/lib/core/interactors/Interactor';
import { CameraState, CameraAction } from '../types';
import { initialState, cameraReducer } from '../reducers/CameraReducer';
import { Router } from 'expo-router';

@injectable()
export class CameraInteractor extends Interactor<CameraState, CameraAction> {
    constructor(
        @inject('Router') private router: Router
    ) {
        super(initialState, cameraReducer);
    }

    induce(intent: CameraAction, state: CameraState): Promise<void> | void {
        switch (intent.type) {
            case 'CAPTURE':
                this.router.replace({
                    pathname: `/features/clues-creation`,
                    params: {
                        photoUrl: intent.payload
                    }
                });
                break;
        }
    }
}