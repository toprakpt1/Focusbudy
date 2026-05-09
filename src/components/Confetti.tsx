import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const COLORS = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#FF8A80',
    '#82B1FF',
    '#B9F6CA',
    '#FFD180',
    '#A7FFEB',
];

interface ParticleData {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
    size: number;
    delay: number;
    duration: number;
    rotation: number;
}

function createParticles(count: number): ParticleData[] {
    return Array.from({ length: count }).map((_, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        return {
            id: i,
            startX: side === 'left' ? -20 : width + 20,
            startY: Math.random() * height * 0.4 + 60,
            endX:
                side === 'left'
                    ? Math.random() * width * 0.5 + 20
                    : Math.random() * width * 0.5 + width * 0.3,
            endY: Math.random() * height * 0.5 + height * 0.2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            size: Math.random() * 7 + 4,
            delay: Math.random() * 500,
            duration: Math.random() * 1400 + 1200,
            rotation: Math.random() * 1080 - 540,
        };
    });
}

function ConfettiPiece(particle: ParticleData) {
    const x = useSharedValue(particle.startX);
    const y = useSharedValue(particle.startY);
    const rotate = useSharedValue(0);
    const opacity = useSharedValue(1);

    useEffect(() => {
        x.value = withDelay(
            particle.delay,
            withTiming(particle.endX, { duration: particle.duration })
        );
        y.value = withDelay(
            particle.delay,
            withTiming(particle.endY, { duration: particle.duration })
        );
        rotate.value = withDelay(
            particle.delay,
            withTiming(particle.rotation, { duration: particle.duration })
        );
        opacity.value = withDelay(
            particle.delay + particle.duration * 0.6,
            withTiming(0, { duration: particle.duration * 0.4 })
        );
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [
            { translateX: x.value },
            { translateY: y.value },
            { rotate: `${rotate.value}deg` },
        ],
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                style,
                {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: particle.size,
                    height: particle.size * (Math.random() > 0.5 ? 0.5 : 1.2),
                    backgroundColor: particle.color,
                    borderRadius: 2,
                },
            ]}
        />
    );
}

export default function Confetti({ count = 50 }: { count?: number }) {
    const particles = React.useMemo(() => createParticles(count), [count]);

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {particles.map((p) => (
                <ConfettiPiece key={p.id} {...p} />
            ))}
        </View>
    );
}
