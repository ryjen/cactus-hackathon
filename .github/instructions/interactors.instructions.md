---
applyTo: "{**/interactors/*.ts, **/features/hooks/*.ts, **/lib/core/hooks/*.ts}"
---

# Interactor Instructions

## Context

These instructions apply to **Interactors** which contain the business logic for features.

## Design

Interactors are implemented as classes with a state, reducer, and inducer.

- **State**: Managed by a Zustand store.
- **Reducer**: Pure function parameter for synchronous updates.
- **Inducer**: Overriden method for async side effects.
- **Observe**: Observable built from store and interacted with `observe` method.

## Rules
1. **Extend Base**: Must extend `Interactor<State, Action>`.
2. **Dependency Injection**: [Dependencies](./dependencies.instructions.md) (Use Cases, Repositories) must be injected via constructor.
3. **Pure Logic**: Keep logic out of the View, only used dispatching actions.
4. **Strict Types**: Define explicit `State` and `Action` types.
5. **Reducers**: Define in a reducers.ts file or folder.
6. **Hook**: Use `useInteractor` hook for state management.

## Base Interactor
```typescript

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
        // Initialize Zustand store
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

    public induce(intent: Intent, state: State): Promise<void> | void {
      // Do nothing by default
     }

    public dispatch(intent: Intent): void {

        // 1. Reduce
        const currentState = this.store.getState();
        const newState = this.reducer(currentState, intent);

        // Only update if state changed
        if (newState !== currentState) {
            this.store.setState(newState, true); // true = replace
        }

        // 2. Induce (Side Effects)
        this.induce(intent, this.store.getState());
    };

    public get state(): State {
        return this.store.getState();
    }


    public observe(observer: (value: State) => void): Subscription {
        // Returns RxJs subscription
        return this.state$.subscribe(observer);
    }

    public getStore(): StoreApi<State> {
        return this.store;
    }
}
```

## Base Interactor Hook
```typescript

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

```

## Example Interactor
```typescript
class GameInteractor extends Interactor<GameState, GameAction> {
  constructor(
    private readonly useCase: GetGameUseCase,
    private readonly initialState: GameState
  ) {
    super(initialState, gameReducer);
  }

  protected async inducer(state: GameState, action: GameAction): Promise<void> {
    if (action.type === 'START') {
      await this.useCase.execute();
      this.dispatch({ type: 'STARTED' });
    }
  }
}
```

## Example Hook
```typescript
export function useGameInteractor() {
    const interactor = useInteractor(GameInteractor);
    return interactor;
}
```

