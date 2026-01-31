import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { CharacterDisplay } from '../../src/components/character/CharacterDisplay';
import { usePomodoro } from '../../src/hooks/usePomodoro';
import { useUserStore } from '../../src/stores/useUserStore';
import { getCharacterMood } from '../../src/utils/characterMood';
import { useScreenSize } from '../../src/hooks/useScreenSize';
import { THEME } from '../../src/constants/theme';

export default function HomeScreen() {
    const router = useRouter();
    const { status, phase, timeLeft, formatTime, start, reset } = usePomodoro();
    const { activeCompanion, streak, sessionsToday } = useUserStore();
    const { isSmall, scale } = useScreenSize();

    const mood = getCharacterMood(status, phase, timeLeft);

    const handleStart = () => {
        start();
        router.push('/focus');
    };

    const targetSessions = 8;
    const sessionProgress = sessionsToday / targetSessions;

    return (
        <SafeAreaView style={styles.container}>
            {/* Stats Bar */}
            <View style={styles.statsBar}>
                <Badge icon="🔥" value={streak} color={THEME.colors.accents.streak} />
                <Badge icon="⭐" value={sessionsToday * 25} color={THEME.colors.accents.xp} />
            </View>

            {/* Character */}
            <View style={styles.characterContainer}>
                <CharacterDisplay
                    type={activeCompanion}
                    mood={mood}
                    size={isSmall ? "md" : "lg"}
                    animated={true}
                />
            </View>

            {/* Timer Display */}
            <View style={styles.timerContainer}>
                <Text size={isSmall ? "huge" : "timer"} weight="bold" align="center" style={{transform: [{scale}]}}>
                    {formatTime(timeLeft)}
                </Text>
                <Text size="md" color={THEME.colors.text.secondary} align="center">
                    {phase === 'work' ? 'Focus Time' : 'Break Time'}
                </Text>
            </View>

            {/* Action Button */}
            <View style={styles.actionContainer}>
                <Button
                    label={status === 'idle' ? 'Start Focus' : 'Resume'}
                    onPress={handleStart}
                    size="lg"
                    style={styles.startButton}
                />
            </View>

            {/* Today's Progress */}
            <View style={styles.progressContainer}>
                <Text size="md" weight="semibold" style={styles.progressTitle}>
                    Today's Sessions
                </Text>
                <ProgressBar
                    progress={sessionProgress}
                    color={THEME.colors.primary.cat}
                    height={12}
                />
                <Text size="sm" color={THEME.colors.text.secondary} style={styles.progressText}>
                    {sessionsToday}/{targetSessions} completed
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.backgrounds.main,
    },
    statsBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: THEME.spacing.md,
        paddingVertical: THEME.spacing.md,
    },
    characterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    timerContainer: {
        paddingHorizontal: THEME.spacing.xl,
        marginBottom: THEME.spacing.xl,
        alignItems: 'center',
    },
    actionContainer: {
        paddingHorizontal: THEME.spacing.xl,
        marginBottom: THEME.spacing.lg,
    },
    startButton: {
        width: '100%',
    },
    progressContainer: {
        paddingHorizontal: THEME.spacing.xl,
        paddingBottom: THEME.spacing.lg,
    },
    progressTitle: {
        marginBottom: THEME.spacing.sm,
    },
    progressText: {
        marginTop: THEME.spacing.xs,
        textAlign: 'center',
    },
});
