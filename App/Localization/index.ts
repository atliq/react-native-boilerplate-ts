import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';
import { en } from '@Localization/en';
import { de } from '@Localization/de';
import { hi } from '@Localization/hi';

export type Translation = {
  SETTINGS: string;
  LANGUAGE: string;
  THEME: string;
  DARK_MODE: string;
  SIGN_IN: string;
  LOG_OUT: string;
};

const translations = {
  en,
  de,
  hi,
};

export default new LocalizedStrings(translations);
