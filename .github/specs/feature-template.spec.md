# Feature Specification: [Feature Name]

## Goal
[What is the user value?]

## User Stories
- As a [role], I want [action], so that [benefit].

## Architecture

### Domain
- **Entities**: [New entities]
- **Use Cases**:
  - `DoSomethingUseCase` see [domain.instructions.md](./domain.instructions.md)
  - `GetSomethingUseCase` see [domain.instructions.md](./domain.instructions.md)

### Data
- **Repository**: `ISomethingRepository` see [domain.instructions.md](./domain.instructions.md)
- **Mapping**:
  - `SomethingMapperToDomain`

### Presentation

- **Interactor**: `SomethingInteractor` see [interactors.instructions.md](./interactors.instructions.md)
- **Screen**: `SomethingScreen` see [screen.instructions.md](./screen.instructions.md)
- **Reducer**: `SomethingReducer` see [mvi.instructions.md](./mvi.instructions.md)
- **Actions**: `SomethingActions` see [mvi.instructions.md](./mvi.instructions.md)

## Verification
- [ ] Unit tests for Use Cases
- [ ] Integration test for Repository
- [ ] Manual verification of UI flow
