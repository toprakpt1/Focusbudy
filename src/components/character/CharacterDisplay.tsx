import React, { useEffect } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import type { CompanionType, CharacterMood } from '../../types';

interface CharacterDisplayProps {
    type: CompanionType;
    mood: CharacterMood;
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;
    style?: ViewStyle;
}

// Image mapping for character moods
const imageMap: Record<CompanionType, Record<CharacterMood, any>> = {
    cat: {
        idle: require('../../../assets/Images/cat-idle.png'),
        happy: require('../../../assets/Images/cat-happy.png'),
        sad: require('../../../assets/Images/cat-sad.png'),
        sleepy: require('../../../assets/Images/cat-sleppy.png'),
        focused: require('../../../assets/Images/cat-idle.png'), // fallback
        celebrating: require('../../../assets/Images/cat-happy.png'),
    },
    dog: {
        idle: require('../../../assets/Images/dog-idle.png'),
        happy: require('../../../assets/Images/dog-happy.png'),
        sad: require('../../../assets/Images/dog-sad.png'),
        sleepy: require('../../../assets/Images/dog-sleppy.png'),
        focused: require('../../../assets/Images/dog-idle.png'),
        celebrating: require('../../../assets/Images/dog-happy.png'),
    },
    panda: {
        idle: require('../../../assets/Images/panda-idle.png'),
        happy: require('../../../assets/Images/panda-happy.png'),
        sad: require('../../../assets/Images/panda-sad.png'),
        sleepy: require('../../../assets/Images/panda-sleppy.png'),
        focused: require('../../../assets/Images/panda-idle.png'),
        celebrating: require('../../../assets/Images/panda-happy.png'),
    },
    fox: {
        idle: require('../../../assets/Images/fox-idle.png'),
        happy: require('../../../assets/Images/fox-happy.png'),
        sad: require('../../../assets/Images/fox-sad.png'),
        sleepy: require('../../../assets/Images/fox-sleppy.png'),
        focused: require('../../../assets/Images/fox-idle.png'),
        celebrating: require('../../../assets/Images/fox-happy.png'),
    },
    owl: {
        idle: require('../../../assets/Images/owl-idle.png'),
        happy: require('../../../assets/Images/owl-happy.png'),
        sad: require('../../../assets/Images/owl-sad.png'),
        sleepy: require('../../../assets/Images/owl-sleppy.png'),
        focused: require('../../../assets/Images/owl-idle.png'),
        celebrating: require('../../../assets/Images/owl-happy.png'),
    },
    rabbit: {
        idle: require('../../../assets/Images/rabbit-idle.png'),
        happy: require('../../../assets/Images/rabbit-happy.png'),
        sad: require('../../../assets/Images/rabbit-sad.png'),
        sleepy: require('../../../assets/Images/rabbit-sleppy.png'),
        focused: require('../../../assets/Images/rabbit-idle.png'),
        celebrating: require('../../../assets/Images/rabbit-happy.png'),
    },
};

const sizeMap = {
    sm: 60,
    md: 120,
    lg: 200,
};

export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
    type,
    mood,
    size = 'md',
    animated = true,
    style,
}) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useEffect(() => {
        if (animated && mood === 'idle') {
            // Breathing animation
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.02, {
                        duration: 2000,
                        easing: Easing.inOut(Easing.ease),
                    }),
                    withTiming(1.0, {
                        duration: 2000,
                        easing: Easing.inOut(Easing.ease),
                    })
                ),
                -1,
                false
            );
        } else if (animated && mood === 'celebrating') {
            // Bounce animation
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.1, { duration: 300 }),
                    withTiming(1.0, { duration: 300 })
                ),
                3,
                false
            );
        } else {
            scale.value = withTiming(1);
        }
    }, [mood, animated]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const imageSource = imageMap[type]?.[mood] || imageMap.cat.idle;
    const imageSize = sizeMap[size];

    return (
        <Animated.View style={[animatedStyle, { width: imageSize, height: imageSize }, style]}>
            <Image
                source={imageSource}
                style={[
                    styles.image,
                    {
                        width: imageSize,
                        height: imageSize,
                    },
                ]}
                resizeMode="contain"
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
});
