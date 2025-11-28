import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useEffect } from 'react';
import * as Updates from 'expo-updates';

export default function RootLayout() {
    useEffect(() => {
        async function onFetchUpdateAsync() {
            if (__DEV__) return;
            try {
                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                }
            } catch (error) {
                console.log(`Error fetching latest Expo update: ${error}`);
            }
        }

        void onFetchUpdateAsync();
    }, []);

    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="features/[...slug]" />
            </Stack>
        </SafeAreaProvider>
    );
}
