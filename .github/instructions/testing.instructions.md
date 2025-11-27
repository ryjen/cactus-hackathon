---
applyTo: "**/*.test.ts"
---

# Testing Instructions

## Context
These instructions apply to all **Test Files**.

## Guidelines
1. **AAA Pattern**: Arrange, Act, Assert.
2. **Isolation**: Tests should not depend on each other.
3. **Mocking**:
   - Use `jest.mock()` for external modules.
   - Use dependency injection to pass mock implementations.

## Naming
- `describe('UnitName', ...)`
- `it('should expected behavior', ...)`

## Coverage
- **Domain**: High coverage required.
- **Utils**: High coverage required.
- **UI**: Focus on user interactions and state updates.
