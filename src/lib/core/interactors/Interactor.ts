import { create, StoreApi } from 'zustand';
import { Observable, Subscription } from 'rxjs';
import { Reducer } from 'react';
import { Action, Inducer } from '@/lib/core/types';

/**
 * Generic MVI Interactor
 * Composes state, reducer, and inducer.
 */
export class Interactor<State, Intent extends Action<string, any>> implements Inducer<State, Intent> {
    private readonly store: StoreApi<State>;
    private readonly state$: Observable<State>;
    private readonly reducer: Reducer<State, Intent>;

    constructor(
        initialState: State,
        reducer: Reducer<State, Intent>
    ) {
        this.store = create(() => initialState);
        this.reducer = reducer;

        this.state$ = new Observable((subscriber) => {
            // Sync Zustand store to Observable
            const unsubscribe = this.store.subscribe((state) => {
                subscriber.next(state);
            });

            return unsubscribe;
        });
    }

    public induce(intent: Intent, state: State): Promise<void> | void { }

    public dispatch(intent: Intent): void {
        // 1. Reduce
        console.log(intent);
        const currentState = this.store.getState();
        const newState = this.reducer(currentState, intent);

        // Only update if state changed
        if (newState !== currentState) {
            this.store.setState(newState);
        }

        // 2. Induce (Side Effects)
        this.induce(intent, this.store.getState());
    };

    public get state(): State {
        return this.store.getState();
    }


    public observe(observer: (value: State) => void): Subscription {
        return this.state$.subscribe(observer);
    }

    public getStore(): StoreApi<State> {
        return this.store;
    }
}
