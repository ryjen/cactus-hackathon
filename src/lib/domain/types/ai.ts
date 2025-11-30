
export interface Prompt {
    model: string;
    options: any;
    system: string;
    user: string | null;
    assistant: string | null;
}
