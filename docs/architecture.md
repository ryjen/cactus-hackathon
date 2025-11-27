# Eyespie Architecture Documentation

## Overview

Eyespie follows **Clean Architecture** principles with clear separation of concerns across layers.

```
┌─────────────────────────────────────────┐
│      Presentation Layer (UI)            │
│  Components, Interactors, Stores        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Domain Layer (Business)         │
│  Use Cases, Models, Services            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│          Data Layer (Access)            │
│  Repositories, Data Sources             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Infrastructure (External)          │
│  Database, Network, File System         │
└─────────────────────────────────────────┘
```

---

## Layer Responsibilities

### 1. Presentation Layer (`/src/lib/components`, `/src/features/{feature}/views`)

**Purpose**: User interface and user interaction

**Components**:
- React components (GuessScreen, CaptureScreen, LoginScreen, etc.)
- UI state management (Zustand stores)
- Interactors (MVI pattern for reactive state)

**Rules**:
- No direct database access
- No business logic
- Depends on domain layer via use cases
- Handles user input and displays output

### 2. Domain Layer (`/src/lib/domain`, `/src/lib/core`)**: Business logic and rules

**Purpose**: Business logic and rules

**Components**:
- **Use Cases**: Single-purpose business operations
- **Models**: Domain entities (Profile, Node, Puzzle, etc.)
- **Services**: Complex business logic (AI bots, auth)
- **Types**: Shared domain types and interfaces (in `/src/lib/core/types` or `/src/lib/domain/types`)
- **Interfaces**: Contracts for repositories and data sources, separate boundaries

**Rules**:
- Framework-independent
- No UI dependencies
- No database dependencies (uses interfaces)
- Pure business logic

### 3. Data Layer (`/src/lib/data`)

**Purpose**: Data access and persistence

**Components**:
- **Repositories**: Implement domain interfaces
- **Data Sources**: Prisma, cache, remote APIs
- **Mappers**: Convert between database and domain models

**Rules**:
- Implements domain interfaces
- Handles data persistence
- Manages caching
- No business logic

### 4. Infrastructure Layer (`/src/infrastructure`)

**Purpose**: External systems and frameworks

**Components**:
- AI systems
- Database (Prisma + PostgreSQL)
- WebSocket server (Socket.IO)
- File system
- External APIs

### 5. App Layer (`/src/app`, `/src/lib/core`)

**Purpose**: Navigation, application context, depedency injection 

**Components**:
- Dependency Injection 
- React Navigation 
- Screen Context 
- Main entry point
- Status bars 
- Layouts
- Themes

---

## Design Patterns

### Dependency Injection

**Container**: `/lib/di/container.ts`

```typescript
// Register services
container.register('ProfileRepository', new ProfileRepository(prisma));

// Resolve dependencies
const repo = container.resolve('ProfileRepository');
```

**Benefits**:
- Loose coupling
- Easy testing (mock dependencies)
- Single source of truth for service instances

### Repository Pattern

**Interface**: `/lib/core/interfaces/IRepository.ts`

```typescript
interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
```

**Benefits**:
- Abstract data access
- Swappable data sources
- Consistent API

### Use Case Pattern

**Interface**: `/lib/core/interfaces/IUseCase.ts`

```typescript
interface IUseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}
```

**Example**: `GenerateCluesUseCase`

```typescript
class GenerateCluesUseCase implements IUseCase<GenerateCluesInput, Clues> {
  async execute(input: GenerateCluesInput): Promise<Clues> {
    // Business logic here
  }
}
```

**Benefits**:
- Single responsibility
- Testable in isolation
- Clear input/output contracts

### MVI (Model-View-Intent)

**Base Class**: `/lib/core/interactor/Interactor.ts`

```typescript
class GameInteractor extends Interactor<GameState, GameAction> {
  protected reduce(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'CONNECT':
        return { ...state, connected: true };
      // ...
    }
  }
  protected async induce(state: GameState, action: GameAction): Promise<void> {
    switch (action.type) {
      // ...
    }
  }
}
```

**Benefits**:
- Reactive state management
- No callbacks in views
- Predictable state updates
- Easy to test

---

## Data Flow

### Example: Capture Photo

```
User clicks "New Game" button
         ↓
App creates new game via use case
         ↓
App opens camera
         ↓
User click capture button
         ↓
Use case loads data via repositories
         ↓
Use case calculates clues
         ↓
Use case obfuscates photo
         ↓
User clicks 'share' via button
         ↓
Photo and clues and deep link to guess sent
         ↓
UI updates (list of games)
```

---

## Directory Structure

```
eyespie 
├── src/        
│   ├── app/                     # Application components
│   │   ├── di/                  # Dependency injection
│   ├── lib/
│   │   ├── core/                # Core abstractions
│   │   │   ├── types/           # Shared types and interfaces
│   │   │   ├── interactors/     # Base interactors
│   │   ├── data/                # Data layer
│   │   │   ├── datasources/     # Prisma, cache
│   │   │   └── repositories/    # Repository implementations
│   │   ├── domain/              # Business logic
│   │   │   ├── usecases/        # Use case implementations
│   │   │   ├── services/        # Domain services
│   │   │   ├── types/           # Domain-specific types
│   │   ├── services/            # Domain services
│   │   │   ├── ai/              # AI bot service
│   │   │   └── auth/            # Authentication service
│   │   ├── components/          # Components
│   │   ├── features/            # feature modules
│   │   │   ├── login/           # login
│   │   │   ├── etc/             # others
│   │   ├── Infrastructure/      # Infrastructure
│   │   │   ├── cactus/          # Local AI
│   │   │   └── supabase/        # Backend
└── docs/                        # Documentation
```

---

## Testing Strategy

### Unit Tests
- **Use Cases**: Test business logic in isolation
- **Repositories**: Test CRUD operations
- **Services**: Test complex logic

### Integration Tests (Planned)
- End-to-end flows

### E2E Tests (Planned)
- Full user journeys with Playwright

---

## Scalability Considerations

### Current (MVP)
- In-memory sessions
- Single server instance
- No caching layer

### Future Enhancements
- **Sessions**: Redis for distributed sessions
- **Database**: Read replicas, connection pooling
- **Caching**: Redis for frequently accessed data
- **Load Balancing**: Multiple server instances
- **Message Queue**: RabbitMQ for async processing

---

## Security

### Authentication
- Session-based (24-hour expiration)
- Password hashing (SHA-256 for MVP, bcrypt for production)
- Session validation on each request

### Authorization
- Profile-based access control
- Admin-only use cases (puzzle generation)

### Future
- JWT tokens
- OAuth integration
- Rate limiting
- CSRF protection

---

## Performance

### Optimizations
- Lazy loading of components
- Memoization in React components
- Caching

### Monitoring (Planned)
- Response time tracking
- Error logging
- User analytics

---

## Technology Stack

- **Framework**: Expo, React Native
- **Language**: TypeScript
- **UI**: React, CSS
- **Testing**: Jest, React Testing Library
- **State**: Custom Observable + Zustand
- **Auth**: Session-based (in-memory)
