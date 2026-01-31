import React from 'react';
import {
    View,
    ViewStyle,
    StyleSheet,
    Pressable,
    PressableProps,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { THEME } from '../../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps extends Omit<PressableProps, 'style'> {
    children: React.ReactNode;
    selected?: boolean;
    style?: ViewStyle;
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
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.98);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    // Remove custom props that shouldn't go to Pressable
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
                    THEME.shadows[shadow],
                    selected && styles.selected,
                    style,
                ]}
            >
                {children}
            </View>
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: THEME.colors.backgrounds.card,
        borderRadius: THEME.radius.lg,
        padding: THEME.spacing.lg,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selected: {
        borderColor: THEME.colors.primary.cat,
        shadowColor: THEME.colors.primary.cat,
        shadowOpacity: 0.3,
    },
});
