import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Text } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { CharacterDisplay } from '../../src/components/character/CharacterDisplay';
import { useUserStore } from '../../src/stores/useUserStore';
import { THEME } from '../../src/constants/theme';
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

export default function ShopScreen() {
    const {
        unlockedCompanions,
        activeCompanion,
        currency,
        unlockCompanion,
        spendCurrency,
        setActiveCompanion,
    } = useUserStore();

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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Currency Display */}
                <Card style={styles.currencyCard}>
                    <View style={styles.currencyContent}>
                        <Text size="xl" weight="bold">
                            💰 {currency}
                        </Text>
                        <Text size="sm" color={THEME.colors.text.secondary}>
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
                            style={styles.companionCard}
                        >
                            <CharacterDisplay type={type} mood="idle" size="sm" />
                            <Text size="md" weight="semibold" align="center" style={styles.name}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Text>
                            {activeCompanion === type && (
                                <View style={styles.row}>
                                    <Text size="xs" color={THEME.colors.primary.cat}>
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
                            <Card key={item.type} style={styles.shopCard}>
                                <View style={[styles.imageContainer, unlocked && styles.unlocked]}>
                                    {unlocked ? (
                                        <CharacterDisplay type={item.type} mood="idle" size="sm" />
                                    ) : (
                                        <Text size="huge">🔒</Text>
                                    )}
                                </View>
                                <Text size="md" weight="semibold" align="center">
                                    {item.emoji} {item.name}
                                </Text>
                                {!unlocked && (
                                    <>
                                        <Text size="sm" color={THEME.colors.text.secondary} align="center">
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
                                    <Text size="xs" color={THEME.colors.accents.success} align="center">
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
                    <Text size="sm" color={THEME.colors.text.secondary} align="center">
                        Complete focus sessions to earn 10 coins each!
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.backgrounds.main,
    },
    content: {
        padding: THEME.spacing.lg,
        gap: THEME.spacing.lg,
    },
    currencyCard: {
        alignItems: 'center',
    },
    currencyContent: {
        alignItems: 'center',
        gap: THEME.spacing.xs,
    },
    sectionTitle: {
        marginTop: THEME.spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Changed from gap to space-between for better alignment
        gap: THEME.spacing.md,
    },
    companionCard: {
        width: '48%', // Slightly increased width
        alignItems: 'center',
        paddingVertical: THEME.spacing.lg,
        gap: THEME.spacing.xs,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4
    },
    shopCard: {
        width: '48%',
        alignItems: 'center',
        gap: THEME.spacing.sm,
    },
    imageContainer: {
        opacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80, // Fixed height for consistency
    },
    unlocked: {
        opacity: 1,
    },
    name: {
        marginTop: THEME.spacing.xs,
    },
    unlockButton: {
        marginTop: THEME.spacing.sm,
    },
    earnCard: {
        marginTop: THEME.spacing.lg,
        gap: THEME.spacing.sm,
    },
});
