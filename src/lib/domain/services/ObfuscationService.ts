import { ObfuscationConfig } from '@/lib/core/types';
import { injectable } from 'tsyringe';
import { IObfuscationService } from '../types';
import * as ImageManipulator from 'expo-image-manipulator';
import { Image } from 'react-native';

@injectable()
export class ObfuscationService implements IObfuscationService {
    async obfuscate(photoUrl: string, config: ObfuscationConfig): Promise<string> {

        // Simple blur implementation: Downscale and upscale
        // We ignore the region for now as Expo ImageManipulator doesn't support easy composition without native modules

        const intensity = config.intensity || 50;
        // Scale down factor: 100 intensity -> 0.02 scale, 0 intensity -> 1.0 scale
        const reductionFactor = 1 - (intensity / 100) * 0.98;

        const { width } = await Image.getSize(photoUrl);
        const smallWidth = Math.max(16, Math.floor(width * reductionFactor));

        try {
            const result = await ImageManipulator.manipulateAsync(
                photoUrl,
                [
                    { resize: { width: smallWidth } },
                    { resize: { width: width } }
                ],
                { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
            );
            return result.uri;
        } catch (error) {
            console.error('Failed to obfuscate image', error);
            return photoUrl;
        }
    }
}
