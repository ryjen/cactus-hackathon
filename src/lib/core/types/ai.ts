import type { CactusLMCompleteResult } from "cactus-react-native";

export interface CluesAIHookResult {
    analyze: () => Promise<void>;
    download: (onAiProgress?: (vision: number, reasoning: number) => void) => void;
    result: CactusLMCompleteResult | null | undefined;
    response: string | null | undefined;
    isInitializing: boolean;
    isDownloading: boolean;
    downloadInfo: Array<{ model: 'vision' | 'reasoning'; progress: number }>;
    isGenerating: boolean;
    error: string | null | undefined;
}