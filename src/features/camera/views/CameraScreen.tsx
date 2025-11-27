import { useCameraInteractor } from "../hooks/useCameraInteractor";
import { CameraView } from "./CameraView";

export function CameraScreen() {
    const { state, dispatch } = useCameraInteractor();
    return (<CameraView state={state} dispatch={dispatch} />)
}
