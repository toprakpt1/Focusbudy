import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { CharacterDisplay } from '../../src/components/character/CharacterDisplay';
import { useUserStore } from '../../src/stores/useUserStore';
import { useTheme } from '../../src/constants/theme';
import type { CompanionType } from '../../src/types';

interface ShopItem {
    type: CompanionType;
    name: string;
    price: number;
    emoji: string;
}

const shopItems: ShopItem[] = [
    { type: 'panda', name: 'Panda', price: 500, emoji: '🐼' },
    { type: 'fox', name: 'Fox', price: 750, emoji: '🦊' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MIN_WIDTH = Math.min(160, SCREEN_WIDTH * 0.42);
const SHOP_CARD_MIN_HEIGHT = 200;

export default function ShopScreen() {
    const {
        unlockedCompanions,
        activeCompanion,
        currency,
        unlockCompanion,
        spendCurrency,
        setActiveCompanion,
    } = useUserStore();
    
    const theme = useTheme();

    const handlePurchase = (item: ShopItem) => {
        if (currency < item.price) {
            Alert.alert('Not enough coins', `You need ${item.price - currency} more coins!`);
            return;
        }

        Alert.alert(
            `Unlock ${item.name}?`,
            `This will cost ${item.price} coins.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Unlock',
                    onPress: () => {
                        const success = spendCurrency(item.price);
                        if (success) {
                            unlockCompanion(item.type);
                            Alert.alert('Success!', `${item.name} is now unlocked! 🎉`);
                        }
                    },
                },
            ]
        );
    };

    const handleSelect = (type: CompanionType) => {
        setActiveCompanion(type);
        Alert.alert('Companion changed!', `${type} is now your active companion.`);
    };

    const isUnlocked = (type: CompanionType) => unlockedCompanions.includes(type);

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgrounds.main,
        },
        content: {
            padding: theme.spacing.lg,
            gap: theme.spacing.lg,
        },
        currencyCard: { alignItems: 'center' as const },
        currencyContent: {
            alignItems: 'center' as const,
            gap: theme.spacing.xs,
        },
        sectionTitle: { marginTop: theme.spacing.md },
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
            width: 64,
            height: 64,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        row: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            gap: 4,
        },
        shopCard: {
            width: '48%' as const,
            flexShrink: 0,
            alignItems: 'center' as const,
            paddingVertical: theme.spacing.md,
            gap: theme.spacing.sm,
        },
        imageContainer: {
            opacity: 0.3,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            minHeight: 80,
            width: '100%' as const,
            overflow: 'visible' as const,
        },
        unlocked: { opacity: 1 },
        name: { marginTop: theme.spacing.xs },
        unlockButton: { marginTop: theme.spacing.sm },
        earnCard: {
            marginTop: theme.spacing.lg,
            gap: theme.spacing.sm,
        },
    }), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Currency Display */}
                <Card style={styles.currencyCard}>
                    <View style={styles.currencyContent}>
                        <Text size="xl" weight="bold">
                            💰 {currency}
                        </Text>
                        <Text size="sm" color={theme.colors.text.secondary}>
                            Your Coins
                        </Text>
                    </View>
                </Card>

                {/* Owned Companions */}
                <Text size="lg" weight="semibold" style={styles.sectionTitle}>
                    Your Companions
                </Text>
                <View style={styles.grid}>
                    {unlockedCompanions.map((type) => (
                        <Card
                            key={type}
                            selected={activeCompanion === type}
                            onPress={() => handleSelect(type)}
                            style={[styles.companionCard, { minWidth: CARD_MIN_WIDTH }]}
                        >
                            <View style={styles.companionImageWrap}>
                                <CharacterDisplay type={type} mood="idle" size="sm" />
                            </View>
                            <Text size="md" weight="semibold" align="center" style={styles.name} numberOfLines={1}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Text>
                            {activeCompanion === type && (
                                <View style={styles.row}>
                                    <Text size="xs" color={theme.colors.primary.cat} numberOfLines={1}>
                                        ● Active
                                    </Text>
                                </View>
                            )}
                        </Card>
                    ))}
                </View>

                {/* Shop Items */}
                <Text size="lg" weight="semibold" style={styles.sectionTitle}>
                    Unlock New Companions
                </Text>
                <View style={styles.grid}>
                    {shopItems.map((item) => {
                        const unlocked = isUnlocked(item.type);
                        return (
                            <Card key={item.type} style={[styles.shopCard, { minWidth: CARD_MIN_WIDTH, minHeight: SHOP_CARD_MIN_HEIGHT }]}>
                                <View style={[styles.imageContainer, unlocked && styles.unlocked]}>
                                    {unlocked ? (
                                        <CharacterDisplay type={item.type} mood="idle" size="sm" />
                                    ) : (
                                        <Text size="huge">🔒</Text>
                                    )}
                                </View>
                                <Text size="md" weight="semibold" align="center" numberOfLines={1}>
                                    {item.emoji} {item.name}
                                </Text>
                                {!unlocked && (
                                    <>
                                        <Text size="sm" color={theme.colors.text.secondary} align="center">
                                            💰 {item.price} coins
                                        </Text>
                                        <Button
                                            label="Unlock"
                                            onPress={() => handlePurchase(item)}
                                            size="sm"
                                            variant="secondary"
                                            style={styles.unlockButton}
                                        />
                                    </>
                                )}
                                {unlocked && (
                                    <Text size="xs" color={theme.colors.accents.success} align="center">
                                        ✓ Unlocked
                                    </Text>
                                )}
                            </Card>
                        );
                    })}
                </View>

                {/* Earn More Section */}
                <Card style={styles.earnCard}>
                    <Text size="md" weight="semibold" align="center">
                        💡 Earn More Coins
                    </Text>
                    <Text size="sm" color={theme.colors.text.secondary} align="center">
                        Complete focus sessions to earn 10 coins each!
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
