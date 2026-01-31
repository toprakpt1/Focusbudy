import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserStore } from '../src/stores/useUserStore';
import { useTimerStore } from '../src/stores/useTimerStore';
import { THEME } from '../src/constants/theme';

export default function RootLayout() {
    const syncTimer = useTimerStore((state) => state.syncTimer);

    useEffect(() => {
        // Sync timer state on app start to account for time lapsed
        syncTimer();
    }, []);

    return (
        <SafeAreaProvider>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: THEME.colors.backgrounds.main },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                    name="focus"
                    options={{
                        presentation: 'fullScreenModal',
                        animation: 'fade',
                    }}
                />
                <Stack.Screen
                    name="completion"
                    options={{
                        presentation: 'modal',
                        animation: 'slide_from_bottom',
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}
