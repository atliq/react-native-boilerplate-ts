import * as RNLocalize from 'react-native-localize';
import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '@Localization/en';
import { de } from '@Localization/de';
import { hi } from '@Localization/hi';
import { getItemFromStorage } from '@Utils';

export const APP_LANGUAGE = 'appLanguage';

const translationGetters: { [key: string]: () => any } = {
  en: () => en, // Adjust path as needed
  de: () => de,
  hi: () => hi,
  // Add other languages if necessary
};

const language = getItemFromStorage(APP_LANGUAGE);
const fallback = {
  languageTag: language
    ? language
    : (RNLocalize.findBestLanguageTag(Object.keys(translationGetters))
        ?.languageTag ?? 'en'),
};
const { languageTag } = fallback;

// Set translations and locale
I18n.use(initReactI18next).init({
  lng: languageTag, // if you're using a language detector, do not define the lng option
  debug: true,
  compatibilityJSON: 'v4', // <--- add this line
  fallbackLng: 'en',
  resources: {
    en: { translation: translationGetters.en() },
    de: { translation: translationGetters.de() },
    hi: { translation: translationGetters.hi() },
  },
});

export { I18n };
