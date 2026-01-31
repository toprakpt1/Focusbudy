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

/** Default theme — primary-100/200/300, accent, bg-100/200/300 */
const defaultTheme = {
    colors: {
        primary: {
            cat: '#FF7F50',   // primary-100
            dog: '#dd6236',   // primary-200
            panda: '#8f1e00', // primary-300
            fox: '#8B4513',   // accent-100
        },
        backgrounds: {
            main: '#F7EEDD',     // bg-100
            card: 'rgba(237,228,211,0.9)',  // bg-200
            cardSolid: '#ede4d3',           // bg-200
            overlay: 'rgba(0,0,0,0.5)',
            focus: '#c4bcaa',   // bg-300 (c4bca → c4bcaa)
        },
        text: {
            primary: '#000000',   // text-100
            secondary: '#2c2c2c', // text-200
            inverse: '#F7EEDD',   // okunaklı buton metni
            muted: '#2c2c2c',
        },
        accents: {
            success: '#8B4513',
            warning: '#dd6236',
            streak: '#ffd299',   // accent-200
            xp: '#FF7F50',
        },
        ui: {
            border: 'rgba(0,0,0,0.12)',
            borderStrong: 'rgba(0,0,0,0.2)',
            shadow: '#000000',
            disabled: '#c4bcaa',
        },
        glow: {
            primary: 'rgba(255,127,80,0.4)',
            streak: 'rgba(255,210,153,0.3)',
            xp: 'rgba(255,127,80,0.3)',
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
            shadowColor: '#FF7F50',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.35,
            shadowRadius: 14,
            elevation: 8,
        },
    },
} as const;

/** Dark theme — primary-100/200/300, accent, bg-100/200/300 */
const darkTheme = {
    colors: {
        primary: {
            cat: '#0D6E6E',   // primary-100
            dog: '#4a9d9c',   // primary-200
            panda: '#afffff', // primary-300
            fox: '#FF3D3D',   // accent-100
        },
        backgrounds: {
            main: '#0D1F2D',     // bg-100
            card: 'rgba(29,46,61,0.9)',   // bg-200
            cardSolid: '#1d2e3d',         // bg-200
            overlay: 'rgba(0,0,0,0.7)',
            focus: '#354656',   // bg-300
        },
        text: {
            primary: '#FFFFFF',   // text-100
            secondary: '#e0e0e0', // text-200
            inverse: '#0D1F2D',
            muted: '#e0e0e0',
        },
        accents: {
            success: '#4a9d9c',
            warning: '#FF3D3D',
            streak: '#ffe0c8',   // accent-200
            xp: '#afffff',
        },
        ui: {
            border: 'rgba(255,255,255,0.1)',
            borderStrong: 'rgba(255,255,255,0.18)',
            shadow: '#000000',
            disabled: '#354656',
        },
        glow: {
            primary: 'rgba(13,110,110,0.4)',
            streak: 'rgba(255,224,200,0.25)',
            xp: 'rgba(175,255,255,0.3)',
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
            shadowColor: '#0D6E6E',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 8,
        },
    },
} as const;

/** Light theme — primary-100/200/300, accent, bg-100/200/300 */
const whiteTheme = {
    colors: {
        primary: {
            cat: '#FF6600',   // primary-100
            dog: '#ff983f',   // primary-200
            panda: '#ffffa1', // primary-300
            fox: '#F5F5F5',   // accent-100
        },
        backgrounds: {
            main: '#ffffff',     // bg-100
            card: 'rgba(245,245,245,0.95)', // bg-200
            cardSolid: '#f5f5f5',           // bg-200
            overlay: 'rgba(0,0,0,0.4)',
            focus: '#cccccc',   // bg-300
        },
        text: {
            primary: '#1d1f21',   // text-100
            secondary: '#444648',  // text-200
            inverse: '#ffffff',   // buton metni (turuncu üzerinde)
            muted: '#444648',
        },
        accents: {
            success: '#ff983f',
            warning: '#929292',
            streak: '#929292',   // accent-200
            xp: '#FF6600',
        },
        ui: {
            border: 'rgba(29,31,33,0.12)',
            borderStrong: 'rgba(29,31,33,0.2)',
            shadow: '#000000',
            disabled: '#cccccc',
        },
        glow: {
            primary: 'rgba(255,102,0,0.35)',
            streak: 'rgba(146,146,146,0.25)',
            xp: 'rgba(255,102,0,0.3)',
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
            shadowColor: '#FF6600',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.35,
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
