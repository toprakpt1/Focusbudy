import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Text } from '../src/components/ui/Text';
import { Button } from '../src/components/ui/Button';
import { CharacterDisplay } from '../src/components/character/CharacterDisplay';
import Confetti from '../src/components/Confetti';
import { useUserStore } from '../src/stores/useUserStore';
import { useTimerStore } from '../src/stores/useTimerStore';
import { useTheme } from '../src/constants/theme';
import { getCharacterMood } from '../src/utils/characterMood';
import { COMPANIONS } from '../src/constants/companions';
import type { CharacterMood, CompanionType } from '../src/types';

export default function CompletionScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { t } = useTranslation();
    const { activeCompanion, xp, level, sessionsToday, lastSessionOutcome, lastSessionRewards, clearLastSessionRewards } = useUserStore();
    const reset = useTimerStore((state) => state.reset);

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(1, { damping: 10 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const mood = getCharacterMood('completed', lastSessionOutcome, sessionsToday);

    const leveledUp = lastSessionRewards?.leveledUp ?? false;
    const newLevel = lastSessionRewards?.newLevel;
    const unlockedCompanion = lastSessionRewards?.unlockedCompanion;

    const unlockedCompanionName = React.useMemo(() => {
        if (!unlockedCompanion) return '';
        return COMPANIONS.find((c) => c.type === unlockedCompanion)?.name ?? '';
    }, [unlockedCompanion]);

    // Determine display state
    const displayCharacter: CompanionType = unlockedCompanion ?? activeCompanion;
    const displayMood: CharacterMood = unlockedCompanion ? 'celebrating' : mood;
    const confettiCount = leveledUp ? (unlockedCompanion ? 100 : 75) : 50;

    const handleContinue = () => {
        clearLastSessionRewards();
        reset();
        router.replace('/(tabs)/home');
    };

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgrounds.main,
        },
        content: {
            flex: 1,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            paddingHorizontal: theme.spacing.xl,
        },
        title: {
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.sm,
        },
        rewardContainer: {
            marginTop: theme.spacing.xxl,
            marginBottom: theme.spacing.xl,
            alignItems: 'center' as const,
            gap: theme.spacing.xs,
        },
        button: { width: '100%' as const },
    }), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            <Confetti count={confettiCount} />

            <Animated.View style={[styles.content, animatedStyle]}>
                {/* Character */}
                <CharacterDisplay
                    type={displayCharacter}
                    mood={displayMood}
                    size="lg"
                    animated={true}
                />

                {/* Message */}
                {leveledUp && newLevel ? (
                    <>
                        <Text size="xxl" weight="bold" align="center" style={styles.title}>
                            {t('completion.level_up', { level: newLevel })}
                        </Text>
                        <Text size="lg" color={theme.colors.text.secondary} align="center">
                            {unlockedCompanion
                                ? t('completion.unlocked', { name: unlockedCompanionName })
                                : t('completion.level_up_message')}
                        </Text>
                    </>
                ) : (
                    <>
                        <Text size="xxl" weight="bold" align="center" style={styles.title}>
                            {t('completion.great_work')}
                        </Text>
                        <Text size="lg" color={theme.colors.text.secondary} align="center">
                            {t('completion.session_complete')}
                        </Text>
                    </>
                )}

                {/* XP Reward */}
                <View style={styles.rewardContainer}>
                    <Text size="xl" weight="bold" color={theme.colors.accents.xp}>
                        +25 XP
                    </Text>
                    <Text size="md" color={theme.colors.text.secondary}>
                        {t('profile.level', { level })} • {xp} XP
                    </Text>
                </View>

                {/* Continue Button */}
                <Button
                    label={t('home.continue')}
                    onPress={handleContinue}
                    size="lg"
                    style={styles.button}
                />
            </Animated.View>
        </SafeAreaView>
    );
}
