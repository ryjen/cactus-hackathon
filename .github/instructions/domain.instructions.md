---
applyTo: "src/lib/domain/**/*.ts"
---

# Domain Layer Instructions

## Context
These instructions apply to **Domain Entities**, **Use Cases**, and **Repository Interfaces**.

## Rules
1. **No Dependencies**: The Domain layer must NOT depend on Data, Infrastructure, or Presentation layers.
2. **Pure TypeScript**: Use plain classes and interfaces. No framework-specific code (e.g., no React, no Prisma imports).
3. **Use Cases**:
   - Implement `IUseCase<Input, Output>`.
   - Single responsibility (one business action per class).
4. **Entities**:
   - Define the core data structures of the application.
   - Include validation logic if necessary.

## Testing
- **Unit Tests**: This layer must have 100% unit test coverage.
- **Mocking**: Mock repository interfaces when testing Use Cases.
