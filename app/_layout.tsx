import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTimerStore } from '../src/stores/useTimerStore';
import { useUserStore } from '../src/stores/useUserStore';
import { useTheme } from '../src/constants/theme';
import { useThemeStore } from '../src/stores/useThemeStore';
import { NotificationCoordinator } from '../src/components/NotificationCoordinator';
import '../src/translate/i18n';

export default function RootLayout() {
    const theme = useTheme();
    const themeId = useThemeStore((state) => state.themeId);
    const syncTimer = useTimerStore((state) => state.syncTimer);
    const syncDailyProgress = useUserStore((state) => state.syncDailyProgress);

    useEffect(() => {
        syncTimer();
        syncDailyProgress();
    }, []);

    useEffect(() => {
        if (Platform.OS !== 'android') return;

        (async () => {
            try {
                const NavigationBar = await import('expo-navigation-bar');
                await NavigationBar.setButtonStyleAsync('dark');
                await NavigationBar.setBackgroundColorAsync(theme.colors.backgrounds.main);
                await NavigationBar.setVisibilityAsync('visible');
            } catch {
                // ignore
            }
        })();
    }, [theme.colors.backgrounds.main]);

    return (
        <SafeAreaProvider>
            <NotificationCoordinator />
            <StatusBar style={themeId === 'dark' ? 'light' : 'dark'} />
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
