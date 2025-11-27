export type UUID = string;
export type URL = string;
export type Timestamp = number;

export interface Entity {
    id: UUID;
}

export interface Player extends Entity {
    name: string;
    isGuest: boolean;
}

export interface Photo extends Entity {
    originalUrl: URL;
    width: number;
    height: number;
}

export interface ObfuscationConfig {
    method: 'blur' | 'pixelate';
    intensity: number;
}

export interface Clue extends Entity {
    text: string;
    difficulty: 'hard' | 'medium' | 'easy';
    cost: number;
}

export interface Guess extends Entity {
    playerId: UUID;
    text: string;
    isCorrect: boolean;
    similarityScore: number;
    timestamp: Timestamp;
}

export interface Game extends Entity {
    status: 'draft' | 'active' | 'completed';

    // Spy Data
    spyId: UUID;
    photo: Photo;
    obfuscatedPhotoUrl: URL;
    obfuscationConfig: ObfuscationConfig;
    targetRegion: { x: number; y: number; width: number; height: number };
    clues: Clue[];

    // Detective Data
    detectiveId?: UUID;
    guesses: Guess[];
    score: number;

    // Metadata
    createdAt: Timestamp;
    completedAt?: Timestamp;
}
