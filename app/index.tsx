import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../src/components/ui/Text';
import { Card } from '../src/components/ui/Card';
import { CharacterDisplay } from '../src/components/character/CharacterDisplay';
import { useUserStore } from '../src/stores/useUserStore';
import { useScreenSize } from '../src/hooks/useScreenSize';
import { useTheme } from '../src/constants/theme';
import type { CompanionType } from '../src/types';
import { COMPANIONS } from '../src/constants/companions';

export default function OnboardingScreen() {
    const theme = useTheme();
    const router = useRouter();
    const setActiveCompanion = useUserStore((state) => state.setActiveCompanion);
    const { isSmall, width } = useScreenSize();
    const [selected, setSelected] = useState<CompanionType | null>(null);
    const cardWidth = Math.floor((width - theme.spacing.lg * 2 - theme.spacing.md) / 2);

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
        },
        title: {
            marginBottom: theme.spacing.sm,
        },
        subtitle: {
            marginBottom: theme.spacing.xl,
            maxWidth: 320,
        },
        grid: {
            flexDirection: 'row' as const,
            flexWrap: 'wrap' as const,
            gap: theme.spacing.md,
        },
        card: {
            alignItems: 'center' as const,
            width: cardWidth,
            minHeight: 156,
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
            marginTop: theme.spacing.xs,
            minHeight: 28,
        },
        helper: {
            marginTop: theme.spacing.xs,
            minHeight: 20,
        },
    }), [cardWidth, theme]);

    const handleSelect = (type: CompanionType) => {
        setSelected(type);
        setActiveCompanion(type);

        // Navigate to home after a short delay
        setTimeout(() => {
            router.replace('/(tabs)/home');
        }, 500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text size={isSmall ? "xl" : "xxl"} weight="bold" style={styles.title}>
                    Choose a companion
                </Text>
                <Text size="md" color={theme.colors.text.secondary} style={styles.subtitle}>
                    Pick the one you want to keep around while you focus.
                </Text>
                <View style={styles.grid}>
                    {COMPANIONS.filter((c) => c.unlockLevel === 0).map((companion) => (
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
                                {selected === companion.type ? 'Selected' : 'Tap to choose'}
                            </Text>
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
