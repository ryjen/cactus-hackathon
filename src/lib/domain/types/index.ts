import { ObfuscationConfig } from "@/lib/core/types";
import { DependencyContainer } from "tsyringe";

export * from "./ai";
export * from "./repositories";

/**
 * Use case interface for business logic
 */
export interface IUseCase<TInput, TOutput> {
    execute(input: TInput): Promise<TOutput>;
}

export interface FeatureMetadata {
    name: string;
    entryComponent: React.ComponentType<any>;
    screens: Record<string, React.ComponentType<any>>;
    hooks?: Record<string, any>;
    init?: (container: DependencyContainer) => void;
}

export interface IObfuscationService {
    obfuscate(photoUrl: string, config: ObfuscationConfig): Promise<string>;
}

