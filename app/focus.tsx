import React, { useMemo } from 'react';
import { View, StyleSheet, Alert, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Text } from '../src/components/ui/Text';
import { Button } from '../src/components/ui/Button';
import { ProgressBar } from '../src/components/ui/ProgressBar';
import { CharacterDisplay } from '../src/components/character/CharacterDisplay';
import { usePomodoro } from '../src/hooks/usePomodoro';
import { useUserStore } from '../src/stores/useUserStore';
import { useTheme, THEME } from '../src/constants/theme';

const { height } = Dimensions.get('window');
const IS_SMALL_DEVICE = height < 700;

export default function FocusScreen() {
    const theme = useTheme();
    const router = useRouter();
    const {
        status,
        phase,
        timeLeft,
        formatTime,
        getProgress,
        pause,
        resume,
        complete
    } = usePomodoro();
    const { activeCompanion } = useUserStore();

    const handleExit = () => {
        Alert.alert(
            'Exit Focus Mode?',
            'Your progress will be lost if you exit now.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Exit',
                    style: 'destructive',
                    onPress: () => {
                        pause();
                        router.back();
                    },
                },
            ]
        );
    };

    const handleToggle = () => {
        if (status === 'running') {
            pause();
        } else {
            resume();
        }
    };

    React.useEffect(() => {
        if (status === 'completed') {
            router.replace('/completion');
        }
    }, [status]);

    const styles = useMemo(() => StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.colors.backgrounds.focus },
        header: {
            flexDirection: 'row' as const,
            justifyContent: 'flex-end' as const,
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.sm,
            height: 50,
            alignItems: 'center' as const,
        },
        exitButton: {
            padding: theme.spacing.xs,
            backgroundColor: theme.colors.backgrounds.cardSolid,
            borderRadius: 9999,
        },
        progressContainer: {
            paddingHorizontal: theme.spacing.xl,
            marginVertical: theme.spacing.sm,
        },
        contentContainer: {
            flex: 1,
            justifyContent: 'space-between' as const,
            paddingHorizontal: theme.spacing.lg,
        },
        characterContainer: {
            flex: 4,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            position: 'relative' as const,
        },
        glowEffect: {
            position: 'absolute' as const,
            width: 200,
            height: 200,
            backgroundColor: theme.colors.backgrounds.overlay,
            borderRadius: 100,
            opacity: 0.5,
        },
        timerContainer: {
            flex: 2,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
        },
        timerText: {
            fontVariant: ['tabular-nums'] as const,
            letterSpacing: 2,
            color: theme.colors.text.primary,
        },
        phaseText: {
            marginTop: theme.spacing.sm,
            textTransform: 'uppercase' as const,
            letterSpacing: 1,
            opacity: 0.8,
        },
        controls: {
            flex: 1,
            justifyContent: 'flex-end' as const,
            paddingBottom: theme.spacing.xl,
        },
        actionButton: {
            width: '100%' as const,
            backgroundColor: theme.colors.backgrounds.cardSolid,
            borderWidth: 1,
            borderColor: theme.colors.ui.border,
        },
    }), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={handleExit} style={styles.exitButton} hitSlop={10}>
                    <X color={theme.colors.text.primary} size={24} />
                </Pressable>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <ProgressBar
                    progress={getProgress()}
                    color={theme.colors.primary[activeCompanion || 'cat']}
                    height={6}
                />
            </View>

            <View style={styles.contentContainer}>
                {/* Character Section - Flexible */}
                <View style={styles.characterContainer}>
                    <View style={styles.glowEffect} />
                    <CharacterDisplay
                        type={activeCompanion}
                        mood="focused"
                        size={IS_SMALL_DEVICE ? "md" : "lg"}
                        animated={true}
                    />
                </View>

                {/* Timer Section - Fixed Height */}
                <View style={styles.timerContainer}>
                    <Text size={IS_SMALL_DEVICE ? "xl" : "timer"} weight="bold" align="center" style={styles.timerText}>
                        {formatTime(timeLeft)}
                    </Text>
                    <Text
                        size="md"
                        color={theme.colors.text.secondary}
                        align="center"
                        style={styles.phaseText}
                    >
                        {phase === 'work' ? 'Stay focused...' : 'Take a break!'}
                    </Text>
                </View>

                {/* Controls Section - Bottom Anchored */}
                <View style={styles.controls}>
                    <Button
                        label={status === 'running' ? 'Pause Session' : 'Resume Session'}
                        onPress={handleToggle}
                        variant="secondary"
                        size="lg"
                        style={styles.actionButton}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
