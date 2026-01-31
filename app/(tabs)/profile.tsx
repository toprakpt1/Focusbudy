import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { CharacterDisplay } from '../../src/components/character/CharacterDisplay';
import { useUserStore } from '../../src/stores/useUserStore';
import { useThemeStore, type ThemeId } from '../../src/stores/useThemeStore';
import { formatDuration, getLevelProgress } from '../../src/utils/formatters';
import { useTheme } from '../../src/constants/theme';

const THEME_OPTIONS: { id: ThemeId; label: string; emoji: string }[] = [
    { id: 'default', label: 'Pastel (Varsayılan)', emoji: '🌸' },
    { id: 'dark', label: 'Koyu', emoji: '🌙' },
    { id: 'white', label: 'Beyaz', emoji: '☀️' },
];

import { FocusHeatmap } from '../../src/components/profile/FocusHeatmap';

export default function ProfileScreen() {
    const theme = useTheme();
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
        },
        activityCard: { gap: theme.spacing.md },
        sectionTitle: { marginBottom: theme.spacing.sm },
        weekChart: {
            flexDirection: 'row' as const,
            justifyContent: 'space-between' as const,
            height: 120,
            alignItems: 'flex-end' as const,
        },
        dayColumn: {
            flex: 1,
            alignItems: 'center' as const,
            gap: theme.spacing.xs,
        },
        dayBar: {
            width: '70%' as const,
            borderRadius: theme.radius.sm,
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
        themeRow: {
            flexDirection: 'row' as const,
            gap: theme.spacing.sm,
        },
        themeOption: {
            flex: 1,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.sm,
            borderRadius: theme.radius.lg,
            borderWidth: 2,
            borderColor: 'transparent',
            alignItems: 'center' as const,
        },
        themeOptionSelected: {
            borderColor: theme.colors.primary.cat,
        },
    }), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Theme Picker */}
                <Card>
                    <Text size="lg" weight="semibold" style={styles.sectionTitle}>
                        🎨 Tema
                    </Text>
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
                                <Text size="lg">{opt.emoji}</Text>
                                <Text size="sm" weight="medium" align="center" color={theme.colors.text.secondary}>
                                    {opt.label}
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
                            Level {level} 🏆
                        </Text>
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
                        <Text size="huge" align="center">🔥</Text>
                        <Text size="xl" weight="bold" align="center">{streak}</Text>
                        <Text size="sm" color={theme.colors.text.secondary} align="center">Day Streak</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text size="huge" align="center">⏱️</Text>
                        <Text size="xl" weight="bold" align="center">{formatDuration(totalFocusTime)}</Text>
                        <Text size="sm" color={theme.colors.text.secondary} align="center">Total Time</Text>
                    </Card>
                </View>

                {/* Focus Heatmap */}
                <Card style={styles.activityCard}>
                    <FocusHeatmap data={history || {}} />
                </Card>

                {/* Today's Stats */}
                <Card>
                    <Text size="lg" weight="semibold" style={styles.sectionTitle}>Today's Progress</Text>
                    <View style={styles.todayStats}>
                        <View style={styles.todayStat}>
                            <Text size="xxl" weight="bold" color={theme.colors.primary.cat}>{sessionsToday}</Text>
                            <Text size="sm" color={theme.colors.text.secondary}>Sessions</Text>
                        </View>
                        <View style={styles.todayStat}>
                            <Text size="xxl" weight="bold" color={theme.colors.accents.xp}>{sessionsToday * 25}</Text>
                            <Text size="sm" color={theme.colors.text.secondary}>XP Earned</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView >
    );
}
