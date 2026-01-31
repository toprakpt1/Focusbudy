import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../constants/theme';

interface BadgeProps {
    icon: string;
    value: string | number;
    color?: string;
    style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
    icon,
    value,
    color,
    style,
}) => {
    const theme = useTheme();
    const badgeColor = color ?? theme.colors.accents.streak;
    return (
        <View style={[styles.container, { borderColor: badgeColor + '40', backgroundColor: badgeColor + '22', ...theme.shadows.soft }, style]}>
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
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
});
