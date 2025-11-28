import { CameraInteractor } from "../interactors";
import { useInteractor } from "@/lib/core/hooks";
import { container } from "tsyringe";

export function useCameraInteractor() {
    return useInteractor(container.resolve(CameraInteractor));
}