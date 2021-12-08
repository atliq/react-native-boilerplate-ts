import React, {Context, createContext, useEffect, useState} from 'react';
import translations, {DEFAULT_LANGUAGE} from '../Localization';
import * as RNLocalize from 'react-native-localize';
import {DEFAULT_THEME, Theme, ThemeType} from '../Theme';
import {setItemInStorage, getItemFromStorage} from '../Utils/Storage';
import {Appearance} from 'react-native';
import {omit} from 'lodash';
import {LocalizedStrings} from 'react-native-localization';

const APP_LANGUAGE = 'appLanguage';
const APP_THEME = 'appTheme';

// KEPT ANY FOR NOW
export const AppContext: any = createContext({
  translations,
  setAppLanguage: () => void,
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => void,
  appTheme: DEFAULT_THEME,
  initializeAppTheme: () => void,
  setAppTheme: () => void,
});
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
      await initializeAppTheme();
      await initializeAppLanguage();
      setIsInit(false);
    }
  };

  const setLanguage = (language?: string) => {
    translations.setLanguage(language!);
    setAppLanguage(language!);
    setItemInStorage(APP_LANGUAGE, language!);
  };

  const initializeAppLanguage = async (languageCode = null) => {
    const currentLanguage = await getItemFromStorage(APP_LANGUAGE);
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

  const initializeAppTheme = async (themeType?: string) => {
    const currentTheme = await getItemFromStorage(APP_THEME);
    if (!currentTheme && !themeType) {
      const colorScheme = Appearance.getColorScheme();
      setAppTheme((colorScheme && colorScheme) || DEFAULT_THEME);
    } else {
      if (themeType) {
        setAppTheme(themeType);
        setItemInStorage(APP_THEME, themeType);
      } else {
        setAppTheme(currentTheme!);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        translations: omit(translations, ['_props', '_opts']),
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
        appTheme: Theme[appTheme as keyof ThemeType],
        setAppTheme: setTheme,
        initializeAppTheme,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
