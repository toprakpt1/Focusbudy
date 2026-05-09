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
            cat: '#C86B3C',
            dog: '#A95534',
            panda: '#7A3E28',
            fox: '#76513F',
            owl: '#6B637D',
            rabbit: '#D8956C',
        },
        backgrounds: {
            main: '#F6EEE2',
            card: 'rgba(235,223,208,0.92)',
            cardSolid: '#EBDFD0',
            subtle: '#E2D5C4',
            overlay: 'rgba(0,0,0,0.5)',
            focus: '#C9B79F',
        },
        text: {
            primary: '#241B15',
            secondary: '#5C4F45',
            inverse: '#FFF8F1',
            muted: '#76675C',
        },
        accents: {
            success: '#6F7B4B',
            warning: '#B55E3C',
            streak: '#D8BA83',
            xp: '#C86B3C',
        },
        ui: {
            border: 'rgba(36,27,21,0.12)',
            borderStrong: 'rgba(36,27,21,0.24)',
            shadow: '#000000',
            disabled: '#C9B79F',
        },
        glow: {
            primary: 'rgba(200,107,60,0.22)',
            streak: 'rgba(216,186,131,0.24)',
            xp: 'rgba(200,107,60,0.2)',
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
            shadowColor: '#C86B3C',
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
            cat: '#8DAA6D',
            dog: '#708B57',
            panda: '#556946',
            fox: '#A06C49',
            owl: '#8E86A3',
            rabbit: '#C38A5A',
        },
        backgrounds: {
            main: '#171614',
            card: 'rgba(31,29,26,0.94)',
            cardSolid: '#1F1D1A',
            subtle: '#292621',
            overlay: 'rgba(0,0,0,0.7)',
            focus: '#11100E',
        },
        text: {
            primary: '#F4F1EA',
            secondary: '#B8B0A4',
            inverse: '#171614',
            muted: '#948B7E',
        },
        accents: {
            success: '#8DAA6D',
            warning: '#C47452',
            streak: '#85725C',
            xp: '#C9A36D',
        },
        ui: {
            border: 'rgba(244,241,234,0.1)',
            borderStrong: 'rgba(244,241,234,0.18)',
            shadow: '#000000',
            disabled: '#35312B',
        },
        glow: {
            primary: 'rgba(141,170,109,0.18)',
            streak: 'rgba(133,114,92,0.22)',
            xp: 'rgba(201,163,109,0.18)',
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
            shadowColor: '#8DAA6D',
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
            cat: '#A55A2A',
            dog: '#C07A47',
            panda: '#D9C189',
            fox: '#6C8B67',
            owl: '#4E556B',
            rabbit: '#D6966B',
        },
        backgrounds: {
            main: '#FCFBF8',
            card: 'rgba(244,240,232,0.96)',
            cardSolid: '#F4F0E8',
            subtle: '#ECE7DD',
            overlay: 'rgba(0,0,0,0.4)',
            focus: '#E4DDD1',
        },
        text: {
            primary: '#201A17',
            secondary: '#62564E',
            inverse: '#FFFDFC',
            muted: '#7B6F66',
        },
        accents: {
            success: '#6C8B67',
            warning: '#B86F42',
            streak: '#C8B28A',
            xp: '#A55A2A',
        },
        ui: {
            border: 'rgba(32,26,23,0.1)',
            borderStrong: 'rgba(32,26,23,0.18)',
            shadow: '#000000',
            disabled: '#D9D1C5',
        },
        glow: {
            primary: 'rgba(165,90,42,0.14)',
            streak: 'rgba(200,178,138,0.18)',
            xp: 'rgba(165,90,42,0.14)',
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
            shadowColor: '#A55A2A',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.35,
            shadowRadius: 14,
            elevation: 8,
        },
    },
} as const;

export interface Theme {
    colors: {
        primary: { cat: string; dog: string; panda: string; fox: string; owl: string; rabbit: string };
        backgrounds: { main: string; card: string; cardSolid: string; subtle: string; overlay: string; focus: string };
        text: { primary: string; secondary: string; inverse: string; muted: string };
        accents: { success: string; warning: string; streak: string; xp: string };
        ui: { border: string; borderStrong: string; shadow: string; disabled: string };
        glow: { primary: string; streak: string; xp: string };
    };
    spacing: typeof spacing;
    radius: typeof radius;
    shadows: {
        soft: any;
        medium: any;
        strong: any;
        glow: any;
    };
}

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
