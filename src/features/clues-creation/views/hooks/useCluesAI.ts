import { useState, useEffect, useCallback } from 'react';
import { useCactusLM, CactusLMCompleteResult } from 'cactus-react-native';
import { VISION_CONFIG, CACTUS_CONFIG, CHAINED_PROMPTS, ONESHOT_PROMPT, performOneShot, Prompt, CACTUS_MODE } from '../CluesConfig';
import { promptToMessages, massageResponse, preprocessImage } from '../CluesUtils';

export const useCluesAI = (
    photoUrl: string | null,
    answer: string | null,
    dispatch: (action: any) => void
) => {
    const visionLM = useCactusLM(VISION_CONFIG);
    const cactusLM = useCactusLM(CACTUS_CONFIG);
    const [result, setResult] = useState<CactusLMCompleteResult | null>(null);

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

    const completePrompt = useCallback(async (prompt: Prompt, completion: string | null): Promise<CactusLMCompleteResult> => {
        const messages = promptToMessages(prompt, photoUrl!, massageResponse(completion), answer);
        console.log(messages);
        switch (prompt.model) {
            case 'vision':
                return await visionLM.complete({
                    messages,
                    options: prompt.options,
                    mode: CACTUS_MODE
                }).then((res) => {
                    dispatch({ type: 'UPDATE', payload: `💡 Dectected object...` });
                    return res;
                });
            case 'general':
                return await cactusLM.complete({
                    messages,
                    options: prompt.options,
                    mode: CACTUS_MODE
                }).then((res) => {
                    dispatch({ type: 'UPDATE', payload: `✅ Finished!` });
                    return res;
                });
            default:
                throw new Error('Invalid model');
        }
    }, [photoUrl, cactusLM, visionLM, answer, dispatch]);

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

        dispatch({ type: 'GENERATE' });

        try {

            const result = performOneShot ? await oneShot() : await multiShot();
            dispatch({
                type: 'RESULT', payload: {
                    answer,
                    result: massageResponse(result?.response ?? null)
                }
            });
            setResult(result);
        } catch (error: any) {
            dispatch({ type: 'ERROR', payload: error.message });
            console.error('CactusLM error:', error);
        } finally {
            // cactusLM?.reset();
            // visionLM?.reset();
        }
    }, [photoUrl, cactusLM, visionLM, answer, multiShot, oneShot, dispatch]);

    return {
        handleAnalyze,
        result,
        isDownloading: cactusLM?.isDownloading || visionLM?.isDownloading,
        downloadInfo: [
            { model: 'vision', progress: visionLM?.isDownloading ? Math.ceil((visionLM?.downloadProgress || 0) * 100) : 100 },
            { model: 'reasoning', progress: cactusLM?.isDownloading ? Math.ceil((cactusLM?.downloadProgress || 0) * 100) : 100 }
        ],
        isGenerating: cactusLM?.isGenerating || visionLM?.isGenerating,
        cactusLM,
        visionLM
    };
};
