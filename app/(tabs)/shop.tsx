import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { CharacterDisplay } from '../../src/components/character/CharacterDisplay';
import { useUserStore } from '../../src/stores/useUserStore';
import { useTheme } from '../../src/constants/theme';
import type { CompanionType } from '../../src/types';
import { Sparkles, CheckCircle2 } from 'lucide-react-native';

const ALL_COMPANIONS: CompanionType[] = ['cat', 'dog', 'panda', 'fox', 'owl', 'rabbit'];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MIN_WIDTH = Math.min(160, SCREEN_WIDTH * 0.42);

export default function ShopScreen() {
    const { t } = useTranslation();
    const { activeCompanion, setActiveCompanion } = useUserStore();
    const theme = useTheme();

    const handleSelect = (type: CompanionType) => {
        setActiveCompanion(type);
    };

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: theme.colors.backgrounds.main,
                },
                content: {
                    padding: theme.spacing.lg,
                    gap: theme.spacing.lg,
                },
                sectionHeader: {
                    flexDirection: 'row' as const,
                    alignItems: 'center' as const,
                    gap: theme.spacing.sm,
                    marginTop: theme.spacing.md,
                },
                grid: {
                    flexDirection: 'row' as const,
                    flexWrap: 'wrap' as const,
                    justifyContent: 'space-between' as const,
                    gap: theme.spacing.md,
                },
                companionCard: {
                    width: '48%' as const,
                    flexShrink: 0,
                    alignItems: 'center' as const,
                    paddingVertical: theme.spacing.lg,
                    paddingHorizontal: theme.spacing.sm,
                    gap: theme.spacing.xs,
                },
                companionImageWrap: {
                    width: 70,
                    height: 70,
                    alignItems: 'center' as const,
                    justifyContent: 'center' as const,
                },
                statusRow: {
                    flexDirection: 'row' as const,
                    alignItems: 'center' as const,
                    gap: 4,
                    marginTop: 4,
                },
            }),
        [theme]
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.sectionHeader}>
                    <Sparkles size={20} color={theme.colors.primary.cat} />
                    <Text size="lg" weight="semibold">
                        {t('shop.your_buddies')}
                    </Text>
                </View>

                <View style={styles.grid}>
                    {ALL_COMPANIONS.map((type) => (
                        <Card
                            key={type}
                            selected={activeCompanion === type}
                            onPress={() => handleSelect(type)}
                            style={[styles.companionCard, { minWidth: CARD_MIN_WIDTH }]}
                        >
                            <View style={styles.companionImageWrap}>
                                <CharacterDisplay type={type} mood="idle" size="sm" />
                            </View>
                            <Text
                                size="md"
                                weight="semibold"
                                align="center"
                                style={{ marginTop: 8 }}
                                numberOfLines={1}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Text>
                            {activeCompanion === type && (
                                <View style={styles.statusRow}>
                                    <CheckCircle2 size={12} color={theme.colors.primary.cat} />
                                    <Text size="xs" color={theme.colors.primary.cat} weight="bold">
                                        {t('shop.selected')}
                                    </Text>
                                </View>
                            )}
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

