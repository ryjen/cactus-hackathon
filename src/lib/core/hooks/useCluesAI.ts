import { useState, useEffect, useCallback } from 'react';
import { useCactusLM, CactusLMCompleteResult } from 'cactus-react-native';
import { VISION_CONFIG, CACTUS_CONFIG, CHAINED_PROMPTS, ONESHOT_PROMPT, performOneShot, Prompt, CACTUS_MODE, massageResponse, promptToMessages } from '../ai';
import type { CluesAIHookResult } from '../types';

export const useCluesAI = (
    photoUrl: string | null | undefined = undefined,
    answer: string | null | undefined = undefined,
): CluesAIHookResult => {
    const visionLM = useCactusLM(VISION_CONFIG);
    const cactusLM = useCactusLM(CACTUS_CONFIG);
    const [result, setResult] = useState<CactusLMCompleteResult | null | undefined>();
    const [response, setResponse] = useState<string | null | undefined>();
    const [error, setError] = useState<string | null | undefined>();

    useEffect(() => {
        if (!cactusLM.isDownloaded && !cactusLM.isDownloading) {
            cactusLM.download();
        }
    }, [cactusLM]);

    useEffect(() => {
        if (!visionLM.isDownloaded && !visionLM.isDownloading) {
            visionLM.download();
        }
    }, [visionLM]);

    useEffect(() => {
        if (cactusLM?.isDownloaded && !cactusLM?.isInitializing) {
            cactusLM?.init();
        }
    }, [cactusLM]);

    useEffect(() => {
        if (visionLM?.isDownloaded && !visionLM?.isInitializing) {
            visionLM?.init();
        }
    }, [visionLM]);

    const download = useCallback((onAiProgress?: (vision: number, reasoning: number) => void) => {
        if (!cactusLM.isDownloaded && !cactusLM.isDownloading) {
            void cactusLM.download({
                onProgress: (progress) => {
                    onAiProgress?.(visionLM.downloadProgress, progress);
                }
            }).catch(console.warn);
        }
        if (!visionLM.isDownloaded && !visionLM.isDownloading) {
            void visionLM.download({
                onProgress: (progress) => {
                    onAiProgress?.(progress, cactusLM.downloadProgress);
                }
            }).catch(console.warn);
        }
    }, [cactusLM, visionLM]);

    const completePrompt = useCallback(async (prompt: Prompt, completion: string | null): Promise<CactusLMCompleteResult> => {
        const messages = promptToMessages(prompt, photoUrl!, massageResponse(completion), answer);
        console.log(messages);
        switch (prompt.model) {
            case 'vision':
                return await visionLM.complete({
                    messages,
                    options: prompt.options,
                    mode: CACTUS_MODE
                });
            case 'general':
                return await cactusLM.complete({
                    messages,
                    options: prompt.options,
                    mode: CACTUS_MODE
                });
            default:
                throw new Error('Invalid model');
        }
    }, [photoUrl, cactusLM, visionLM, answer]);

    const multiShot = useCallback(async () => {
        let result: CactusLMCompleteResult | null = null;
        const prompts = CHAINED_PROMPTS(answer)
        for (const promptName in prompts) {
            const prompt = prompts[promptName]
            result = await completePrompt(prompt, result?.response ?? null);
            console.log(result);
            if (!result.response) {
                throw new Error('No response');
            }
        }
        return result;
    }, [completePrompt, answer]);

    const oneShot = useCallback(async () => {
        const prompt = ONESHOT_PROMPT(answer)
        const result = await completePrompt(prompt, null);
        console.log(result);
        return result;
    }, [completePrompt, answer]);

    const handleAnalyze = useCallback(async () => {
        if (!photoUrl) return;

        try {
            const result = performOneShot ? await oneShot() : await multiShot();
            if (!result) {
                throw new Error('No result');
            }
            setResult(result);
            setResponse(massageResponse(result.response));
        } catch (error: any) {
            setError(error.message);
            console.error('CactusLM error:', error);
        } finally {
            // cactusLM?.reset();
            // visionLM?.reset();
        }
    }, [photoUrl, cactusLM, visionLM, answer, multiShot, oneShot]);

    return {
        analyze: handleAnalyze,
        result,
        response,
        isInitializing: cactusLM?.isInitializing || visionLM?.isInitializing,
        download,
        isDownloading: cactusLM?.isDownloading || visionLM?.isDownloading,
        downloadInfo: [
            { model: 'vision', progress: visionLM?.isDownloading ? Math.ceil((visionLM?.downloadProgress || 0) * 100) : 100 },
            { model: 'reasoning', progress: cactusLM?.isDownloading ? Math.ceil((cactusLM?.downloadProgress || 0) * 100) : 100 }
        ],
        isGenerating: cactusLM?.isGenerating || visionLM?.isGenerating,
        error
    };
};
