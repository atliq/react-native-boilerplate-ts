import React, { useState } from 'react';
import { SafeAreaView, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { CommonStyle } from '@Theme';
import { CustomText } from '@CommonComponent';
import { SettingHeader, SettingRow } from '@SubComponents';
import { getVersionName, onLogout, setItemInStorage, ThemeEnums } from '@Utils';
import { useAppContext } from '@AppContext';
import { APP_LANGUAGE, I18n as i18n } from '@Localization';

const LANGUAGES = [
  { title: 'Hindi', value: 'hi' },
  { title: 'English', value: 'en' },
  { title: 'German', value: 'de' },
];

const styles = StyleSheet.create({
  versionText: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

const Settings = () => {
  const { appTheme, setAppTheme } = useAppContext();
  const [darkMode, setDarkMode] = useState(appTheme.type === 'dark');
  const navigation = useNavigation();
  const { i18n: I18n } = useTranslation();

  const { versionText } = styles;

  const onValueChange = () => {
    setAppTheme((!darkMode && ThemeEnums.DARK) || ThemeEnums.LIGHT);
    setDarkMode(!darkMode);
  };

  const logout = () => {
    Alert.alert(
      '',
      'Do you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => onLogout(navigation),
        },
      ],
      { cancelable: true },
    );
  };

  const onSelectLanguage = (value?: any) => {
    I18n.changeLanguage(value);
    setItemInStorage(APP_LANGUAGE, value);
  };

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        { backgroundColor: appTheme.background },
      ]}>
      <SettingHeader title={i18n.t('THEME')} />
      <SettingRow
        isSwitch={true}
        title={i18n.t('DARK_MODE')}
        onPress={onValueChange}
        value={darkMode}
      />
      <SettingHeader title={i18n.t('LANGUAGE')} />
      {LANGUAGES.map(obj => {
        return (
          <SettingRow
            {...obj}
            onPress={onSelectLanguage}
            isSelected={i18n.resolvedLanguage === obj.value}
            key={obj.value}
          />
        );
      })}
      <SettingRow
        title={i18n.t('LOG_OUT')}
        onPress={logout}
        value={darkMode}
        textStyle={{ color: appTheme.red }}
      />
      <CustomText xlarge style={[versionText, { color: appTheme.text }]}>
        {getVersionName()}
      </CustomText>
    </SafeAreaView>
  );
};

export default Settings;
