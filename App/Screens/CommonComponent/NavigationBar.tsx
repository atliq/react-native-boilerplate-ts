import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import { CustomText } from '@CommonComponent/CustomText';
import { ButtonComponent } from '@SubComponents/index';
import { width } from '@Utils/Constant';

interface NavigationBarProps {
  title?: string;
  titleNumberOfLines?: number;
  titleCenter?: boolean;
  titleTextStyle?: StyleProp<TextStyle>;
  titleMaxLength?: number;
  onSubmit?: () => void;
  isProcessing?: boolean;
  submitTitle?: string;
  backgroundColor?: string;
  showBack?: boolean;
  exStyle?: StyleProp<ViewStyle>;
  paddingHorizontal?: number;
  submitBtnStyle?: StyleProp<ViewStyle>;
}

const NavigationBar = (props: NavigationBarProps) => {
  const { appTheme } = useContext(AppContext);
  const {
    title,
    onSubmit,
    isProcessing = false,
    submitTitle = 'Submit',
    titleMaxLength,
    titleNumberOfLines,
    titleTextStyle,
    backgroundColor,
    exStyle,
    titleCenter = false,
    showBack,
    paddingHorizontal = 0,
    submitBtnStyle,
  } = props;
  const navigation = useNavigation();

  const renderTitle = () => (
    <CustomText
      xlarge
      numberOfLines={titleNumberOfLines}
      maxLength={titleMaxLength}
      style={[
        styles.title,
        !titleCenter && showBack && styles.marginLeft,
        !titleCenter && CommonStyle.flex1,
        titleTextStyle && titleTextStyle,
      ]}>
      {title || ''}
    </CustomText>
  );

  const renderSubmit = () => (
    <ButtonComponent
      onPress={onSubmit}
      title={submitTitle}
      style={[
        styles.submit,
        titleCenter && CommonStyle.alignSelfEnd,
        submitBtnStyle,
      ]}
      isProcessing={isProcessing}
      borderRadius={5}
    />
  );

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal },
        { backgroundColor: backgroundColor || appTheme.background },
        exStyle && exStyle,
      ]}>
      {(showBack && (
        <Pressable
          style={styles.backBtn}
          android_ripple={CommonStyle.androidRipple}
          onPress={() => navigation.goBack()}>
          <Image
            source={{ uri: AppImages.icBack }}
            style={[styles.icBack, { tintColor: appTheme.text }]}
            resizeMode="contain"
          />
        </Pressable>
      )) ||
        null}
      {(titleCenter && (
        <View style={[styles.centerTitleView, { paddingHorizontal }]}>
          {renderTitle()}
        </View>
      )) ||
        renderTitle()}

      {(onSubmit &&
        ((titleCenter && (
          <View style={CommonStyle.flex1}>{renderSubmit()}</View>
        )) ||
          renderSubmit())) ||
        null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  marginLeft: {
    marginLeft: 15,
  },
  title: { fontWeight: 'bold' },
  icBack: {
    height: 20,
    width: 20,
  },
  backBtn: { paddingVertical: 5, zIndex: 1 },
  submit: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    minWidth: 50,
    zIndex: 1,
  },
  centerTitleView: {
    position: 'absolute',
    width,
    ...CommonStyle.center,
  },
});

export { NavigationBar };
