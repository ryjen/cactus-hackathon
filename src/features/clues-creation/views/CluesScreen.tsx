import { useEffect } from "react";
import { useCluesInteractor } from "../hooks";
import { CluesView } from "./CluesView";
import { useLocalSearchParams } from "expo-router";

export function CluesScreen() {
    const { state, dispatch } = useCluesInteractor();
    const params = useLocalSearchParams<{ photoUrl: string }>()

    useEffect(() => {
        dispatch({ type: 'START', payload: params.photoUrl });
    }, [params.photoUrl]);

    return (<CluesView state={state} dispatch={dispatch} />)
}
