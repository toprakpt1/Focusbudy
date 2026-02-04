import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTimerStore } from '../src/stores/useTimerStore';
import { useTheme } from '../src/constants/theme';
import '../src/translate/i18n';

export default function RootLayout() {
    const theme = useTheme();
    const syncTimer = useTimerStore((state) => state.syncTimer);

    useEffect(() => {
        syncTimer();
    }, []);

    useEffect(() => {
        if (Platform.OS !== 'android') return;

        (async () => {
            try {
                const NavigationBar = await import('expo-navigation-bar');
                await NavigationBar.setPositionAsync('absolute');
                await NavigationBar.setBackgroundColorAsync('transparent');
                await NavigationBar.setButtonStyleAsync('dark');
                await NavigationBar.setBehaviorAsync('overlay-swipe');
                await NavigationBar.setVisibilityAsync('hidden');
            } catch {
                // ignore
            }
        })();
    }, []);

    return (
        <SafeAreaProvider>
            <StatusBar style={theme.colors.backgrounds.main === '#0D1F2D' ? 'light' : 'dark'} />
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
