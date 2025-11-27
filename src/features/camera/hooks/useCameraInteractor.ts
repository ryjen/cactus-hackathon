import { CameraInteractor } from "../interactors/CameraInteractor";
import { useInteractor } from "@/lib/core/hooks";
import { container } from "tsyringe";

export function useCameraInteractor() {
    return useInteractor(container.resolve(CameraInteractor));
}