import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, PawPrint } from 'lucide-react-native';
import { Text } from '../src/components/ui/Text';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { CharacterDisplay } from '../src/components/character/CharacterDisplay';
import { useUserStore } from '../src/stores/useUserStore';
import { useScreenSize } from '../src/hooks/useScreenSize';
import { useTheme } from '../src/constants/theme';
import type { CompanionType } from '../src/types';
import { COMPANIONS } from '../src/constants/companions';

export default function OnboardingScreen() {
    const { t } = useTranslation();
    const theme = useTheme();
    const router = useRouter();
    const { onboardingComplete, completeOnboarding } = useUserStore();
    const { isSmall, width } = useScreenSize();
    const [selected, setSelected] = useState<CompanionType | null>(null);
    const availableCompanions = useMemo(
        () => COMPANIONS.filter((companion) => companion.unlockLevel === 0),
        []
    );
    const selectedCompanion = availableCompanions.find((companion) => companion.type === selected) ?? null;
    const cardWidth = Math.floor((width - theme.spacing.lg * 2 - theme.spacing.md) / 2);

    useEffect(() => {
        if (!onboardingComplete) return;
        const timer = setTimeout(() => {
            router.replace('/(tabs)/home');
        }, 0);
        return () => clearTimeout(timer);
    }, [onboardingComplete]);

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgrounds.main,
        },
        content: {
            flex: 1,
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
            gap: theme.spacing.lg,
        },
        introCard: {
            gap: theme.spacing.sm,
            padding: theme.spacing.lg,
            borderRadius: theme.radius.sm,
            borderWidth: 1,
            borderColor: theme.colors.ui.border,
            backgroundColor: theme.colors.backgrounds.cardSolid,
        },
        introRow: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'space-between' as const,
            gap: theme.spacing.md,
        },
        introMeta: {
            flex: 1,
            gap: theme.spacing.xs,
        },
        title: {
            marginBottom: theme.spacing.xs,
        },
        subtitle: {
            maxWidth: 360,
        },
        counterBox: {
            minWidth: 72,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.sm,
            borderRadius: theme.radius.xs,
            borderWidth: 1,
            borderColor: theme.colors.ui.border,
            backgroundColor: theme.colors.backgrounds.subtle,
            alignItems: 'center' as const,
        },
        grid: {
            flexDirection: 'row' as const,
            flexWrap: 'wrap' as const,
            gap: theme.spacing.md,
        },
        card: {
            alignItems: 'center' as const,
            width: cardWidth,
            minHeight: 176,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.sm,
        },
        avatarWrap: {
            width: 72,
            height: 72,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        name: {
            marginTop: theme.spacing.sm,
            minHeight: 28,
        },
        helper: {
            marginTop: theme.spacing.xs,
            minHeight: 20,
        },
        selectedCard: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.md,
        },
        selectedAvatarWrap: {
            width: 64,
            height: 64,
            borderRadius: theme.radius.sm,
            backgroundColor: theme.colors.backgrounds.subtle,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        selectedMeta: {
            flex: 1,
            gap: theme.spacing.xs,
        },
        selectedBadge: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: 6,
        },
        footer: {
            marginTop: theme.spacing.xs,
            gap: theme.spacing.sm,
        },
    }), [cardWidth, theme]);

    const handleSelect = (type: CompanionType) => {
        setSelected(type);
    };

    const handleContinue = () => {
        if (!selected) {
            return;
        }

        completeOnboarding(selected);
        router.replace('/(tabs)/home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.introCard}>
                    <View style={styles.introRow}>
                        <View style={styles.introMeta}>
                            <Text size={isSmall ? 'xl' : 'xxl'} weight="bold" style={styles.title}>
                                {t('onboarding.title')}
                            </Text>
                            <Text size="md" color={theme.colors.text.secondary} style={styles.subtitle}>
                                {t('onboarding.subtitle')}
                            </Text>
                        </View>
                        <View style={styles.counterBox}>
                            <Text size="xs" color={theme.colors.text.secondary}>
                                {t('onboarding.available')}
                            </Text>
                            <Text size="lg" weight="bold">
                                {availableCompanions.length}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.grid}>
                    {availableCompanions.map((companion) => (
                        <Card
                            key={companion.type}
                            selected={selected === companion.type}
                            onPress={() => handleSelect(companion.type)}
                            style={styles.card}
                        >
                            <View style={styles.avatarWrap}>
                                <CharacterDisplay
                                    type={companion.type}
                                    mood="idle"
                                    size="sm"
                                    animated={true}
                                />
                            </View>
                            <Text size="lg" weight="semibold" align="center" style={styles.name}>
                                {companion.name}
                            </Text>
                            <Text size={isSmall ? "xs" : "sm"} color={theme.colors.text.secondary} align="center" style={styles.helper}>
                                {selected === companion.type ? t('onboarding.selected') : t('onboarding.tap_to_choose')}
                            </Text>
                        </Card>
                    ))}
                </View>

                {selectedCompanion ? (
                    <Card style={styles.selectedCard}>
                        <View style={styles.selectedAvatarWrap}>
                            <CharacterDisplay
                                type={selectedCompanion.type}
                                mood="happy"
                                size="sm"
                                animated={true}
                            />
                        </View>
                        <View style={styles.selectedMeta}>
                            <Text size="md" weight="semibold">
                                {t('onboarding.ready_with', { name: selectedCompanion.name })}
                            </Text>
                            <Text size="sm" color={theme.colors.text.secondary}>
                                {t('onboarding.selection_hint')}
                            </Text>
                        </View>
                        <View style={styles.selectedBadge}>
                            <CheckCircle2 size={16} color={theme.colors.primary[selectedCompanion.type]} />
                            <Text
                                size="sm"
                                weight="semibold"
                                color={theme.colors.primary[selectedCompanion.type]}
                            >
                                {t('onboarding.selected')}
                            </Text>
                        </View>
                    </Card>
                ) : null}

                <View style={styles.footer}>
                    <Button
                        label={t('onboarding.continue')}
                        onPress={handleContinue}
                        disabled={!selected}
                        size="lg"
                        icon={PawPrint}
                    />
                    <Text size="sm" color={theme.colors.text.secondary} align="center">
                        {t('onboarding.unlock_hint')}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
