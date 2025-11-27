import { useStore } from 'zustand';
import { Interactor } from '../interactors/Interactor';
import { Subscription } from 'rxjs';
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

    return {
        state,
        dispatch: interactorInstance.dispatch.bind(interactorInstance),
        observe: interactorInstance.observe.bind(interactorInstance)
    };
}
