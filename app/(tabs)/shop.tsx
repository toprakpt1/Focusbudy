import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Alert, Dimensions, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
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
    Store,
    Crown,
    PlayCircle
} from 'lucide-react-native';

interface ShopItem {
    type: CompanionType;
    name: string;
    price: number;
}

 const ALL_COMPANIONS: CompanionType[] = ['cat', 'dog', 'panda', 'fox'];

const shopItems: ShopItem[] = [
    { type: 'panda', name: 'Panda', price: 500 },
    { type: 'fox', name: 'Tilki', price: 750 },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MIN_WIDTH = Math.min(160, SCREEN_WIDTH * 0.42);
const SHOP_CARD_MIN_HEIGHT = 220;

export default function ShopScreen() {
    const { t } = useTranslation();
    const {
        unlockedCompanions,
        activeCompanion,
        currency,
        unlockCompanion,
        spendCurrency,
        setActiveCompanion,
        isPremium,
        setPremium,
        addCurrency,
    } = useUserStore();

    const theme = useTheme();

    const handlePurchase = (item: ShopItem) => {
        if (isPremium) return;
        if (currency < item.price) {
            Alert.alert(t('shop.insufficient_balance'), t('shop.gold_needed', { amount: item.price - currency }));
            return;
        }

        Alert.alert(
            t('shop.unlock_confirm_title', { name: item.name }),
            t('shop.unlock_confirm_desc', { price: item.price }),
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('shop.unlock'),
                    onPress: () => {
                        const success = spendCurrency(item.price);
                        if (success) {
                            unlockCompanion(item.type);
                            Alert.alert(t('common.success'), t('shop.unlock_success', { name: item.name }));
                        }
                    },
                },
            ]
        );
    };

    const handleSelect = (type: CompanionType) => {
        setActiveCompanion(type);
    };

    const handleWatchAd = () => {
        // Simulated Ad
        Alert.alert(
            t('common.success'),
            t('shop.ad_success'),
            [{ text: 'OK', onPress: () => addCurrency(10) }]
        );
    };

    const handleGoPremium = () => {
        // Simulated Purchase
        Alert.alert(
            t('shop.go_premium'),
            t('shop.premium_desc'),
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('shop.get_premium'),
                    onPress: () => {
                        setPremium(true);
                        Alert.alert(t('common.success'), t('shop.purchase_success'));
                    },
                },
            ]
        );
    };

    const isUnlocked = (type: CompanionType) => isPremium || unlockedCompanions.includes(type);

     const ownedCompanions = isPremium ? ALL_COMPANIONS : unlockedCompanions;

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
        },
        premiumBanner: {
            backgroundColor: theme.colors.backgrounds.cardSolid,
            padding: theme.spacing.lg,
            borderRadius: theme.radius.xl,
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: theme.spacing.md,
            borderWidth: 2,
            borderColor: theme.colors.accents.xp,
            marginBottom: theme.spacing.sm,
        },
        premiumText: {
            flex: 1,
            gap: 2,
        },
        premiumBenefits: {
            marginTop: 8,
            gap: 6,
        },
        premiumBenefitRow: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: 8,
        },
        premiumBenefitDot: {
            width: 6,
            height: 6,
            borderRadius: 9999,
            backgroundColor: theme.colors.accents.xp,
        },
        adButton: {
            marginTop: theme.spacing.sm,
            backgroundColor: theme.colors.backgrounds.main,
            borderColor: theme.colors.primary.cat,
        },
        iconWrapper: {
            width: 40,
            height: 40,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.backgrounds.subtle,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.ui.border,
        },
        settingRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: theme.spacing.md,
        },
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
                            {t('shop.your_gold')}
                        </Text>
                    </View>
                </Card>

                {/* Premium Banner */}
                {!isPremium && (
                    <Pressable onPress={handleGoPremium}>
                        <View style={styles.premiumBanner}>
                            <View style={[styles.settingRow, { backgroundColor: 'transparent', paddingVertical: 0, gap: 12 }]}>
                                <View style={styles.iconWrapper}>
                                    <Crown size={24} color={theme.colors.accents.xp} />
                                </View>
                                <View style={styles.premiumText}>
                                    <Text weight="bold" size="lg">{t('shop.go_premium')}</Text>
                                    <Text size="sm" color={theme.colors.text.secondary}>{t('shop.premium_desc')}</Text>
                                    <View style={styles.premiumBenefits}>
                                        <View style={styles.premiumBenefitRow}>
                                            <View style={styles.premiumBenefitDot} />
                                            <Text size="sm" color={theme.colors.text.secondary}>{t('shop.premium_benefit_unlock_all')}</Text>
                                        </View>
                                        <View style={styles.premiumBenefitRow}>
                                            <View style={styles.premiumBenefitDot} />
                                            <Text size="sm" color={theme.colors.text.secondary}>{t('shop.premium_benefit_exclusive_animals')}</Text>
                                        </View>
                                        <View style={styles.premiumBenefitRow}>
                                            <View style={styles.premiumBenefitDot} />
                                            <Text size="sm" color={theme.colors.text.secondary}>{t('shop.premium_benefit_remove_ads')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}

                {/* Owned Companions */}
                <View style={styles.sectionHeader}>
                    <Sparkles size={20} color={theme.colors.primary.cat} />
                    <Text size="lg" weight="semibold">{t('shop.your_buddies')}</Text>
                </View>

                <View style={styles.grid}>
                    {ownedCompanions.map((type) => (
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
                                        {t('shop.selected')}
                                    </Text>
                                </View>
                            )}
                        </Card>
                    ))}
                </View>

                {/* Shop Items */}
                <View style={styles.sectionHeader}>
                    <Store size={20} color={theme.colors.primary.cat} />
                    <Text size="lg" weight="semibold">{t('common.shop')}</Text>
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
                                            label={t('shop.unlock')}
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
                                            {t('shop.unlocked')}
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
                        <Text size="md" weight="semibold">{t('shop.earn_more_title')}</Text>
                    </View>
                    <Text size="sm" color={theme.colors.text.secondary} align="center">
                        {t('shop.earn_more_desc')}
                    </Text>
                    <Button
                        label={t('shop.watch_ad_gold')}
                        onPress={handleWatchAd}
                        variant="secondary"
                        size="md"
                        icon={PlayCircle}
                        style={styles.adButton}
                    />
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

