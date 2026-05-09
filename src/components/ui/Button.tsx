import React, { useMemo } from 'react';
import {
    Pressable,
    StyleSheet,
    ViewStyle,
    PressableProps,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Text } from './Text';
import { useScreenSize } from '../../hooks/useScreenSize';
import { useTheme } from '../../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends Omit<PressableProps, 'style'> {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    icon?: React.ElementType;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    icon: Icon,
    style,
    ...props
}) => {
    const theme = useTheme();
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const { isSmall } = useScreenSize();

    const styles = useMemo(() => ({
        button: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            borderRadius: theme.radius.xs,
            gap: theme.spacing.sm,
            borderWidth: 1,
        },
        primary: {
            backgroundColor: theme.colors.primary.cat,
            borderColor: theme.colors.primary.cat,
            ...theme.shadows.soft,
        },
        secondary: {
            backgroundColor: theme.colors.backgrounds.cardSolid,
            borderColor: theme.colors.ui.borderStrong,
        },
        ghost: {
            backgroundColor: 'transparent' as const,
            borderColor: 'transparent',
        },
        sm: {
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            minHeight: 38,
        },
        md: {
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: 14,
            minHeight: 46,
        },
        lg: {
            paddingHorizontal: theme.spacing.xl,
            paddingVertical: theme.spacing.md,
            minHeight: 50,
        },
        disabled: {
            opacity: 0.5,
            backgroundColor: theme.colors.ui.disabled,
            borderColor: theme.colors.ui.disabled,
        },
    }), [theme]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.985);
        opacity.value = withSpring(0.92);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
        opacity.value = withSpring(1);
    };

    const iconColor = variant === 'primary' ? theme.colors.text.inverse : theme.colors.text.primary;
    const iconSize = size === 'lg' ? 24 : size === 'sm' ? 18 : 20;

    return (
        <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            disabled={disabled}
            style={[
                animatedStyle,
                styles.button,
                styles[variant],
                styles[size],
                disabled && styles.disabled,
                style,
            ]}
            {...props}
        >
            {Icon && <Icon size={iconSize} color={iconColor} strokeWidth={2.5} />}
            <Text
                size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
                weight="semibold"
                color={
                    variant === 'primary'
                        ? theme.colors.text.inverse
                        : variant === 'ghost'
                            ? theme.colors.text.secondary
                            : theme.colors.text.primary
                }
            >
                {label}
            </Text>
        </AnimatedPressable>
    );
};
