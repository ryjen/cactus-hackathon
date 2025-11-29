import { useEffect } from "react";
import { useCluesInteractor } from "../hooks";
import { CluesView } from "./CluesView";
import { useLocalSearchParams } from "expo-router";
import { AudioView } from "./AudioView";
import { ProgressAnimation } from "./components/ProgressAnimation";
import StatusMessage from "./components/StatusMessage";

export function CluesScreen() {
    const { state, dispatch } = useCluesInteractor();
    const params = useLocalSearchParams<{ photoUrl: string }>()

    useEffect(() => {
        if (params.photoUrl) {
            dispatch({ type: 'PHOTO', payload: params.photoUrl });
        }
    }, [params.photoUrl, dispatch]);

    if (state.busy) {
        return <ProgressAnimation visible={true}>
            <StatusMessage custom={state.messages} textStyle={{ color: 'white' }} />
        </ProgressAnimation>
    }

    switch (state.mode) {
        case 'audio':
            return <AudioView state={state} dispatch={dispatch} />
        case 'image':
            return <CluesView state={state} dispatch={dispatch} />
    }

}
