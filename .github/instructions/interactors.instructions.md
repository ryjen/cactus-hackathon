---
applyTo: "**/*Interactor.ts"
---

# Interactor Instructions

## Context
These instructions apply to **Interactors** which contain the business logic for features.

## MVI Pattern
- **State**: Managed by a Zustand store.
- **Reducer**: Pure function for synchronous updates.
- **Inducer**: Method for async side effects.
- **Observe**: Method for observables built from store.

## Rules
1. **Extend Base**: Must extend `Interactor<State, Action>`.
2. **Dependency Injection**: Dependencies (Use Cases, Repositories) must be injected via constructor.
3. **Pure Logic**: Keep logic out of the View, only used dispatching actions.
4. **Strict Types**: Define explicit `State` and `Action` types.

## Example
```typescript
class GameInteractor extends Interactor<GameState, GameAction> {
  constructor(
    private readonly useCase: GetGameUseCase,
    store: StoreApi<GameState>
  ) {
    super(store, gameReducer);
  }

  protected async inducer(state: GameState, action: GameAction): Promise<void> {
    if (action.type === 'START') {
      await this.useCase.execute();
      this.dispatch({ type: 'STARTED' });
    }
  }
}
```
