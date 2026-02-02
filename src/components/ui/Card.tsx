import React, { useMemo } from 'react';
import {
    View,
    ViewStyle,
    StyleProp,
    Pressable,
    PressableProps,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps extends Omit<PressableProps, 'style'> {
    children: React.ReactNode;
    selected?: boolean;
    style?: StyleProp<ViewStyle>;
    shadow?: 'soft' | 'medium' | 'strong';
}

export const Card: React.FC<CardProps> = ({
    children,
    selected = false,
    onPress,
    style,
    shadow = 'soft',
    ...props
}) => {
    const theme = useTheme();
    const scale = useSharedValue(1);

    const styles = useMemo(() => ({
        card: {
            backgroundColor: theme.colors.backgrounds.cardSolid,
            borderRadius: theme.radius.xl,
            padding: theme.spacing.lg,
            borderWidth: 1,
            borderColor: theme.colors.ui.border,
            overflow: 'hidden' as const,
            ...theme.shadows[shadow],
        },
        selected: {
            borderColor: theme.colors.primary.cat,
            borderWidth: 1.5,
            shadowColor: theme.colors.primary.cat,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
            elevation: 8,
        },
    }), [theme, shadow]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.98);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const { ...pressableProps } = props;

    return (
        <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            disabled={!onPress}
            style={[animatedStyle]}
            {...pressableProps}
        >
            <View
                style={[
                    styles.card,
                    selected && styles.selected,
                    style,
                ]}
            >
                {children}
            </View>
        </AnimatedPressable>
    );
};
