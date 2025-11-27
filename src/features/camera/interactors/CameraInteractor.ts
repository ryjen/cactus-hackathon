import { injectable } from 'tsyringe';
import { Interactor } from '@/lib/core/interactors/Interactor';
import { CameraState, CameraAction } from '../types';
import { initialState, cameraReducer } from '../reducers/CameraReducer';

@injectable()
export class CameraInteractor extends Interactor<CameraState, CameraAction> {
    constructor() {
        super(initialState, cameraReducer);
    }
}