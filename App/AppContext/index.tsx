/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import { AppThemeType, DEFAULT_THEME, Theme, ThemeType } from '@Theme';
import { setItemInStorage, getItemFromStorage } from '@Utils/Storage';

const APP_THEME = 'appTheme';

export interface AppContextInterface {
  appTheme: AppThemeType;
  initializeAppTheme: () => void;
  setAppTheme: (theme?: string) => void;
}

export const AppContext: Context<AppContextInterface> = createContext({
  appTheme: DEFAULT_THEME,
  initializeAppTheme: () => {},
  setAppTheme: () => {},
}) as any;

interface CustomProps {
  children: JSX.Element;
}
export const AppContextProvider = (props: CustomProps) => {
  const [appTheme, setAppTheme] = useState(DEFAULT_THEME);
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    setInitialLoad();
  });

  const setInitialLoad = async () => {
    if (isInit) {
      initializeAppTheme();
      setIsInit(false);
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
      appTheme: Theme[appTheme as keyof ThemeType],
      setAppTheme: setTheme,
      initializeAppTheme,
    }),
    [appTheme, setTheme, initializeAppTheme],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
