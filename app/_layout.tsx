import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTimerStore } from '../src/stores/useTimerStore';
import { useTheme } from '../src/constants/theme';

export default function RootLayout() {
    const theme = useTheme();
    const syncTimer = useTimerStore((state) => state.syncTimer);

    useEffect(() => {
        syncTimer();
    }, []);

    return (
        <SafeAreaProvider>
            <StatusBar style={theme.colors.backgrounds.main === '#FFFFFF' || theme.colors.backgrounds.main === '#F8FAFC' ? 'dark' : 'light'} />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: theme.colors.backgrounds.main },
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
