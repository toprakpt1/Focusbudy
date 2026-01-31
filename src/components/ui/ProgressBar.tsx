import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { THEME } from '../../constants/theme';

interface ProgressBarProps {
    progress: number; // 0-1
    color?: string;
    height?: number;
    animated?: boolean;
    style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = THEME.colors.primary.cat,
    height = 8,
    animated = true,
    style,
}) => {
    const width = useSharedValue(0);

    useEffect(() => {
        if (animated) {
            width.value = withSpring(progress, {
                damping: 15,
                stiffness: 100,
            });
        } else {
            width.value = withTiming(progress, { duration: 0 });
        }
    }, [progress, animated]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${width.value * 100}%`,
    }));

    return (
        <View style={[styles.container, { height }, style]}>
            <Animated.View
                style={[
                    styles.fill,
                    animatedStyle,
                    {
                        backgroundColor: color,
                        height,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: THEME.colors.ui.border,
        borderRadius: THEME.radius.full,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: THEME.radius.full,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
