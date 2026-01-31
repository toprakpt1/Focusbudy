import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '../../constants/typography';
import { useScreenSize } from '../../hooks/useScreenSize';
import { THEME } from '../../constants/theme';

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
    color = THEME.colors.text.primary,
    align = 'left',
    style,
    children,
    ...props
}) => {
    const { scale } = useScreenSize();
    
    const fontSize = TYPOGRAPHY.fontSizes[size] * scale;
    
    return (
        <RNText
            style={[
                styles.base,
                {
                    fontSize,
                    fontWeight: TYPOGRAPHY.fontWeights[weight],
                    color,
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
        lineHeight: TYPOGRAPHY.lineHeights.normal * TYPOGRAPHY.fontSizes.md,
    },
});
