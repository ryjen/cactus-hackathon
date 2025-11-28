---
applyTo: {"**/features/**/interactors/**.ts", "**/features/**/views/**.ts", "**/features/**/hooks/**.ts", "**/features/**/reducers/**.ts", "**/features/**/types/**.ts"}
---

## MVI Instructions

### Context
These instructions apply to **MVI** (Model-View-Intent) architecture.  

### Design


Intents are implemented as classes with a type and payload.

Actions are specialized Intents that may not have a payload.

Reducers are functions that take the current state and an intent and return a new state.

Inducers are functions that take the current state and an intent and perform side effects.

Interactors are responsible for reducing the state and inducing side effects.

Views are responsible for observing the state and rendering accordingly.

Hooks are used to access the state and dispatch intents and provide reactivity.


### Implementation

```typescript

export interface Intent<Payload = undefined> {
    type: string;
    payload?: Payload;
}

export type Action<Type extends string, Payload = undefined> = Intent<Payload> & { type: Type };

export type Reducer<State, Intent extends Action<string, any>> = (state: State, intent: Intent) => State;

export interface Inducer<State, Intent extends Action<string, any>> {
    induce(intent: Intent, state: State, dispatch: (intent: Intent) => void): Promise<void> | void;
};

export interface InteractorHook<S, I> {
    state: S;
    dispatch: (intent: I) => void;
    observe: (observer: (value: S) => void) => Subscription;
}
```