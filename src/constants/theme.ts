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

/** Default theme — pastel, soft colors (default) */
const defaultTheme = {
    colors: {
        primary: {
            cat: '#C4B5FD',   // Pastel purple
            dog: '#FDBA74',   // Pastel orange
            panda: '#6EE7B7', // Pastel mint
            fox: '#F9A8D4',   // Pastel pink
        },
        backgrounds: {
            main: '#F5F3FF',      // Very light lavender
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

/** Dark theme */
const darkTheme = {
    colors: {
        primary: {
            cat: '#A78BFA',
            dog: '#FB923C',
            panda: '#34D399',
            fox: '#F472B6',
        },
        backgrounds: {
            main: '#0C0A14',
            card: 'rgba(30,27,45,0.85)',
            cardSolid: '#1E1B2D',
            overlay: 'rgba(0,0,0,0.7)',
            focus: '#08060C',
        },
        text: {
            primary: '#FAFAFA',
            secondary: '#A1A1AA',
            inverse: '#0C0A14',
            muted: '#71717A',
        },
        accents: {
            success: '#22C55E',
            warning: '#F59E0B',
            streak: '#EAB308',
            xp: '#0EA5E9',
        },
        ui: {
            border: 'rgba(255,255,255,0.08)',
            borderStrong: 'rgba(255,255,255,0.12)',
            shadow: '#000000',
            disabled: '#3F3F46',
        },
        glow: {
            primary: 'rgba(167,139,250,0.35)',
            streak: 'rgba(234,179,8,0.25)',
            xp: 'rgba(14,165,233,0.25)',
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

/** White / light theme — clean white */
const whiteTheme = {
    colors: {
        primary: {
            cat: '#7C3AED',
            dog: '#EA580C',
            panda: '#059669',
            fox: '#DB2777',
        },
        backgrounds: {
            main: '#FFFFFF',
            card: 'rgba(255,255,255,0.95)',
            cardSolid: '#F8FAFC',
            overlay: 'rgba(0,0,0,0.5)',
            focus: '#F1F5F9',
        },
        text: {
            primary: '#0F172A',
            secondary: '#64748B',
            inverse: '#FFFFFF',
            muted: '#94A3B8',
        },
        accents: {
            success: '#10B981',
            warning: '#F59E0B',
            streak: '#EAB308',
            xp: '#0284C7',
        },
        ui: {
            border: '#E2E8F0',
            borderStrong: '#CBD5E1',
            shadow: '#000000',
            disabled: '#CBD5E1',
        },
        glow: {
            primary: 'rgba(124,58,237,0.25)',
            streak: 'rgba(234,179,8,0.2)',
            xp: 'rgba(2,132,199,0.2)',
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
