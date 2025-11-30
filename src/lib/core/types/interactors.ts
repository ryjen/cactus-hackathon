import { Subscription } from "rxjs";

export interface Intent<Payload = undefined> {
    type: string;
    payload?: Payload;
}

export type Action<Type extends string, Payload = undefined> = Intent<Payload> & { type: Type };

export type Reducer<State, Intent extends Action<string, any>> = (state: State, intent: Intent) => State;

export interface Inducer<State, Intent extends Action<string, any>> {
    induce(intent: Intent, state: State): Promise<void> | void;
};

export interface InteractorHook<S, I> {
    state: S;
    dispatch: (intent: I) => void;
    observe: (observer: (value: S) => void) => Subscription;
}
