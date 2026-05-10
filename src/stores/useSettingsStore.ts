import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../translate/i18n';

export type Language = 'tr' | 'en';
export type FocusDuration = 0.16666666666666666 | 25 | 45 | 60;

interface SettingsStore {
    // Dil
    language: Language;
    setLanguage: (lang: Language) => void;

    // Ekran acik kalma
    keepScreenOn: boolean;
    setKeepScreenOn: (value: boolean) => void;

    // Bildirimler
    notificationsEnabled: boolean;
    setNotificationsEnabled: (value: boolean) => void;

    // Odaklanma suresi (dakika)
    focusDuration: FocusDuration;
    setFocusDuration: (duration: FocusDuration) => void;

    // Uygulama surumu
    appVersion: string;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            // Varsayilan degerler
            language: 'tr',
            keepScreenOn: true,
            notificationsEnabled: false,
            focusDuration: 25,
            appVersion: '1.0.0',

            // Actions
            setLanguage: (lang: Language) => {
                i18n.changeLanguage(lang);
                set({ language: lang });
            },
            setKeepScreenOn: (value: boolean) => set({ keepScreenOn: value }),
            setNotificationsEnabled: (value: boolean) => set({ notificationsEnabled: value }),
            setFocusDuration: (duration: FocusDuration) => set({ focusDuration: duration }),
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
