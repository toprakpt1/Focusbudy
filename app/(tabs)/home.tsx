import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { CharacterDisplay } from '../../src/components/character/CharacterDisplay';
import { usePomodoro } from '../../src/hooks/usePomodoro';
import { useUserStore } from '../../src/stores/useUserStore';
import { getCharacterMood } from '../../src/utils/characterMood';
import { useScreenSize } from '../../src/hooks/useScreenSize';
import { useTheme } from '../../src/constants/theme';
import { Flame, Star, Play, CircleDot } from 'lucide-react-native';

export default function HomeScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { t } = useTranslation();
    const { status, phase, timeLeft, formatTime, start, reset } = usePomodoro();
    const { activeCompanion, streak, sessionsToday, lastSessionOutcome, setLastSessionOutcome } = useUserStore();
    const { isSmall, scale } = useScreenSize();
    const insets = useSafeAreaInsets();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgrounds.main,
        },
        scrollContent: {
            paddingBottom: theme.spacing.md + 56 + Math.max(insets.bottom, 0),
        },
        statsBar: {
            flexDirection: 'row' as const,
            justifyContent: 'center' as const,
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
        },
        characterContainer: {
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            minHeight: 160,
            maxHeight: 200,
            paddingVertical: theme.spacing.sm,
        },
        characterGlow: {
            borderRadius: theme.radius.xl,
            padding: theme.spacing.xs,
        },
        timerContainer: {
            paddingHorizontal: theme.spacing.xl,
            marginBottom: theme.spacing.lg,
            alignItems: 'center' as const,
        },
        timerText: { letterSpacing: 2 },
        phaseLabel: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: 6,
            marginTop: theme.spacing.xs,
            letterSpacing: 0.5,
        },
        actionContainer: {
            paddingHorizontal: theme.spacing.xl,
            marginBottom: theme.spacing.lg,
        },
        startButton: {
            width: '100%' as const,
            ...theme.shadows.glow,
        },
        progressContainer: {
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: theme.spacing.lg,
        },
        progressCard: {
            backgroundColor: theme.colors.backgrounds.cardSolid,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: theme.colors.ui.border,
            padding: theme.spacing.md,
        },
        progressTitle: { marginBottom: theme.spacing.xs },
        progressText: {
            marginTop: theme.spacing.xs,
            textAlign: 'center' as const,
        },
    }), [theme, insets]);

    const mood = getCharacterMood(status, lastSessionOutcome, sessionsToday);

    const handleStart = () => {
        setLastSessionOutcome('none');
        start();
        router.push('/focus');
    };

    const targetSessions = 8;
    const sessionProgress = sessionsToday / targetSessions;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Stats Bar — glass-style badges */}
                <View style={styles.statsBar}>
                    <Badge icon={Flame} value={streak} color={theme.colors.accents.streak} />
                    <Badge icon={Star} value={sessionsToday * 25} color={theme.colors.accents.xp} />
                </View>

                {/* Character — centered with subtle space */}
                <View style={styles.characterContainer}>
                    <View style={styles.characterGlow}>
                        <CharacterDisplay
                            type={activeCompanion}
                            mood={mood}
                            size={isSmall ? "md" : "lg"}
                            animated={true}
                        />
                    </View>
                </View>

                {/* Timer Display — modern typography */}
                <View style={styles.timerContainer}>
                    <Text size={isSmall ? "huge" : "timer"} weight="bold" align="center" style={[styles.timerText, { transform: [{ scale }] }]}>
                        {formatTime(timeLeft)}
                    </Text>
                    <View style={styles.phaseLabel}>
                        <CircleDot size={14} color={phase === 'work' ? theme.colors.primary.cat : theme.colors.accents.xp} />
                        <Text size="md" color={theme.colors.text.secondary} align="center">
                            {phase === 'work' ? t('home.focus_time') : t('home.break_time')}
                        </Text>
                    </View>
                </View>

                {/* CTA — primary action with glow */}
                <View style={styles.actionContainer}>
                    <Button
                        label={status === 'idle' ? t('home.start_focus') : t('home.continue')}
                        onPress={handleStart}
                        size="lg"
                        icon={Play}
                        style={styles.startButton}
                    />
                </View>

                {/* Today's Progress — card-style section */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressCard}>
                        <Text size="md" weight="semibold" style={styles.progressTitle}>
                            {t('home.summary')}
                        </Text>
                        <ProgressBar
                            progress={sessionProgress}
                            color={theme.colors.primary.cat}
                            height={10}
                        />
                        <Text size="sm" color={theme.colors.text.secondary} style={styles.progressText}>
                            {t('home.sessions_completed', { count: sessionsToday, total: targetSessions })}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
