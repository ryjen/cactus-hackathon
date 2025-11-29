import { Prompt } from "./CluesConfig"

export const ONESHOT_PROMPT = (answer: string | null | undefined): Prompt => ({
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

export const CHAINED_PROMPTS = (answer: string | null | undefined): Record<string, Prompt> => ({
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
            stopStrings: ['\n\n', '<|im_end|>']
        },
        system: `
You are an AI clue generator for the game "I Spy".
Given a description of an object, produce 1-3 clues ranked by difficulty.
- Hard clues use abstract or indirect attributes.
- Medium clues use descriptive attributes.
- Easy clues use common or obvious attributes.
Output each clue one per line, do not add any additional text.
Clues should not name the answer directly.
      `,
        user: null,
        assistant: `
something that is round
something that is red
something you can eat
    `
    }
})