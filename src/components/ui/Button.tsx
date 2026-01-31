import React from 'react';
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
import { THEME } from '../../constants/theme';

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
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const { isSmall } = useScreenSize();

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
                        ? THEME.colors.text.inverse
                        : THEME.colors.text.primary
                }
            >
                {label}
            </Text>
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: THEME.radius.full,
        gap: THEME.spacing.sm,
    },
    primary: {
        backgroundColor: THEME.colors.primary.cat,
        ...THEME.shadows.medium,
    },
    secondary: {
        backgroundColor: THEME.colors.backgrounds.card,
        borderWidth: 2,
        borderColor: THEME.colors.ui.border,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    sm: {
        paddingHorizontal: THEME.spacing.md,
        paddingVertical: THEME.spacing.sm,
        minHeight: 36,
    },
    md: {
        paddingHorizontal: THEME.spacing.lg,
        paddingVertical: THEME.spacing.md,
        minHeight: 44,
    },
    lg: {
        paddingHorizontal: THEME.spacing.xl,
        paddingVertical: THEME.spacing.lg,
        minHeight: 52,
    },
    disabled: {
        opacity: 0.5,
        backgroundColor: THEME.colors.ui.disabled,
    },
});
