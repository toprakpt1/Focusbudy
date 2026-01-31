import { useThemeStore } from '../stores/useThemeStore';
import type { ThemeId } from '../stores/useThemeStore';

const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
} as const;

const radius = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    full: 9999,
} as const;

/** Default theme — renkli pastel (Color Hunt style) */
const defaultTheme = {
    colors: {
        primary: {
            cat: '#C4B5FD',   // Pastel purple
            dog: '#FDBA74',   // Pastel peach/orange
            panda: '#6EE7B7', // Pastel mint
            fox: '#F9A8D4',   // Pastel pink
        },
        backgrounds: {
            main: '#F5F3FF',
            card: 'rgba(255,255,255,0.9)',
            cardSolid: '#EDE9FE',
            overlay: 'rgba(0,0,0,0.5)',
            focus: '#E9E5FF',
        },
        text: {
            primary: '#1E1B4B',
            secondary: '#5B5488',
            inverse: '#F5F3FF',
            muted: '#7C7A9E',
        },
        accents: {
            success: '#34D399',
            warning: '#FBBF24',
            streak: '#FACC15',
            xp: '#38BDF8',
        },
        ui: {
            border: 'rgba(30,27,75,0.12)',
            borderStrong: 'rgba(30,27,75,0.2)',
            shadow: '#000000',
            disabled: '#C4C0D4',
        },
        glow: {
            primary: 'rgba(196,181,253,0.4)',
            streak: 'rgba(250,204,21,0.3)',
            xp: 'rgba(56,189,248,0.3)',
        },
    },
    spacing,
    radius,
    shadows: {
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 6,
        },
        strong: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 12,
        },
        glow: {
            shadowColor: '#C4B5FD',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.35,
            shadowRadius: 14,
            elevation: 8,
        },
    },
} as const;

/** Dark theme — koyu pastel (darker pastels on dark bg) */
const darkTheme = {
    colors: {
        primary: {
            cat: '#B8A9E9',   // Pastel lavender
            dog: '#E8B88C',   // Pastel peach
            panda: '#7EB89A', // Pastel sage
            fox: '#E8A0BF',   // Pastel rose
        },
        backgrounds: {
            main: '#1A1625',     // Deep pastel dark
            card: 'rgba(37,34,53,0.9)',
            cardSolid: '#252235',
            overlay: 'rgba(0,0,0,0.7)',
            focus: '#14121D',
        },
        text: {
            primary: '#F5F3FF',   // Açık metin (okunaklı)
            secondary: '#B8B0C9', // Pastel gri
            inverse: '#1A1625',
            muted: '#8B85A0',
        },
        accents: {
            success: '#7EB89A',
            warning: '#E8B88C',
            streak: '#E8D88C',
            xp: '#7EB8D8',
        },
        ui: {
            border: 'rgba(245,243,255,0.1)',
            borderStrong: 'rgba(245,243,255,0.18)',
            shadow: '#000000',
            disabled: '#4A4558',
        },
        glow: {
            primary: 'rgba(184,169,233,0.3)',
            streak: 'rgba(232,216,140,0.25)',
            xp: 'rgba(126,184,216,0.25)',
        },
    },
    spacing,
    radius,
    shadows: {
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 3,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
        },
        strong: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 20,
            elevation: 12,
        },
        glow: {
            shadowColor: '#A78BFA',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 8,
        },
    },
} as const;

/** Light theme — açık pastel (çok açık, yumuşak) */
const whiteTheme = {
    colors: {
        primary: {
            cat: '#C4B5FD',   // Açık pastel mor
            dog: '#FDBA74',   // Açık pastel şeftali
            panda: '#86EFAC', // Açık pastel nane
            fox: '#F9A8D4',   // Açık pastel pembe
        },
        backgrounds: {
            main: '#FFF8F5',     // Çok açık krem
            card: 'rgba(255,255,255,0.95)',
            cardSolid: '#FEF3E8',
            overlay: 'rgba(0,0,0,0.4)',
            focus: '#F5F0FF',
        },
        text: {
            primary: '#2D2A3D',
            secondary: '#6B6578',
            inverse: '#FFF8F5',
            muted: '#8B8598',
        },
        accents: {
            success: '#6EE7B7',
            warning: '#FCD34D',
            streak: '#FDE047',
            xp: '#7DD3FC',
        },
        ui: {
            border: 'rgba(45,42,61,0.12)',
            borderStrong: 'rgba(45,42,61,0.2)',
            shadow: '#000000',
            disabled: '#D1CBD8',
        },
        glow: {
            primary: 'rgba(196,181,253,0.3)',
            streak: 'rgba(253,224,71,0.25)',
            xp: 'rgba(125,211,252,0.25)',
        },
    },
    spacing,
    radius,
    shadows: {
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
        },
        strong: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 12,
        },
        glow: {
            shadowColor: '#7C3AED',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 14,
            elevation: 8,
        },
    },
} as const;

export type Theme = typeof defaultTheme;

export const THEMES: Record<ThemeId, Theme> = {
    default: defaultTheme,
    dark: darkTheme,
    white: whiteTheme,
};

export function getTheme(id: ThemeId): Theme {
    return THEMES[id];
}

/** Current theme from store — use in components for reactive theme. */
export function useTheme(): Theme {
    const themeId = useThemeStore((s) => s.themeId);
    return THEMES[themeId];
}

/** For non-reactive usage (e.g. static styles before store is ready). */
export const THEME = defaultTheme;
