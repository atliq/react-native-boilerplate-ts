import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';
import { en } from '@Localization/en';
import { de } from '@Localization/de';
import { hi } from '@Localization/hi';

const translations = {
  en,
  de,
  hi,
};

export default new LocalizedStrings(translations);
