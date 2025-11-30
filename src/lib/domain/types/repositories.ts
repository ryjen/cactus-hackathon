import { Prompt } from "./ai";

export interface PhotoRepository {

    resizeLocalImage(uri: string, width: number, height: number): Promise<string>;
}

export interface OneShotPromptRepository {
    getCluesPrompt(hint?: string | null): Prompt;
}

export interface MultiShotPromptRepository {
    getCluesPrompts(hint?: string | null): Prompt[];
}


export interface PromptRepository extends OneShotPromptRepository, MultiShotPromptRepository {

}

export declare const PromptRepositoryToken: unique symbol;
