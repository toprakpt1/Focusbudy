import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { CharacterDisplay } from '../../src/components/character/CharacterDisplay';
import { useUserStore } from '../../src/stores/useUserStore';
import { useThemeStore, type ThemeId } from '../../src/stores/useThemeStore';
import { formatDuration, getLevelProgress } from '../../src/utils/formatters';
import { useTheme } from '../../src/constants/theme';
import {
    Flame,
    Timer,
    Trophy,
    Palette,
    Moon,
    Sun,
    Flower2,
    Zap,
    Star,
    Settings
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const THEME_OPTIONS: { id: ThemeId; labelKey: string; Icon: React.ElementType }[] = [
    { id: 'default', labelKey: 'profile.theme_pastel', Icon: Flower2 },
    { id: 'dark', labelKey: 'profile.theme_dark', Icon: Moon },
    { id: 'white', labelKey: 'profile.theme_white', Icon: Sun },
];

import { FocusHeatmap } from '../../src/components/profile/FocusHeatmap';

export default function ProfileScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { t } = useTranslation();
    const themeId = useThemeStore((s) => s.themeId);
    const setTheme = useThemeStore((s) => s.setTheme);
    const {
        activeCompanion,
        level,
        xp,
        streak,
        totalFocusTime,
        sessionsToday,
        history,
    } = useUserStore();

    const levelProgress = getLevelProgress(xp, level);
    const xpForNext = level * 100;

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgrounds.main,
        },
        content: {
            padding: theme.spacing.lg,
            gap: theme.spacing.lg,
        },
        characterSection: {
            alignItems: 'center' as const,
            paddingVertical: theme.spacing.lg,
        },
        levelCard: { gap: theme.spacing.md },
        levelHeader: {
            flexDirection: 'row' as const,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            gap: theme.spacing.sm,
        },
        xpText: { textAlign: 'center' as const },
        statsGrid: {
            flexDirection: 'row' as const,
            gap: theme.spacing.md,
        },
        statCard: {
            flex: 1,
            alignItems: 'center' as const,
            gap: theme.spacing.xs,
            paddingVertical: theme.spacing.lg,
        },
        activityCard: { gap: theme.spacing.md },
        sectionHeader: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.sm
        },
        themeRow: {
            flexDirection: 'row' as const,
            gap: theme.spacing.sm,
        },
        themeOption: {
            flex: 1,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.sm,
            borderRadius: theme.radius.lg,
            borderWidth: 2,
            borderColor: 'transparent',
            alignItems: 'center' as const,
            gap: theme.spacing.sm,
            backgroundColor: theme.colors.backgrounds.subtle,
        },
        themeOptionSelected: {
            borderColor: theme.colors.primary.cat,
            backgroundColor: theme.colors.backgrounds.cardSolid,
        },
        todayStats: {
            flexDirection: 'row' as const,
            justifyContent: 'space-around' as const,
            paddingTop: theme.spacing.md,
        },
        todayStat: {
            alignItems: 'center' as const,
            gap: theme.spacing.xs,
        },
        iconWrapper: {
            padding: theme.spacing.sm,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.backgrounds.subtle,
            marginBottom: theme.spacing.xs,
        },
        header: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'space-between' as const,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
        },
        settingsButton: {
            padding: theme.spacing.sm,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.backgrounds.subtle,
        },
    }), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Settings */}
            <View style={styles.header}>
                <Text size="xl" weight="bold">{t('common.profile')}</Text>
                <Pressable
                    onPress={() => router.push('/settings')}
                    style={styles.settingsButton}
                >
                    <Settings size={24} color={theme.colors.text.primary} />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Theme Picker */}
                <Card>
                    <View style={styles.sectionHeader}>
                        <Palette size={20} color={theme.colors.text.primary} />
                        <Text size="lg" weight="semibold">
                            {t('profile.theme')}
                        </Text>
                    </View>
                    <View style={styles.themeRow}>
                        {THEME_OPTIONS.map((opt) => (
                            <Pressable
                                key={opt.id}
                                onPress={() => setTheme(opt.id)}
                                style={[
                                    styles.themeOption,
                                    themeId === opt.id && styles.themeOptionSelected,
                                ]}
                            >
                                <opt.Icon
                                    size={24}
                                    color={themeId === opt.id ? theme.colors.primary.cat : theme.colors.text.secondary}
                                />
                                <Text
                                    size="sm"
                                    weight={themeId === opt.id ? "semibold" : "medium"}
                                    align="center"
                                    color={themeId === opt.id ? theme.colors.text.primary : theme.colors.text.secondary}
                                >
                                    {t(opt.labelKey)}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </Card>

                {/* Character Display */}
                <View style={styles.characterSection}>
                    <CharacterDisplay
                        type={activeCompanion}
                        mood="happy"
                        size="lg"
                        animated={true}
                    />
                </View>

                {/* Level Card */}
                <Card style={styles.levelCard}>
                    <View style={styles.levelHeader}>
                        <Text size="xl" weight="bold">
                            {t('profile.level', { level })}
                        </Text>
                        <Trophy size={24} color={theme.colors.accents.xp} fill={theme.colors.accents.xp} />
                    </View>
                    <ProgressBar
                        progress={levelProgress}
                        color={theme.colors.accents.xp}
                        height={12}
                    />
                    <Text size="sm" color={theme.colors.text.secondary} style={styles.xpText}>
                        {xp} / {xpForNext} XP
                    </Text>
                </Card>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <View style={styles.iconWrapper}>
                            <Flame size={32} color={theme.colors.primary.cat} fill={theme.colors.primary.cat} fillOpacity={0.2} />
                        </View>
                        <Text size="xl" weight="bold" align="center">{streak}</Text>
                        <Text size="sm" color={theme.colors.text.secondary} align="center">{t('profile.streak')}</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <View style={styles.iconWrapper}>
                            <Timer size={32} color={theme.colors.primary.cat} />
                        </View>
                        <Text size="xl" weight="bold" align="center">{formatDuration(totalFocusTime)}</Text>
                        <Text size="sm" color={theme.colors.text.secondary} align="center">{t('profile.total_focus')}</Text>
                    </Card>
                </View>

                {/* Focus Heatmap */}
                <Card style={styles.activityCard}>
                    <FocusHeatmap data={history || {}} />
                </Card>

                {/* Today's Stats */}
                <Card>
                    <Text size="lg" weight="semibold" style={{ marginBottom: theme.spacing.sm }}>{t('profile.daily_progress')}</Text>
                    <View style={styles.todayStats}>
                        <View style={styles.todayStat}>
                            <Zap size={24} color={theme.colors.primary.cat} style={{ marginBottom: 4 }} />
                            <Text size="xxl" weight="bold" color={theme.colors.primary.cat}>{sessionsToday}</Text>
                            <Text size="sm" color={theme.colors.text.secondary}>{t('profile.sessions')}</Text>
                        </View>
                        <View style={styles.todayStat}>
                            <Star size={24} color={theme.colors.accents.xp} fill={theme.colors.accents.xp} style={{ marginBottom: 4 }} />
                            <Text size="xxl" weight="bold" color={theme.colors.accents.xp}>{sessionsToday * 25}</Text>
                            <Text size="sm" color={theme.colors.text.secondary}>{t('profile.xp_gained')}</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView >
    );
}
