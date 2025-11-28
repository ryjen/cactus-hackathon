import { Interactor } from "@/lib/core/interactors";
import { CluesState, CluesAction } from "../types";
import { default as reducer, initialState } from "./reducer";
import { Router } from "expo-router";
import { inject, injectable } from "tsyringe";

@injectable()
export class CluesInteractor extends Interactor<CluesState, CluesAction> {
    constructor(
        @inject('Router') private router: Router
    ) {
        super(initialState, reducer);
    }

    induce(intent: CluesAction, state: CluesState): Promise<void> | void {
        switch (intent.type) {
            case 'SAVE':
                return this.router.replace({
                    pathname: `/features/game`,
                    params: {
                        photoUrl: state.photoUrl,
                        clues: state.clues
                    }
                });
        }
    }
}