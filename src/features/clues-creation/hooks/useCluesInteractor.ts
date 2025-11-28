import { useRef } from "react";
import { useInteractor } from "@/lib/core/hooks";
import { CluesInteractor } from "../interactors/CluesInteractor";
import { container } from "tsyringe";

export const useCluesInteractor = () => {
    // Use useRef to ensure the interactor instance is stable across renders
    const interactorRef = useRef<CluesInteractor | null>(null);
    if (!interactorRef.current) {
        interactorRef.current = container.resolve(CluesInteractor);
    }
    return useInteractor(interactorRef.current);
};