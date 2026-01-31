import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeId = 'default' | 'dark' | 'white';

interface ThemeStore {
    themeId: ThemeId;
    setTheme: (id: ThemeId) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            themeId: 'default',
            setTheme: (themeId) => set({ themeId }),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
