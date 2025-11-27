---
applyTo: "src/lib/data/**/*.ts"
---

# Data Layer Instructions

## Context
These instructions apply to **Repositories** and **Data Sources**.

## Rules
1. **Implement Interfaces**: Repositories must implement interfaces defined in the Domain layer.
2. **Data Mapping**: Convert Database Models (Prisma) to Domain Entities. Never leak Prisma types to the Domain.
3. **Error Handling**: Catch database errors and throw Domain Errors.
4. **Data Sources**: bring in data sources from the Infrastructure layer.

## Testing
- **Integration Tests**: Test against a real (or seeded) database to ensure queries work.
