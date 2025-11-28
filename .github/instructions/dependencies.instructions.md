
# Dependencies Instructions

Use Tsyringe for dependency injection.  

## Context
These instructions apply to **Dependencies** which are used to inject dependencies into other classes.

## Design

Wrap all third-party frameworks with a well defined interface for the application.   The interface should accomadate similarities and differences between frameworks.

## Implementation

Use Tsyringe as the default for dependency injection.   

## Rules
1. **Constructor Injection**: Inject dependencies via constructor.
2. **Strict Types**: Define explicit types for dependencies.
3. **Lazy Loading**: Use lazy loading for optional dependencies.
4. **Factory Pattern**: Prefer factory pattern for garbage collection.
5. **Singleton**: Use singleton scope for dependencies only when necessary

