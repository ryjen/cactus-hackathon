# Eyespie Data Design

## 1. Data Models

These TypeScript interfaces define the shape of the data used throughout the application.

```typescript
// Core Types

type UUID = string;
type URL = string;
type Timestamp = number; // Unix epoch

// Entities

interface Entity {
  id: UUID;
}

interface Player extends Entity {
  name: string; // e.g., "Guest 123" or "Ryjen"
  isGuest: boolean;
}

interface Photo extends Entity {
  originalUrl: URL; // Local file URI or Remote URL
  width: number;
  height: number;
}

interface ObfuscationConfig {
  method: 'blur' | 'pixelate';
  intensity: number; // 0.0 to 1.0
}

interface Clue extends Entity {
  text: string;
  difficulty: 'hard' | 'medium' | 'easy';
  cost: number; // Points deducted for using this clue
}

interface Game extends Entity {
  status: 'draft' | 'active' | 'completed';
  
  // Spy Data
  spyId: UUID;
  photo: Photo;
  obfuscatedPhotoUrl: URL;
  obfuscationConfig: ObfuscationConfig;
  targetRegion: { x: number; y: number; width: number; height: number }; // Normalized 0-1
  clues: Clue[];
  
  // Detective Data
  detectiveId?: UUID; // Nullable until joined
  guesses: Guess[];
  score: number; // Calculated based on clues used and guesses
  
  // Metadata
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

interface Guess extends Entity {
  playerId: UUID;
  text: string;
  isCorrect: boolean;
  similarityScore: number; // 0.0 to 1.0
  timestamp: Timestamp;
}
```

## 2. Data Flow

### Flow 1: Game Creation (The Spy)

```mermaid
sequenceDiagram
    participant Spy as User (Spy)
    participant UI as App UI
    participant Game as GameInteractor
    participant Store as GameStore
    participant FS as FileSystem

    Spy->>UI: Tap "New Game"
    UI->>Game: createGame()
    Game->>Store: setStatus('draft')
    
    Spy->>UI: Capture Photo
    UI->>Game: setPhoto(uri)
    Game->>FS: Save original image
    
    Spy->>UI: Adjust Obfuscation
    UI->>Game: updateObfuscation(config)
    Game->>UI: Render Preview (Real-time)
    
    Spy->>UI: Set Target & Clues
    UI->>Game: setTarget(rect), addClue(text, difficulty)
    
    Spy->>UI: Tap "Share"
    UI->>Game: finalizeGame()
    Game->>FS: Save obfuscated image
    Game->>Store: setStatus('active')
    Game-->>UI: Return Deep Link (eyespie://game/{id})
    UI->>Spy: Open System Share Sheet
```

### Flow 2: Gameplay (The Detective)

```mermaid
sequenceDiagram
    participant Detective as User (Detective)
    participant System as OS
    participant UI as App UI
    participant Game as GameInteractor
    participant Store as GameStore

    Detective->>System: Tap Deep Link
    System->>UI: Open App (eyespie://game/{id})
    UI->>Game: loadGame(id)
    Game->>Store: hydrate(gameData)
    Store-->>UI: Update View (Obfuscated Photo + Clues)
    
    Detective->>UI: Request Clue (Optional)
    UI->>Game: revealClue(id)
    Game->>Store: deductScore(cost)
    Store-->>UI: Show Clue
    
    Detective->>UI: Type Guess "Coffee"
    UI->>Game: submitGuess("Coffee")
    Game->>Game: validateGuess("Coffee")
    
    alt Incorrect
        Game->>Store: addGuess(incorrect)
        Store-->>UI: Show "Try Again"
    else Correct
        Game->>Store: addGuess(correct)
        Game->>Store: setStatus('completed')
        Store-->>UI: Reveal Original Photo
    end
```
