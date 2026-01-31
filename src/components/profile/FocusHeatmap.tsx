import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../ui/Text';
import { useTheme } from '../../constants/theme';
import { useThemeStore } from '../../stores/useThemeStore';

interface FocusHeatmapProps {
    data: Record<string, { count: number; duration: number }>;
}

const DAYS_IN_YEAR = 365;
const WEEKS_TO_SHOW = 20; // Show last ~5 months to keep it manageable horizontal scroll

export const FocusHeatmap: React.FC<FocusHeatmapProps> = ({ data }) => {
    const theme = useTheme();
    const activeThemeId = useThemeStore((s) => s.themeId);

    // Generate dates
    const weeks = useMemo(() => {
        const today = new Date();
        const result = [];
        // Align to end of week (Sunday)
        const dayOfWeek = today.getDay(); // 0 is Sunday
        const daysToNextSat = 6 - dayOfWeek; // Optional: alignment logic

        // We want to show WEEKS_TO_SHOW columns
        // Let's generate data for WEEKS_TO_SHOW * 7 days ending today (or near today)

        // Strategy: Create a 2D array [Week][Day]
        // Week 0 is the oldest week, Week N is current week

        const tempWeeks = [];
        let currentDate = new Date(today);

        // Shift to find the last day to show (e.g. today)
        // Let's iterate backwards from today

        // Easier: Build simple array of dates backwards then chunk into 7
        const dates = [];
        for (let i = 0; i < WEEKS_TO_SHOW * 7; i++) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            dates.unshift(d);
        }

        // Determine offset for first week to align rows properly (Sunday at top or Mon at top)
        // Standard Heatmap: Columns are weeks, Rows are days (Sun/Mon -> Sat)
        // Let's assume Mon start for rows like GitHub? Or Sun?
        // Let's use Mon (0) to Sun (6) visually if we want.
        // Actually GitHub uses Sun (0) at top.

        // Let's chunk 'dates' into weeks based on day index
        // But 'dates' is just a flat list ending today.
        // We need to align it so the visual grid makes sense.
        // Let's just create a grid where columns are weeks.

        // Simpler approach for React Native Layout:
        // A Row of Columns. Each Column has 7 squares.

        const grid = [];
        // Find the start date that aligns with a Sunday to ensure complete columns?
        // Or just fill the grid.

        // Let's go with: Last WEEKS_TO_SHOW weeks.
        // End date = today.
        // Start date = today - (WEEKS_TO_SHOW * 7) days approximately.

        // Correct approach:
        // Calculate the 'end of the current week' (upcoming Saturday)
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Move to Saturday

        for (let w = 0; w < WEEKS_TO_SHOW; w++) {
            const weekDays = [];
            for (let d = 0; d < 7; d++) {
                // Determine date: EndOfWeek - (WeekOffset * 7) - (DayOffset from Sat)
                // We want oldest week first (left).
                // So w=0 is oldest.
                const weekIndexFromEnd = (WEEKS_TO_SHOW - 1) - w;

                // For a specific col (week), row 0 is Sunday, row 6 is Saturday.
                // Date = EndOfWeek - (weekIndexFromEnd * 7) - (6 - d)
                const date = new Date(endOfWeek);
                date.setDate(endOfWeek.getDate() - (weekIndexFromEnd * 7) - (6 - d));

                weekDays.push(date);
            }
            grid.push(weekDays);
        }

        return grid;
    }, []);

    const getIntensityColor = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        const stats = data[dateStr];
        const count = stats?.count || 0;

        // Use theme primary color but with different opacities
        // Base color RGB logic might be complex with hex strings.
        // Simplification: Use predetermined opacity style or different theme tokens if available.
        // Since we have hex colors, let's use opacity.

        const baseColor = theme.colors.primary.cat; // Default to cat/primary color
        // Ideally use active companion color but 'cat' is fine for generic or user active one.
        // Let's stick to theme properties.
        const emptyColor = theme.colors.backgrounds.cardSolid; // or slightly darker for empty

        if (count === 0) return theme.colors.backgrounds.cardSolid; // Empty state

        if (count >= 10) return baseColor; // Max intensity
        if (count >= 6) return adjustOpacity(baseColor, 0.8);
        if (count >= 3) return adjustOpacity(baseColor, 0.6);
        return adjustOpacity(baseColor, 0.4);
    };

    // Helper for Hex opacity
    const adjustOpacity = (hex: string, opacity: number) => {
        // Very basic hex to potential rgba or just return hex if simple
        // If hex is #RRGGBB, we can make it transparent using 'rgba' or 8-digit hex
        // React Native supports #RRGGBBAA

        if (!hex.startsWith('#')) return hex;

        const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
        // Ensure hex is 6 chars before adding alpha
        if (hex.length === 4) {
            // #RGB -> #RRGGBB
            const r = hex[1];
            const g = hex[2];
            const b = hex[3];
            return `#${r}${r}${g}${g}${b}${b}${alpha}`;
        }
        return `${hex}${alpha}`;
    };

    const styles = useMemo(() => StyleSheet.create({
        container: {
            gap: theme.spacing.sm,
        },
        heatmapContainer: {
            flexDirection: 'row',
        },
        column: {
            gap: 4, // spacing between squares
            marginRight: 4,
        },
        cell: {
            width: 12,
            height: 12,
            borderRadius: 2,
        },
        monthLabels: {
            flexDirection: 'row',
            marginBottom: 4,
        },
        legend: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 4,
            marginTop: 8,
        }
    }), [theme]);

    return (
        <View style={styles.container}>
            <Text size="lg" weight="semibold">Fokus Haritası</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
            >
                <View style={styles.heatmapContainer}>
                    {weeks.map((week, wIndex) => (
                        <View key={`week-${wIndex}`} style={styles.column}>
                            {week.map((date, dIndex) => (
                                <View
                                    key={`day-${dIndex}`}
                                    style={[
                                        styles.cell,
                                        { backgroundColor: getIntensityColor(date) }
                                    ]}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.legend}>
                <Text size="xs" color={theme.colors.text.secondary}>Az</Text>
                <View style={[styles.cell, { backgroundColor: theme.colors.backgrounds.cardSolid }]} />
                <View style={[styles.cell, { backgroundColor: adjustOpacity(theme.colors.primary.cat, 0.4) }]} />
                <View style={[styles.cell, { backgroundColor: adjustOpacity(theme.colors.primary.cat, 0.8) }]} />
                <View style={[styles.cell, { backgroundColor: theme.colors.primary.cat }]} />
                <Text size="xs" color={theme.colors.text.secondary}>Çok</Text>
            </View>
        </View>
    );
};
