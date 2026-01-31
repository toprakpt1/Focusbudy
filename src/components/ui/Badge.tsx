import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './Text';
import { THEME } from '../../constants/theme';

interface BadgeProps {
    icon: string;
    value: string | number;
    color?: string;
    style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
    icon,
    value,
    color = THEME.colors.accents.streak,
    style,
}) => {
    return (
        <View style={[styles.container, { backgroundColor: color }, style]}>
            <Text size="sm" weight="medium">
                {icon}
            </Text>
            <Text size="sm" weight="bold">
                {value}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: THEME.spacing.xs,
        paddingHorizontal: THEME.spacing.md,
        paddingVertical: THEME.spacing.sm,
        borderRadius: THEME.radius.full,
        ...THEME.shadows.soft,
    },
});
