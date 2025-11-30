import type { PromptRepository as IPromptRepository, Prompt } from "@/lib/domain/types";
import { injectable, inject } from "tsyringe";
import { CluesPromptDataSource } from "@/lib/data/datasources";

@injectable()
export class PromptRepository implements IPromptRepository {

    constructor(@inject(CluesPromptDataSource) private readonly dataSource: CluesPromptDataSource) { }

    getCluesPrompt(hint?: string | null): Prompt {
        return this.dataSource.getPrompt(hint)
    }
    getCluesPrompts(hint?: string | null): Prompt[] {
        return this.dataSource.getPrompts(hint)
    }
}