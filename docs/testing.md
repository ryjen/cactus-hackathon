# Testing Strategy

## Overview

We use **Jest** and **React Native Testing Library** for testing our Expo application.

## Running Tests

To run the test suite:

```bash
npm test
```

To run tests in watch mode:

```bash
npm test -- --watch
```

## Testing Layers (Planned)

### 1. Unit Tests
- **Focus**: Pure business logic (Use Cases, Services, Interactors).
- **Location**: Co-located with source files (`*.test.ts`).
- **Tools**: Jest.

### 2. Component Tests
- **Focus**: UI rendering and user interactions.
- **Location**: `__tests__` directories or co-located.
- **Tools**: React Native Testing Library.

### 3. Integration Tests
- **Focus**: Interaction between Interactors and Stores.
- **Tools**: Jest.

## Best Practices

- **Mock External Dependencies**: Use dependency injection to mock repositories and services.
- **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it.
- **Keep Tests Fast**: Avoid heavy setup/teardown in unit tests.
