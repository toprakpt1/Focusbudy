import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../constants/theme';

interface ProgressBarProps {
    progress: number; // 0-1
    color?: string;
    height?: number;
    animated?: boolean;
    style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color: colorProp,
    height = 8,
    animated = true,
    style,
}) => {
    const theme = useTheme();
    const color = colorProp ?? theme.colors.primary.cat;
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
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 9999,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: 9999,
        shadowColor: '#A78BFA',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
});
