import { injectable } from 'tsyringe';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import { Game } from '@/lib/core/types';

export interface ISharingService {
    shareGame(game: Game): Promise<void>;
}

@injectable()
export class SharingService implements ISharingService {
    async shareGame(game: Game): Promise<void> {
        // Generate deep link
        // Scheme: eyespie://game/{gameId}
        const url = Linking.createURL(`game/${game.id}`, {
            queryParams: {
                // We might want to encode some basic data here if we don't have a backend yet
                // For now, just the ID
            },
        });

        const message = `I spy with my little eye... Can you guess what it is? Play here: ${url}`;

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(url, {
                dialogTitle: 'Share your game',
                mimeType: 'text/plain',
                UTI: 'public.plain-text', 
            });
        } else {
            console.log('Sharing is not available on this platform');
            // Fallback (e.g., copy to clipboard)
        }
    }
}
