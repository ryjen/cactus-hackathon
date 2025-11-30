import { useState, useCallback } from 'react';
import { useAIModels } from './useAIModels';
import type { AIHookMultiShotResult, AIModelMultiShotRequest, AIModelResponse } from '../types';
import { massageResponse } from '../cactus';

export const useMultishotAI = (
): AIHookMultiShotResult => {
    const { completePrompt, download, isInitializing, isDownloading, isGenerating, downloadInfo } = useAIModels();
    const [result, setResult] = useState<AIModelResponse | null | undefined>();
    const [response, setResponse] = useState<string | null | undefined>();
    const [error, setError] = useState<string | null | undefined>();

    const multiShot = useCallback(async (
        {
            prompts,
            imageUrls
        }: AIModelMultiShotRequest
    ) => {
        let result: AIModelResponse | null = null;
        for (const prompt of prompts) {
            result = await completePrompt({ prompt, imageUrls }, result?.response);
            if (!result.response) {
                throw new Error('No response');
            }
        }
        return result;
    }, [completePrompt]);

    const analyze = useCallback(async (request: AIModelMultiShotRequest) => {

        try {
            const result = await multiShot(request);
            if (!result) {
                throw new Error('No result');
            }
            setResult(result);
            setResponse(massageResponse(result.response));
        } catch (error: any) {
            setError(error.message);
            console.error('CactusLM error:', error);
        }
    }, [multiShot]);

    return {
        analyze,
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
