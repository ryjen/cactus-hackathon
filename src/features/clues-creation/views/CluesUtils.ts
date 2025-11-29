import * as ImageManipulator from 'expo-image-manipulator';
import { Message } from 'cactus-react-native';
import { Prompt, END_TOKEN } from './CluesConfig';

export async function preprocessImage(uri: string) {
    // Resize to 299x299 while keeping aspect ratio
    const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 244, height: 244 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );

    return result.uri; // ready for inference
}

export const massageResponse = (response: string | null): string | null => {
    if (!response) return null;
    const end = response.lastIndexOf(END_TOKEN)
    const description = response.substring(0, end)
    return description
}

export const promptToMessages = (prompt: Prompt, image: string, completion: string | null, answer: string | null): Message[] => {
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
            images: [image],
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
    } else if (answer) {
        messages.push({
            role: 'assistant',
            content: `answer: ${answer.trim()}`,
        });
    }
    return messages;
}
