/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Context,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import { omit } from 'lodash';
import * as RNLocalize from 'react-native-localize';
import translations, { DEFAULT_LANGUAGE, Translation } from '@Localization';
import { AppThemeType, DEFAULT_THEME, Theme, ThemeType } from '@Theme';
import { setItemInStorage, getItemFromStorage } from '@Utils/Storage';

const APP_LANGUAGE = 'appLanguage';
const APP_THEME = 'appTheme';

export interface AppContextInterface {
  translations: Translation;
  setAppLanguage: (language: string) => void;
  appLanguage: string;
  initializeAppLanguage: () => void;
  appTheme: AppThemeType;
  initializeAppTheme: () => void;
  setAppTheme: (theme?: string) => void;
}

export const AppContext: Context<AppContextInterface> = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
  appTheme: DEFAULT_THEME,
  initializeAppTheme: () => {},
  setAppTheme: () => {},
}) as any;

interface CustomProps {
  children: JSX.Element;
}
export const AppContextProvider = (props: CustomProps) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);
  const [appTheme, setAppTheme] = useState(DEFAULT_THEME);
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    setInitialLoad();
  });

  const setInitialLoad = async () => {
    if (isInit) {
      initializeAppTheme();
      initializeAppLanguage();
      setIsInit(false);
    }
  };

  const setLanguage = (language?: string) => {
    translations.setLanguage(language!);
    setAppLanguage(language!);
    setItemInStorage(APP_LANGUAGE, language!);
  };

  const initializeAppLanguage = (languageCode = null) => {
    const currentLanguage = getItemFromStorage(APP_LANGUAGE);
    if (!currentLanguage && !languageCode) {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    } else {
      if (languageCode) {
        setLanguage(languageCode);
        setItemInStorage(APP_LANGUAGE, languageCode);
      } else {
        setLanguage(currentLanguage!);
      }
    }
  };

  const setTheme = (theme?: string) => {
    setAppTheme(theme!);
    setItemInStorage(APP_THEME, theme!);
  };

  const initializeAppTheme = (themeType?: string) => {
    const currentTheme = getItemFromStorage(APP_THEME);
    if (!currentTheme && !themeType) {
      const colorScheme = Appearance.getColorScheme();
      setAppTheme(colorScheme ?? DEFAULT_THEME);
    } else {
      if (themeType) {
        setAppTheme(themeType);
        setItemInStorage(APP_THEME, themeType);
      } else {
        setAppTheme(currentTheme!);
      }
    }
  };

  const value = useMemo(
    () => ({
      translations: omit(translations, ['_props', '_opts']) as Translation,
      setAppLanguage: setLanguage,
      appLanguage,
      initializeAppLanguage,
      appTheme: Theme[appTheme as keyof ThemeType],
      setAppTheme: setTheme,
      initializeAppTheme,
    }),
    [appLanguage, appTheme],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
