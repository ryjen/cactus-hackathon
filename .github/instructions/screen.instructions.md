---
applyTo: "**/features/views/*.Screen.tsx, **/features/views/*.View.tsx"
---

# Screen Instructions

## Context

These instructions apply to **Screens** which are the entry point to features. 

## Design

Screens are responsible for instantiating the interactor and providing a view.

They may also handle observable logic for the interactor.

Views are responsible for rendering the state of the interactor.

Views should be stateless and only render the state of the interactor.

Views should only dispatch actions to the interactor.

## Implementation

Screens are implemented as React components.

Views are implemented as React components.

ViewProps interface should be defined for the view to accept state and dispatch.

### Example
```typescript
export function MyScreen() {
    const {state, dispatch} = useInteractor(MyInteractor);
    return <MyView state={state} dispatch={dispatch} />;
}
```

```typescript
export interface ViewProps {
    state: MyState;
    dispatch: (action: MyAction) => void;
}
```

```typescript
export function MyView({state, dispatch}: ViewProps) {
    return <div></div>;
}
```

## Rules

1. **Use Interactor Hook**: Use `useInteractor` or custom `useFeatureInteractor` hook for state management.
2. **View Props**: Pass state and dispatch to view as props.
