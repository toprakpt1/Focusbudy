import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './en.json';
import tr from './tr.json';

const resources = {
    en: { translation: en },
    tr: { translation: tr },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: Localization.getLocales()[0]?.languageCode ?? 'tr',
        fallbackLng: 'tr',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
