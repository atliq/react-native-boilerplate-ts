import LightTheme from '@Theme/LightTheme';
import DarkTheme from '@Theme/DarkTheme';
export const DEFAULT_THEME = 'light';

export interface ThemeType {
  light: typeof LightTheme;
  dark: typeof DarkTheme;
}

export const Theme: ThemeType = {
  light: LightTheme,
  dark: DarkTheme,
};
