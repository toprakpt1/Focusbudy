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
import {
    Coins,
    Wallet,
    Sparkles,
    CheckCircle2,
    Lock,
    Info,
    Store
} from 'lucide-react-native';

interface ShopItem {
    type: CompanionType;
    name: string;
    price: number;
}

const shopItems: ShopItem[] = [
    { type: 'panda', name: 'Panda', price: 500 },
    { type: 'fox', name: 'Tilki', price: 750 },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MIN_WIDTH = Math.min(160, SCREEN_WIDTH * 0.42);
const SHOP_CARD_MIN_HEIGHT = 220;

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
            Alert.alert('Yetersiz Bakıye', `${item.price - currency} altın daha gerekiyor!`);
            return;
        }

        Alert.alert(
            `${item.name} Açılsın mı?`,
            `Bu işlem ${item.price} altın değerinde.`,
            [
                { text: 'Vazgeç', style: 'cancel' },
                {
                    text: 'Kilidi Aç',
                    onPress: () => {
                        const success = spendCurrency(item.price);
                        if (success) {
                            unlockCompanion(item.type);
                            Alert.alert('Başarılı!', `${item.name} artık seninle! 🎉`);
                        }
                    },
                },
            ]
        );
    };

    const handleSelect = (type: CompanionType) => {
        setActiveCompanion(type);
        // User alert for confirmation
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
        currencyCard: {
            paddingVertical: theme.spacing.lg,
            alignItems: 'center' as const,
            backgroundColor: theme.colors.primary.cat,
            ...theme.shadows.glow,
        },
        currencyContent: {
            alignItems: 'center' as const,
            gap: theme.spacing.xs,
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
        shopCard: {
            width: '48%' as const,
            flexShrink: 0,
            alignItems: 'center' as const,
            paddingVertical: theme.spacing.md,
            gap: theme.spacing.sm,
        },
        imageContainer: {
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            minHeight: 80,
            width: '100%' as const,
        },
        lockOverlay: {
            position: 'absolute' as const,
            bottom: -5,
            right: '25%' as const,
            backgroundColor: theme.colors.backgrounds.cardSolid,
            borderRadius: theme.radius.full,
            padding: 4,
            borderWidth: 2,
            borderColor: theme.colors.backgrounds.main,
        },
        unlocked: { opacity: 1 },
        locked: { opacity: 0.5 },
        priceBadge: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: 4,
            backgroundColor: theme.colors.backgrounds.subtle,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: theme.radius.full,
            marginTop: 4,
        },
        earnCard: {
            marginTop: theme.spacing.lg,
            gap: theme.spacing.sm,
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.backgrounds.subtle,
            borderStyle: 'dashed' as const,
            borderWidth: 2,
            borderColor: theme.colors.ui.border,
        },
        earnHeader: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            gap: theme.spacing.sm,
        }
    }), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Currency Display */}
                <Card style={styles.currencyCard}>
                    <View style={styles.currencyContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Coins size={28} color={theme.colors.text.inverse} />
                            <Text size="xxl" weight="bold" color={theme.colors.text.inverse}>
                                {currency}
                            </Text>
                        </View>
                        <Text size="sm" color={theme.colors.text.inverse} style={{ opacity: 0.8 }}>
                            Mevcut Altınların
                        </Text>
                    </View>
                </Card>

                {/* Owned Companions */}
                <View style={styles.sectionHeader}>
                    <Sparkles size={20} color={theme.colors.primary.cat} />
                    <Text size="lg" weight="semibold">Dostların</Text>
                </View>

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
                            <Text size="md" weight="semibold" align="center" style={{ marginTop: 8 }} numberOfLines={1}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Text>
                            {activeCompanion === type && (
                                <View style={styles.statusRow}>
                                    <CheckCircle2 size={12} color={theme.colors.primary.cat} />
                                    <Text size="xs" color={theme.colors.primary.cat} weight="bold">
                                        Seçili
                                    </Text>
                                </View>
                            )}
                        </Card>
                    ))}
                </View>

                {/* Shop Items */}
                <View style={styles.sectionHeader}>
                    <Store size={20} color={theme.colors.primary.cat} />
                    <Text size="lg" weight="semibold">Mağaza</Text>
                </View>

                <View style={styles.grid}>
                    {shopItems.map((item) => {
                        const unlocked = isUnlocked(item.type);
                        return (
                            <Card key={item.type} style={[styles.shopCard, { minWidth: CARD_MIN_WIDTH, minHeight: SHOP_CARD_MIN_HEIGHT }]}>
                                <View style={[styles.imageContainer, !unlocked && styles.locked]}>
                                    <CharacterDisplay type={item.type} mood="idle" size="sm" />
                                    {!unlocked && (
                                        <View style={styles.lockOverlay}>
                                            <Lock size={14} color={theme.colors.text.secondary} />
                                        </View>
                                    )}
                                </View>
                                <Text size="md" weight="semibold" align="center" numberOfLines={1}>
                                    {item.name}
                                </Text>
                                {!unlocked && (
                                    <>
                                        <View style={styles.priceBadge}>
                                            <Coins size={14} color={theme.colors.primary.cat} />
                                            <Text size="sm" weight="bold" color={theme.colors.text.primary}>
                                                {item.price}
                                            </Text>
                                        </View>
                                        <Button
                                            label="Kilidi Aç"
                                            onPress={() => handlePurchase(item)}
                                            size="sm"
                                            variant="secondary"
                                            style={{ marginTop: 8 }}
                                        />
                                    </>
                                )}
                                {unlocked && (
                                    <View style={styles.statusRow}>
                                        <CheckCircle2 size={14} color={theme.colors.accents.success} />
                                        <Text size="xs" color={theme.colors.accents.success} weight="bold">
                                            Açıldı
                                        </Text>
                                    </View>
                                )}
                            </Card>
                        );
                    })}
                </View>

                {/* Earn More Section */}
                <Card style={styles.earnCard}>
                    <View style={styles.earnHeader}>
                        <Info size={18} color={theme.colors.primary.cat} />
                        <Text size="md" weight="semibold">Daha Fazla Kazan</Text>
                    </View>
                    <Text size="sm" color={theme.colors.text.secondary} align="center">
                        Her odaklanma seansını tamamladığında 10 altın kazanırsın!
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

