import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { CharacterDisplay } from '../../src/components/character/CharacterDisplay';
import { useUserStore } from '../../src/stores/useUserStore';
import { formatDuration, getLevelProgress } from '../../src/utils/formatters';
import { THEME } from '../../src/constants/theme';

export default function ProfileScreen() {
    const {
        activeCompanion,
        level,
        xp,
        streak,
        totalFocusTime,
        sessionsToday,
    } = useUserStore();

    const levelProgress = getLevelProgress(xp, level);
    const xpForNext = level * 100;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
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
                        color={THEME.colors.accents.xp}
                        height={12}
                    />
                    <Text
                        size="sm"
                        color={THEME.colors.text.secondary}
                        style={styles.xpText}
                    >
                        {xp} / {xpForNext} XP
                    </Text>
                </Card>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Text size="huge" align="center">
                            🔥
                        </Text>
                        <Text size="xl" weight="bold" align="center">
                            {streak}
                        </Text>
                        <Text size="sm" color={THEME.colors.text.secondary} align="center">
                            Day Streak
                        </Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <Text size="huge" align="center">
                            ⏱️
                        </Text>
                        <Text size="xl" weight="bold" align="center">
                            {formatDuration(totalFocusTime)}
                        </Text>
                        <Text size="sm" color={THEME.colors.text.secondary} align="center">
                            Total Time
                        </Text>
                    </Card>
                </View>

                {/* Weekly Activity */}
                <Card style={styles.activityCard}>
                    <Text size="lg" weight="semibold" style={styles.sectionTitle}>
                        📊 This Week
                    </Text>

                    <View style={styles.weekChart}>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                            <View key={day} style={styles.dayColumn}>
                                <View
                                    style={[
                                        styles.dayBar,
                                        {
                                            height: index < 5 ? '80%' : '30%',
                                            backgroundColor:
                                                index < 5
                                                    ? THEME.colors.primary.cat
                                                    : THEME.colors.ui.border,
                                        },
                                    ]}
                                />
                                <Text size="xs" color={THEME.colors.text.secondary}>
                                    {day}
                                </Text>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Today's Stats */}
                <Card>
                    <Text size="lg" weight="semibold" style={styles.sectionTitle}>
                        Today's Progress
                    </Text>
                    <View style={styles.todayStats}>
                        <View style={styles.todayStat}>
                            <Text size="xxl" weight="bold" color={THEME.colors.primary.cat}>
                                {sessionsToday}
                            </Text>
                            <Text size="sm" color={THEME.colors.text.secondary}>
                                Sessions
                            </Text>
                        </View>
                        <View style={styles.todayStat}>
                            <Text size="xxl" weight="bold" color={THEME.colors.accents.xp}>
                                {sessionsToday * 25}
                            </Text>
                            <Text size="sm" color={THEME.colors.text.secondary}>
                                XP Earned
                            </Text>
                        </View>
                    </View>
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
    characterSection: {
        alignItems: 'center',
        paddingVertical: THEME.spacing.lg,
    },
    levelCard: {
        gap: THEME.spacing.md,
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    xpText: {
        textAlign: 'center',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: THEME.spacing.md,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        gap: THEME.spacing.xs,
    },
    activityCard: {
        gap: THEME.spacing.md,
    },
    sectionTitle: {
        marginBottom: THEME.spacing.sm,
    },
    weekChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
        alignItems: 'flex-end',
    },
    dayColumn: {
        flex: 1,
        alignItems: 'center',
        gap: THEME.spacing.xs,
    },
    dayBar: {
        width: '70%',
        borderRadius: THEME.radius.sm,
    },
    todayStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: THEME.spacing.md,
    },
    todayStat: {
        alignItems: 'center',
        gap: THEME.spacing.xs,
    },
});
