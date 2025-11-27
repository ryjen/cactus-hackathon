# Project Conventions

This document outlines the standards and conventions used in the Outermesh project. Adhering to these guidelines ensures consistency, maintainability, and scalability.

## Architecture

We follow **Clean Architecture** principles combined with the **MVI (Model-View-Intent)** pattern for the frontend.

### Layers
1.  **Presentation Layer** (`src/components`, `src/features`)
    *   **Responsibility**: UI rendering and user interaction.
    *   **Rules**: No business logic. Delegates to Interactors.
2.  **Domain Layer** (`src/lib/domain`, `src/lib/core`)
    *   **Responsibility**: Pure business logic, entities, and use cases.
    *   **Rules**: Framework-agnostic. No dependencies on outer layers.
3.  **Data Layer** (`src/lib/data`)
    *   **Responsibility**: Data access and persistence.
    *   **Rules**: Implements domain interfaces (Repositories).
4.  **Infrastructure Layer** (`src/server`, `prisma`)
    *   **Responsibility**: External services, database, network.

### MVI Pattern (Frontend)
*   **Model**: Immutable state managed by Zustand.
*   **View**: React components that render state and dispatch intents.
*   **Intent**: Actions dispatched to Interactors to trigger state changes.
*   **Interactor**: Handles business logic, side effects, and updates the store.

## Naming Conventions

| Type | Convention | Example |
| :--- | :--- | :--- |
| **Directories** | kebab-case | `src/features/auth` |
| **Files** | PascalCase (Components/Classes) <br> camelCase (Utils/Hooks) | `TerminalScreen.tsx` <br> `useGameInteractor.ts` |
| **Classes** | PascalCase | `GameInteractor`, `UserRepository` |
| **Interfaces** | PascalCase (Prefix 'I' for core interfaces only) | `IRepository`, `User` |
| **Functions** | camelCase | `calculateScore`, `fetchUser` |
| **Variables** | camelCase | `currentUser`, `isLoading` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_URL` |
| **React Components** | PascalCase | `PuzzleGrid`, `LoginButton` |
| **Hooks** | camelCase (Prefix 'use') | `useWindowSize`, `useAuth` |

## Code Style

### General
*   **Strict Typing**: Avoid `any`. Define interfaces for all data structures.
*   **Async/Await**: Prefer `async/await` over raw Promises.
*   **Functional Style**: Prefer pure functions and immutability where possible.
*   **Early Returns**: Use guard clauses to reduce nesting.

### React
*   **Functional Components**: Use functional components with hooks.
*   **Composition**: Prefer composition over inheritance.
*   **Props**: Destructure props in the function signature.

### Comments
*   **JSDoc**: Use JSDoc for public interfaces, complex logic, and exported functions.
*   **Why, not What**: Comments should explain the *reasoning* behind code, not just describe what it does.

## State Management

*   **Global State**: Use **Zustand** for shared state across features.
*   **Local State**: Use `useState` or `useReducer` for component-specific UI state (e.g., form inputs, toggle state).
*   **Interactors**: Encapsulate state logic in Interactors. Components should not directly modify global state.

## Testing

*   **Framework**: Jest + React Testing Library.
*   **Pattern**: AAA (Arrange, Act, Assert).
*   **Unit Tests**: Focus on Domain Logic (Use Cases, Services). Mock external dependencies.
*   **Integration Tests**: Test interactions between layers (e.g., Interactor + Store).
*   **File Naming**: `*.test.ts` or `*.spec.ts`.

## Git Workflow

### Commit Messages
Follow the **Conventional Commits** specification:

*   `feat: ...` - A new feature
*   `fix: ...` - A bug fix
*   `docs: ...` - Documentation only changes
*   `style: ...` - Changes that do not affect the meaning of the code (white-space, formatting, etc)
*   `refactor: ...` - A code change that neither fixes a bug nor adds a feature
*   `perf: ...` - A code change that improves performance
*   `test: ...` - Adding missing tests or correcting existing tests
*   `chore: ...` - Changes to the build process or auxiliary tools

**Example**: `feat(auth): implement login with JWT`

## Directory Structure

*   `src/lib`: Core application logic (Domain, Data, DI).
*   `src/features`: Feature-based modules (Interactors, Views).
*   `src/components`: Reusable UI components.
*   `src/server`: Backend server code.
*   `docs`: Project documentation.
*   `.github`: CI/CD, Agent configuration, Issue templates.
