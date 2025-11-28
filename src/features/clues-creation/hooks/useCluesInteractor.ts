import { useInteractor } from "@/lib/core/hooks";
import { CluesInteractor } from "../interactors/CluesInteractor";
import { container } from "tsyringe";

export const useCluesInteractor = () => {
    return useInteractor(container.resolve(CluesInteractor));
};