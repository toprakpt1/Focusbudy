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
    icon?: React.ReactNode;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    icon,
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
            borderRadius: theme.radius.lg,
            gap: theme.spacing.sm,
        },
        primary: {
            backgroundColor: theme.colors.primary.cat,
            ...theme.shadows.medium,
            shadowColor: theme.colors.primary.cat,
            shadowOpacity: 0.35,
            shadowRadius: 14,
        },
        secondary: {
            backgroundColor: theme.colors.backgrounds.cardSolid,
            borderWidth: 1,
            borderColor: theme.colors.ui.borderStrong,
        },
        ghost: {
            backgroundColor: 'transparent' as const,
        },
        sm: {
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            minHeight: 36,
        },
        md: {
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            minHeight: 44,
        },
        lg: {
            paddingHorizontal: theme.spacing.xl,
            paddingVertical: theme.spacing.lg,
            minHeight: 52,
        },
        disabled: {
            opacity: 0.5,
            backgroundColor: theme.colors.ui.disabled,
        },
    }), [theme]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.96);
        opacity.value = withSpring(0.8);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
        opacity.value = withSpring(1);
    };

    // Separate custom props from standard Pressable props
    const { ...pressableProps } = props;

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
            {...pressableProps}
        >
            {icon}
            <Text
                size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
                weight="semibold"
                color={
                    variant === 'primary'
                        ? theme.colors.text.inverse
                        : theme.colors.text.primary
                }
            >
                {label}
            </Text>
        </AnimatedPressable>
    );
};
