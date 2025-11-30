import { performOneShot } from '@/lib/ai/cactus';
import { useMultishotAI } from '@/lib/ai/hooks/useMultishotAI';
import { useOneshotAI } from '@/lib/ai/hooks/useOneshotAI';
import type { CluesHookResult } from '../types';
import { useDependency } from '@/lib/core/hooks';
import { PromptRepositoryToken } from '@/lib/domain/types';
import type { PromptRepository } from '@/lib/domain/types';
import { useCallback } from 'react';

export const useCluesAI = (oneShot = performOneShot): CluesHookResult => {
    return oneShot ? useCluesOneShotAI() : useCluesMultiShotAI();
}

export const useCluesOneShotAI = (): CluesHookResult => {
    const promptRepository = useDependency<PromptRepository>(PromptRepositoryToken);

    const oneShotAI = useOneshotAI();
    const cluesAnalyze = useCallback(async (imageUrl: string, hint?: string | null) => await oneShotAI.analyze({
        prompt: promptRepository.getCluesPrompt(hint),
        imageUrls: [imageUrl],
    }), [oneShotAI, promptRepository]);
    return {
        ...oneShotAI,
        analyze: cluesAnalyze
    };
};

export const useCluesMultiShotAI = (): CluesHookResult => {
    const promptRepository = useDependency<PromptRepository>(PromptRepositoryToken);

    const { analyze, ...multiShotAI } = useMultishotAI();
    const cluesAnalyze = useCallback(async (imageUrl: string, hint?: string | null) => await analyze({
        prompts: promptRepository.getCluesPrompts(hint),
        imageUrls: [imageUrl],
    }), [analyze, promptRepository]);
    return {
        ...multiShotAI,
        analyze: cluesAnalyze
    };
};
