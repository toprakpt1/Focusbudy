export const TYPOGRAPHY = {
    fontSizes: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 18,
        xl: 22, // Further reduced for Android
        xxl: 28, // Further reduced for Android
        huge: 40, // Further reduced for Android
        timer: 56,  // Further reduced for Android
    },

    fontWeights: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },

    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.8,
    },

    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
        wider: 1,
    }
} as const;
