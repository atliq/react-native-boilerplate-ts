import React, { useState } from 'react';
import { SafeAreaView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomText } from '@CommonComponent';
import { SettingHeader, SettingRow } from '@SubComponents';
import { CommonStyle } from '@Theme';
import { getVersionName, onLogout, ThemeEnums } from '@Utils';
import { useAppContext } from '@AppContext';

const Settings = () => {
  const { appTheme, setAppTheme } = useAppContext();
  const [darkMode, setDarkMode] = useState(appTheme.type === 'dark');
  const navigation = useNavigation();

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

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        { backgroundColor: appTheme.background },
      ]}
    >
      <SettingHeader title="THEME" />
      <SettingRow
        isSwitch={true}
        title="Dark Mode"
        onPress={onValueChange}
        value={darkMode}
      />

      <SettingRow
        title="Log out"
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

const styles = StyleSheet.create({
  versionText: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
