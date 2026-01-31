export const THEME = {
    // Modern Dark Aesthetic - Magic Dev Inspired
    colors: {
        primary: {
            cat: '#D8B4FE',      // Pastel Purple
            dog: '#FDBA74',      // Pastel Orange
            panda: '#6EE7B7',    // Pastel Green
            fox: '#FDA4AF',      // Pastel Pink
        },
        backgrounds: {
            main: '#0F172A',     // Slate 900 (Deep Dark)
            card: '#1E293B',     // Slate 800 (Lighter Dark)
            overlay: 'rgba(0,0,0,0.7)',
            focus: '#020617',    // Slate 950 (Focus Mode)
        },
        text: {
            primary: '#F8FAFC',  // Slate 50
            secondary: '#94A3B8', // Slate 400
            inverse: '#0F172A',
            muted: '#64748B',
        },
        accents: {
            success: '#34D399',
            warning: '#FB923C',
            streak: '#FACC15',
            xp: '#38BDF8',
        },
        ui: {
            border: '#334155',
            shadow: '#000000',
            disabled: '#334155',
        }
    },

    // Spacing scale
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
        xxxl: 64,
    },

    // Modern rounded aesthetics
    radius: {
        xs: 6,
        sm: 10,
        md: 18,
        lg: 26,
        xl: 34,
        full: 9999,
    },

    // Deep modern shadows
    shadows: {
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 4,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 15,
            elevation: 8,
        },
        strong: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            elevation: 12,
        }
    }
} as const;
