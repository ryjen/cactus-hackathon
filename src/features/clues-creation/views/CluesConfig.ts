import { CactusConfig } from 'cactus-react-native';

CactusConfig.telemetryToken = '92ce1e2d-72d5-4835-9232-37583dad2117';
// CactusConfig.cactusToken = 'AIzaSyBUMolfYcgWgagq6cm2-jAPgPoYy8H_4uw';
// CactusConfig.cactusToken = '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';
CactusConfig.cactusToken = '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';

export const CACTUS_MODE = 'hybrid';

export const VISION_CONFIG = {
    model: 'lfm2-vl-450m',
    //contextSize: 2048,
};

export const CACTUS_CONFIG = {
    model: 'lfm2-1.2b',
    //contextSize: 2048,
};

export interface Prompt {
    model: string;
    options: any;
    system: string;
    user: string | null;
    assistant: string | null;
}

export const ONESHOT_PROMPT = (answer: string | null): Prompt => ({
    model: 'vision',
    options: {
        temperature: 0.3,
        topP: 0.9,
        topK: 40,
        maxTokens: 256,
    },
    system: `
    You are an AI clue generator for the game "I Spy".
    Identify ${answer ? 'the ' + answer : 'one salient object'} in the image and describe it briefly in natural language.
    List a few of its attributes such as color, shape, and function.
    Given the attributes, produce 3 clues ranked by difficulty.
      - Hard clues use abstract or indirect attributes.
      - Medium clues use descriptive attributes.
      - Easy clues use common or obvious attributes.
    Clues should not name any object directly.
    For each clue output the following format: difficulty::clue
    Difficulty must be exactly one of: hard, medium, easy.

Format reminder:
easy::clue text
medium::clue text
hard::clue text
    `,
    user: `Here is the photo. Generate "I Spy" clues.`,
    assistant: `
    easy::something that is round
    medium::something that is red
    hard::something you can eat
    `
})

export const CHAINED_PROMPTS = (answer: string | null): Record<string, Prompt> => ({
    step1: {
        model: 'vision',
        options: {
            temperature: 0.3,
            topP: 0.9,
            topK: 40,
            maxTokens: 256,
        },
        system: `
    You are an AI that observes photos.
    Identify one salient object in the image and describe it briefly in natural language.
    List a few of its attributes such as color, shape, and function.
    Do not output JSON or structured data.
    `,
        user: `Here is the photo. Please describe ${answer ? 'the ' + answer : 'one object'} you see and its attributes.`,
        assistant: null
    },
    step2: {
        model: 'general',
        options: {
            temperature: 0.7,
            topP: 0.95,
            topK: 50,
            maxTokens: 1024,
        },
        system: `
You are an AI clue generator for the game "I Spy".
Given a description of an object, produce 1-3 clues ranked by difficulty.
- Hard clues use abstract or indirect attributes.
- Medium clues use descriptive attributes.
- Easy clues use common or obvious attributes.
Output each clue in XML as <clue difficulty="easy|medium|hard">clue text</clue>
Clues should not name the answer directly.
XML should have a root element <clues>.
Difficulty must be exactly one of: hard, medium, easy.
Do not output any additional text other than the XML.
Do not use any XML tags other than <clue> and <clues>.
      `,
        user: null,
        assistant: `
    <clues>
<clue difficulty="easy">something that is round</clue>
<clue difficulty="medium">something that is red</clue>
<clue difficulty="hard">something you can eat</clue>
</clues>
    `
    }
})

export const END_TOKEN = '<|im_end|>';
export const performOneShot = false;
