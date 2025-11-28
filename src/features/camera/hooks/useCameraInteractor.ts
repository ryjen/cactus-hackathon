import { useRef } from "react";
import { CameraInteractor } from "../interactors";
import { useInteractor } from "@/lib/core/hooks";
import { container } from "tsyringe";

export function useCameraInteractor() {
    const interactorRef = useRef<CameraInteractor | null>(null);
    if (!interactorRef.current) {
        interactorRef.current = container.resolve(CameraInteractor);
    }
    return useInteractor(interactorRef.current);
}