import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withSequence,
    withDelay,
} from 'react-native-reanimated';
import { Text } from '../src/components/ui/Text';
import { Button } from '../src/components/ui/Button';
import { CharacterDisplay } from '../src/components/character/CharacterDisplay';
import { useUserStore } from '../src/stores/useUserStore';
import { useTimerStore } from '../src/stores/useTimerStore';
import { useTheme } from '../src/constants/theme';
import { PlayCircle } from 'lucide-react-native';
import { getCharacterMood } from '../src/utils/characterMood';

export default function CompletionScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { t } = useTranslation();
    const { activeCompanion, xp, level, addXP, addCurrency, sessionsToday, lastSessionOutcome } = useUserStore();
    const reset = useTimerStore((state) => state.reset);

    const scale = useSharedValue(0);
    const confettiOpacity = useSharedValue(0);

    useEffect(() => {
        // Entry animation
        scale.value = withSpring(1, { damping: 10 });

        // Confetti animation
        confettiOpacity.value = withSequence(
            withDelay(300, withSpring(1)),
            withDelay(2000, withSpring(0))
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const confettiStyle = useAnimatedStyle(() => ({
        opacity: confettiOpacity.value,
    }));

    const mood = getCharacterMood('completed', lastSessionOutcome, sessionsToday);

    const handleContinue = () => {
        reset();
        router.replace('/(tabs)/home');
    };

    const handleDoubleReward = () => {
        // Simulated Ad
        Alert.alert(
            t('common.success'),
            t('shop.ad_success'),
            [
                {
                    text: 'OK',
                    onPress: () => {
                        addXP(25); // Original was 25, add another 25
                        addCurrency(10); // Original was 10, add another 10
                        handleContinue();
                    }
                }
            ]
        );
    };

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgrounds.main,
        },
        confetti: {
            position: 'absolute' as const,
            top: 100,
            left: 0,
            right: 0,
            flexDirection: 'row' as const,
            justifyContent: 'space-around' as const,
            zIndex: 10,
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
        secondaryButton: {
            width: '100%' as const,
            marginTop: theme.spacing.md,
        },
    }), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Confetti Effect */}
            <Animated.View style={[styles.confetti, confettiStyle]}>
                <Text size="huge">✨</Text>
                <Text size="huge">🎉</Text>
                <Text size="huge">⭐</Text>
            </Animated.View>

            <Animated.View style={[styles.content, animatedStyle]}>
                {/* Character */}
                <CharacterDisplay
                    type={activeCompanion}
                    mood={mood}
                    size="lg"
                    animated={true}
                />

                {/* Success Message */}
                <Text size="xxl" weight="bold" align="center" style={styles.title}>
                    Great work! 🎉
                </Text>

                <Text size="lg" color={theme.colors.text.secondary} align="center">
                    You completed a focus session
                </Text>

                {/* XP Reward */}
                <View style={styles.rewardContainer}>
                    <Text size="xl" weight="bold" color={theme.colors.accents.xp}>
                        +25 XP
                    </Text>
                    <Text size="md" color={theme.colors.text.secondary}>
                        Level {level} • {xp} XP
                    </Text>
                </View>

                {/* Continue Button */}
                <Button
                    label={t('home.continue')}
                    onPress={handleContinue}
                    size="lg"
                    style={styles.button}
                />

                <Button
                    label={t('focus.double_reward')}
                    onPress={handleDoubleReward}
                    size="md"
                    variant="secondary"
                    icon={PlayCircle}
                    style={styles.secondaryButton}
                />
            </Animated.View>
        </SafeAreaView>
    );
}
