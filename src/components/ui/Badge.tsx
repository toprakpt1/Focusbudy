import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../constants/theme';

interface BadgeProps {
    icon: React.ElementType | string;
    value: string | number;
    color?: string;
    style?: ViewStyle;
    iconSize?: number;
}

export const Badge: React.FC<BadgeProps> = ({
    icon: Icon,
    value,
    color,
    style,
    iconSize = 16,
}) => {
    const theme = useTheme();
    const badgeColor = color ?? theme.colors.accents.streak;

    return (
        <View style={[styles.container, { borderColor: badgeColor + '40', backgroundColor: badgeColor + '22', ...theme.shadows.soft }, style]}>
            {typeof Icon === 'string' ? (
                <Text size="sm" weight="medium">
                    {Icon}
                </Text>
            ) : (
                <Icon size={iconSize} color={badgeColor} fill={badgeColor} fillOpacity={0.2} />
            )}
            <Text size="sm" weight="bold" color={theme.colors.text.primary}>
                {value}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
});
