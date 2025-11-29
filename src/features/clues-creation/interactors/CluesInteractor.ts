import { Interactor } from "@/lib/core/interactors";
import { CluesState, CluesAction, CluesResult } from "../types";
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
            case 'RESULT':
                try {
                    console.log('parsing', intent.payload)
                    const lines = intent.payload!.result!.trim().split('\n');
                    const pos = lines.findIndex(l => l.includes("::"));
                    const end = lines.findLastIndex(l => l.includes("::"));
                    const clues = lines.slice(pos, end + 1).map(r => r.split('::'));
                    const result: CluesResult = {
                        answer: intent.payload!.answer!,
                        clues: clues.map(([difficulty, clue]) => ({
                            difficulty: difficulty.trim(),
                            clue: clue.trim()
                        }))
                    }
                    console.log('result', result)
                    return this.router.replace({
                        pathname: `/features/game-creation`,
                        params: {
                            photoUrl: state.photoUrl,
                            clues: JSON.stringify(result)
                        }
                    });
                } catch (error: any) {
                    console.error(error);
                    this.dispatch({ type: 'ERROR', payload: error });
                }
        }
    }
}