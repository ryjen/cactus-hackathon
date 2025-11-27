# Project Guidelines

[agents template](./agents-template.md)

## Context

**Eyespie** is a turn-based game where a player takes an image and gives clues to another to guess it. It follows a Clean Architecture with MVI (Model-View-Intent) pattern on the frontend.

### Tech Stack
- **Frontend**: Expo, React Native, iOS, Android, CSS, Zustand
- **Architecture**: Clean Architecture, MVI, Dependency Injection

### Directory Structure

- `src/lib`: Core application logic (Domain, Data, DI).
- `src/features`: Feature-based modules (Interactors, Views).
- `src/lib/core`: Core abstractions (Types, Interactors).
- `src/components`: Reusable UI components.
- `src/app`: Application entry point
- `src/infrastructure`: Infrastructure (External services)

[chatmodes](./chatmodes/)
[instructions](./instructions/)
[prompts](./prompts/)
[specs](./specs/)

### Domain Boundaries
- **Presentation**: UI only, no business logic. Uses Interactors.
- **Domain**: Pure business logic, no framework dependencies.
- **Data**: Data access implementation, implements Domain interfaces.
- **Infrastructure**: External services (DB, Network).

## Rules

1. **Clean Architecture**: Respect layer boundaries. Dependencies point inward (Presentation -> Domain <- Data).
2. **MVI Pattern**: Use Interactors for state management in features. State is immutable.
3. **Dependency Injection**: Use the DI container for resolving dependencies.
4. **Testing**: Write unit tests for Use Cases and Services.
5. **Strict Types**: No `any`. Define interfaces for all data structures.
