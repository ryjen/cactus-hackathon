import React, { useEffect } from "react";
import type { GameCreationProps } from "../types";
import { useGameCreationInteractor } from "../hooks";
import { GameCreationView } from "./GameCreationView";
import { ClueEditorView } from "./ClueEditorView";
import { ObfuscationEditorView } from "./ObfuscationEditorView";
import { ReviewGameView } from "./ReviewGameView";

export function GameCreationScreen({ params }: GameCreationProps) {
    const { state, dispatch } = useGameCreationInteractor();

    useEffect(() => {
        dispatch({ type: 'LOAD_PHOTO', payload: params });
    }, [params]);

    switch (state.step) {
        case 'obfuscate':
            return <ObfuscationEditorView state={state} dispatch={dispatch} />;
        case 'clues':
            return <ClueEditorView state={state} dispatch={dispatch} />;
        case 'review':
            return <ReviewGameView state={state} dispatch={dispatch} />;
        default:
            return <GameCreationView state={state} dispatch={dispatch} />
    }
}