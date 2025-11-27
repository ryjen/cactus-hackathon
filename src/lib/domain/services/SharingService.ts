import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';

export class SharingService {
    /**
     * Generate a deep link for a game
     */
    static generateGameLink(gameId: string): string {
        return Linking.createURL(`game/${gameId}`);
    }

    /**
     * Share a game via the system share sheet
     */
    static async shareGame(gameId: string): Promise<void> {
        const link = this.generateGameLink(gameId);
        const isAvailable = await Sharing.isAvailableAsync();

        if (isAvailable) {
            await Sharing.shareAsync(link, {
                dialogTitle: 'Share Eyespie Game',
            });
        } else {
            // Fallback: copy to clipboard or show link
            console.warn('Sharing not available on this platform');
        }
    }
}
