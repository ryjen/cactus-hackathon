import { useState, useCallback } from 'react';
import { CactusLMCompleteResult } from 'cactus-react-native';
import { useAIModels } from './useAIModels';
import type { AIHookOneShotResult, AIModelOneShotRequest } from '../types';
import { massageResponse } from '../cactus';

export const useOneshotAI = (): AIHookOneShotResult => {
    const { completePrompt, download, isInitializing, isDownloading, isGenerating, downloadInfo } = useAIModels();
    const [result, setResult] = useState<CactusLMCompleteResult | null | undefined>();
    const [response, setResponse] = useState<string | null | undefined>();
    const [error, setError] = useState<string | null | undefined>();

    const oneShot = useCallback(async (request: AIModelOneShotRequest) => {
        const result = await completePrompt(request, null);
        console.log(result);
        return result;
    }, [completePrompt]);

    const handleAnalyze = useCallback(async (request: AIModelOneShotRequest) => {

        try {
            const result = await oneShot(request);
            if (!result) {
                throw new Error('No result');
            }
            setResult(result);
            setResponse(massageResponse(result.response));
        } catch (error: any) {
            setError(error.message);
            console.error('CactusLM error:', error);
        }
    }, [oneShot]);

    return {
        analyze: handleAnalyze,
        result,
        response,
        isInitializing,
        download,
        isDownloading,
        downloadInfo,
        isGenerating,
        error
    };
};
