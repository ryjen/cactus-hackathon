import { useCallback } from 'react';
import { useStore } from 'zustand';
import { Interactor } from '../interactors/Interactor';
import { Action, InteractorHook } from '../types';

/**
 * Hook to use a Feature Interactor
 * @param interactorFactory Factory function or instance of the interactor
 */
export function useInteractor<S, I extends Action<string, any>>(
    interactorInstance: Interactor<S, I>
): InteractorHook<S, I> {
    // We assume the interactor instance is stable (passed from DI or context)
    // If it's created on the fly, this hook might re-subscribe unnecessarily, 
    // but typically it should be resolved once per component lifecycle or passed via props.

    // Use Zustand hook for reactivity
    const state = useStore(interactorInstance.getStore());

    // Memoize dispatch and observe to prevent creating new function references on every render
    const dispatch = useCallback((intent: I) => {
        interactorInstance.dispatch(intent);
    }, [interactorInstance]);

    const observe = useCallback((observer: (value: S) => void) => {
        return interactorInstance.observe(observer);
    }, [interactorInstance]);

    return {
        state,
        dispatch,
        observe
    };
}
