import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Switch,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { CustomText } from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';

const styles = StyleSheet.create({
  outer: {
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 10,
    fontWeight: '500',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

const SettingHeader = (props: { title: string | JSX.Element }) => {
  const { appTheme } = useContext(AppContext);
  const { title } = props;
  return (
    <CustomText style={[styles.header, { color: appTheme.lightText }]}>
      {title}
    </CustomText>
  );
};

interface CustomProps {
  title: string | JSX.Element;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: Function;
  value: any;
  isSwitch?: boolean;
  isSelected?: boolean;
}
const SettingRow = (props: CustomProps) => {
  const { appTheme } = useContext(AppContext);
  const {
    title,
    style,
    textStyle,
    onPress,
    value,
    isSwitch = false,
    isSelected = false,
  } = props;
  const { outer, icon } = styles;
  return (
    <Pressable
      onPress={() => onPress(value)}
      android_ripple={CommonStyle.androidRipple}>
      <View
        style={[
          outer,
          { backgroundColor: appTheme.card, borderColor: appTheme.border },
          style,
        ]}>
        <CustomText large style={[{ color: appTheme.text }, textStyle]}>
          {title}
        </CustomText>
        {(isSwitch && (
          <Switch onChange={() => onPress(value)} value={value} />
        )) ||
          null}
        {(isSelected && (
          <Image
            source={AppImages.tick}
            style={[icon, { tintColor: appTheme.themeColor }]}
          />
        )) ||
          null}
      </View>
    </Pressable>
  );
};

export { SettingRow, SettingHeader };
