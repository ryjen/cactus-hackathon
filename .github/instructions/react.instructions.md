---
applyTo: "**/*.tsx"
---

# React & UI Instructions

## Context
These instructions apply to **React Components** and **Views** (`.tsx` files).

## Architecture
- **Views**: Located in `src/features/{feature}/views/`.
- **Components**: Shared UI in `src/lib/components/`.
- **Pattern**: **MVI (Model-View-Intent)**.
  - Views receive `state` and `dispatch` from an Interactor hook.
  - Views **never** contain business logic.
  - Views **only** dispatch actions (Intents).

## Styling CSS)
- Use **CSS** utility classes.
- **Example**:
  ```tsx
  <Text style={{ padding: Theme.spacing(4), backgroundColor: Theme.colors.gray[100] }}>
    Hello World
  </Text>
  ```

## Testing
- Use **React Testing Library**.
- Test that user interactions dispatch the correct actions.
