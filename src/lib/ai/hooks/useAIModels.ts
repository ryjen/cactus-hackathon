import { useEffect, useCallback } from 'react';
import { Message, useCactusLM } from 'cactus-react-native';
import { VISION_CONFIG, CACTUS_CONFIG, CACTUS_MODE } from '../cactus';
import { AIModelOneShotRequest } from '../types';

export const useAIModels = () => {
    const visionLM = useCactusLM(VISION_CONFIG);
    const cactusLM = useCactusLM(CACTUS_CONFIG);

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


    const promptToMessages = useCallback(({ prompt, imageUrls }: AIModelOneShotRequest, completion?: string | null): Message[] => {
        let messages: Array<Message> = [];

        if (prompt.system) {
            messages.push({
                role: 'system',
                content: prompt.system.trim(),
            });
        }
        if (prompt.user) {
            messages.push({
                role: 'user',
                content: prompt.user.trim(),
                images: imageUrls,
            });
        } else if (completion) {
            messages.push({
                role: 'user',
                content: completion.trim(),
            });
        }
        if (prompt.assistant) {
            messages.push({
                role: 'assistant',
                content: prompt.assistant.trim(),
            });
        }
        return messages;
    }, [prompt]);

    const completePrompt = useCallback(async ({ prompt, imageUrls }: AIModelOneShotRequest, completion?: string | null) => {
        const messages = promptToMessages({ prompt, imageUrls }, completion);
        console.log(messages);
        switch (prompt.model) {
            case 'vision':
                return await visionLM.complete({
                    messages,
                    options: prompt.options,
                    mode: CACTUS_MODE
                })
            case 'general':
                return await cactusLM.complete({
                    messages,
                    options: prompt.options,
                    mode: CACTUS_MODE
                });
            default:
                throw new Error('Invalid model');
        }
    }, [cactusLM, visionLM]);

    return {
        visionLM,
        cactusLM,
        download,
        completePrompt,
        isInitializing: cactusLM?.isInitializing || visionLM?.isInitializing,
        isDownloading: cactusLM?.isDownloading || visionLM?.isDownloading,
        isGenerating: cactusLM?.isGenerating || visionLM?.isGenerating,
        downloadInfo: [
            { model: 'vision' as const, progress: visionLM?.isDownloading ? Math.ceil((visionLM?.downloadProgress || 0) * 100) : 100 },
            { model: 'reasoning' as const, progress: cactusLM?.isDownloading ? Math.ceil((cactusLM?.downloadProgress || 0) * 100) : 100 }
        ],
    };
};
