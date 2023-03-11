import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  Alert,
  DeviceEventEmitter,
  EmitterSubscription,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext';
import { userLogout } from '@Actions/UserActions';
import { SettingHeader, SettingRow } from '@SubComponents';
import { removeStoreItem } from '@Utils/Storage';
import { Route } from '@Routes/AppRoutes';
import { getVersionName, goToNextScreen } from '@Utils/Helper';
import { CustomText } from '@CommonComponent';
import { Authentication, ThemeEnums } from '@Utils/Enums';

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
  const { appTheme, setAppTheme, appLanguage, setAppLanguage, translations } =
    useContext(AppContext);
  const [darkMode, setDarkMode] = useState(appTheme.type === 'dark');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { versionText } = styles;

  let isLogout: EmitterSubscription | null = null;

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
          onPress: onLogout,
        },
      ],
      { cancelable: true },
    );
  };

  const onLogout = async () => {
    goToNextScreen(navigation, Route.LoginScreen);
    dispatch(userLogout());
    await removeStoreItem(Authentication.TOKEN);
  };

  const onSelectLanguage = (value?: any) => {
    setAppLanguage(value);
  };

  useEffect(() => {
    // getAppVersion();
    if (isLogout) {
      isLogout.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isLogout = DeviceEventEmitter.addListener(
      Authentication.REDIRECT_LOGIN,
      onLogout,
    );
  }, []);

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        { backgroundColor: appTheme.background },
      ]}>
      <SettingHeader title={translations.THEME} />
      <SettingRow
        isSwitch={true}
        title={translations.DARK_MODE}
        onPress={onValueChange}
        value={darkMode}
      />
      <SettingHeader title={translations.LANGUAGE} />
      {LANGUAGES.map(obj => {
        return (
          <SettingRow
            {...obj}
            onPress={onSelectLanguage}
            isSelected={appLanguage === obj.value}
            key={obj.value}
          />
        );
      })}
      <SettingRow
        title={translations.LOG_OUT}
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
