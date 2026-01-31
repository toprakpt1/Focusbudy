import React from 'react';
import { View, StyleSheet, SafeAreaView, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Text } from '../src/components/ui/Text';
import { Button } from '../src/components/ui/Button';
import { ProgressBar } from '../src/components/ui/ProgressBar';
import { CharacterDisplay } from '../src/components/character/CharacterDisplay';
import { usePomodoro } from '../src/hooks/usePomodoro';
import { useUserStore } from '../src/stores/useUserStore';
import { THEME } from '../src/constants/theme';
import { Pressable } from 'react-native';

const { height } = Dimensions.get('window');
const IS_SMALL_DEVICE = height < 700;

export default function FocusScreen() {
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

    // Auto-navigate to completion when done
    React.useEffect(() => {
        if (status === 'completed') {
            router.replace('/completion');
        }
    }, [status]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Area */}
            <View style={styles.header}>
                <Pressable onPress={handleExit} style={styles.exitButton} hitSlop={10}>
                    <X color={THEME.colors.text.primary} size={24} />
                </Pressable>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <ProgressBar
                    progress={getProgress()}
                    color={THEME.colors.primary[activeCompanion || 'cat']}
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
                        color={THEME.colors.text.secondary}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.backgrounds.focus,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: THEME.spacing.lg,
        paddingTop: THEME.spacing.sm,
        height: 50, // Fixed height for header
        alignItems: 'center',
    },
    exitButton: {
        padding: THEME.spacing.xs,
        backgroundColor: THEME.colors.backgrounds.card,
        borderRadius: THEME.radius.full,
    },
    progressContainer: {
        paddingHorizontal: THEME.spacing.xl,
        marginVertical: THEME.spacing.sm,
    },
    contentContainer: {
        flex: 1, // Takes remaining space
        justifyContent: 'space-between',
        paddingHorizontal: THEME.spacing.lg,
    },
    characterContainer: {
        flex: 4, // Dominates space
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    glowEffect: {
        position: 'absolute',
        width: 200,
        height: 200,
        backgroundColor: THEME.colors.backgrounds.overlay,
        borderRadius: 100,
        opacity: 0.5,
    },
    timerContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontVariant: ['tabular-nums'],
        letterSpacing: 2,
        color: THEME.colors.text.primary,
    },
    phaseText: {
        marginTop: THEME.spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
        opacity: 0.8,
    },
    controls: {
        flex: 1, // Bottom section
        justifyContent: 'flex-end',
        paddingBottom: THEME.spacing.xl,
    },
    actionButton: {
        width: '100%',
        backgroundColor: THEME.colors.backgrounds.card,
        borderWidth: 1,
        borderColor: THEME.colors.ui.border,
    }
});
