import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../src/components/ui/Text';
import { useTheme } from '../src/constants/theme';
import { termsContent } from '../src/constants/termsContent';
import { ChevronLeft } from 'lucide-react-native';
import { useSettingsStore } from '../src/stores/useSettingsStore';

export default function TermsScreen() {
    const theme = useTheme();
    const router = useRouter();
    const language = useSettingsStore((s) => s.language);
    const content = language === 'tr' ? termsContent.tr : termsContent.en;

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgrounds.main,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            gap: theme.spacing.lg,
            backgroundColor: theme.colors.backgrounds.cardSolid,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.ui.border,
        },
        backButton: {
            padding: theme.spacing.sm,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.backgrounds.subtle,
            borderWidth: 1,
            borderColor: theme.colors.ui.border,
        },
        content: {
            padding: theme.spacing.lg,
            gap: theme.spacing.lg,
        },
        title: {
            marginBottom: theme.spacing.xs,
        },
        lastUpdated: {
            marginBottom: theme.spacing.lg,
        },
        section: {
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.md,
        },
        heading: {
            marginBottom: theme.spacing.xs,
        },
    }), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={theme.colors.text.primary} />
                </Pressable>
                <Text size="xl" weight="bold">
                    {content.title}
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text size="sm" color={theme.colors.text.secondary} style={styles.lastUpdated}>
                    {content.lastUpdated}
                </Text>

                {content.sections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text size="md" weight="semibold" style={styles.heading}>
                            {section.heading}
                        </Text>
                        <Text size="sm" color={theme.colors.text.secondary}>
                            {section.body}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
