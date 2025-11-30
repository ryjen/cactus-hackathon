import { Prompt } from "@/lib/domain/types";
import type { CactusLMCompleteResult } from "cactus-react-native";

export interface AIHookResult {
    download: (onAiProgress?: (vision: number, reasoning: number) => void) => void;
    result?: AIModelResponse | null;
    response?: string | null;
    isInitializing: boolean;
    isDownloading: boolean;
    downloadInfo: Array<{ model: 'vision' | 'reasoning'; progress: number }>;
    isGenerating: boolean;
    error?: string | null;
}

export interface AIHookOneShotResult extends AIHookResult {
    analyze: (request: AIModelOneShotRequest) => Promise<void>;
}

export interface AIHookMultiShotResult extends AIHookResult {
    analyze: (request: AIModelMultiShotRequest) => Promise<void>;
}

export interface AIModelOneShotRequest {
    prompt: Prompt;
    imageUrls?: string[];
}

export interface AIModelMultiShotRequest {
    prompts: Prompt[];
    imageUrls?: string[];
}


export type AIModelResponse = CactusLMCompleteResult
