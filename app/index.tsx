import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../src/components/ui/Text';
import { Card } from '../src/components/ui/Card';
import { CharacterDisplay } from '../src/components/character/CharacterDisplay';
import { useUserStore } from '../src/stores/useUserStore';
import { useScreenSize } from '../src/hooks/useScreenSize';
import { useTheme } from '../src/constants/theme';
import type { CompanionType } from '../src/types';

export default function OnboardingScreen() {
    const theme = useTheme();
    const router = useRouter();
    const setActiveCompanion = useUserStore((state) => state.setActiveCompanion);
    const { isSmall } = useScreenSize();
    const [selected, setSelected] = useState<CompanionType | null>(null);

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgrounds.main,
        },
        content: {
            flex: 1,
            padding: theme.spacing.xl,
            justifyContent: 'center' as const,
        },
        title: {
            marginBottom: theme.spacing.xxxl,
            textAlign: 'center' as const,
        },
        grid: { gap: theme.spacing.lg },
        card: {
            alignItems: 'center' as const,
            paddingVertical: theme.spacing.lg,
        },
        name: { marginTop: theme.spacing.sm },
    }), [theme]);

    const companions: Array<{ type: CompanionType; name: string }> = [
        { type: 'cat', name: '🐱 Cat' },
        { type: 'dog', name: '🐶 Dog' },
    ];

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
            <View style={styles.content}>
                <Text size={isSmall ? "xl" : "xxl"} weight="bold" align="center" style={styles.title}>
                    Choose your focus{'\n'}companion
                </Text>

                <View style={styles.grid}>
                    {companions.map((companion) => (
                        <Card
                            key={companion.type}
                            selected={selected === companion.type}
                            onPress={() => handleSelect(companion.type)}
                            style={styles.card}
                        >
                            <CharacterDisplay
                                type={companion.type}
                                mood="idle"
                                size={isSmall ? "sm" : "md"}
                                animated={true}
                            />
                            <Text size="lg" weight="semibold" align="center" style={styles.name}>
                                {companion.name}
                            </Text>
                        </Card>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

