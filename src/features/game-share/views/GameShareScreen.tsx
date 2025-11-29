import { useGameShareInteractor } from "../interactors";
import { AnswerView } from "./AnswerView";
import { PhotoView } from "./PhotoView";
import { StartView } from "./StartView";
import { GenerateView } from "./GenerateView";
import { ResultView } from "./ResultView";

export function GameShareScreen() {
    const { state, dispatch } = useGameShareInteractor()

    switch (state.mode) {
        case 'start':
            return <StartView state={state} dispatch={dispatch} />
        case 'photo':
            return <PhotoView state={state} dispatch={dispatch} />
        case 'answer':
            return <AnswerView state={state} dispatch={dispatch} />
        case 'generate':
            return <GenerateView state={state} dispatch={dispatch} />
        case 'result':
            return <ResultView state={state} dispatch={dispatch} />
        default:
            return null
    }
}