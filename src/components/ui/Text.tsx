import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '../../constants/typography';
import { useScreenSize } from '../../hooks/useScreenSize';
import { useTheme } from '../../constants/theme';

interface TextProps extends RNTextProps {
    size?: keyof typeof TYPOGRAPHY.fontSizes;
    weight?: keyof typeof TYPOGRAPHY.fontWeights;
    color?: string;
    align?: 'left' | 'center' | 'right';
    children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
    size = 'md',
    weight = 'regular',
    color,
    align = 'left',
    style,
    children,
    ...props
}) => {
    const theme = useTheme();
    const { scale } = useScreenSize();
    const textColor = color ?? theme.colors.text.primary;
    const fontSize = TYPOGRAPHY.fontSizes[size] * scale;
    const lineHeight = fontSize * TYPOGRAPHY.lineHeights.normal;
    
    return (
        <RNText
            style={[
                styles.base,
                {
                    fontSize,
                    lineHeight,
                    fontWeight: TYPOGRAPHY.fontWeights[weight],
                    textColor,
                    textAlign: align,
                },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

const styles = StyleSheet.create({
    base: {
        flexShrink: 0,
    },
});
