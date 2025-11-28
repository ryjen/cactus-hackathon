import { useEffect } from "react";
import { useCluesInteractor } from "../hooks";
import { CluesView } from "./CluesView";
import { useLocalSearchParams } from "expo-router";

export function CluesScreen() {
    const { state, dispatch } = useCluesInteractor();
    const params = useLocalSearchParams<{ photoUrl: string }>()

    useEffect(() => {
        // Use the param photoUrl, or fallback to a test URL for development
        const photoUrl = params.photoUrl || 'https://picsum.photos/400/300';

        if (photoUrl) {
            dispatch({ type: 'START', payload: photoUrl });
        }
    }, [params.photoUrl, dispatch]);

    return (<CluesView state={state} dispatch={dispatch} />)
}
