import React from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomText, ConditionalRender } from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';
import { AppImages, CommonStyle } from '@Theme';
import { useAppContext } from '@AppContext';
import { width, getSize } from '@Utils';

interface NavigationBarProps {
  title?: string;
  titleNumberOfLines?: number;
  titleCenter?: boolean;
  titleTextStyle?: StyleProp<TextStyle>;
  titleMaxLength?: number;
  backgroundColor?: string;
  showBack?: boolean;
  exStyle?: StyleProp<ViewStyle>;
  paddingHorizontal?: number;
  submit?: {
    onSubmit?: () => void;
    isSubmitProcessing?: boolean;
    submitTitle?: string;
    submitBtnStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
    onSubmitBtnType?: 'btn' | 'img' | 'text' | 'custom';
    customSubmitComponent?: React.JSX.Element;
    submitImage?: string;
    submitImageStyle?: StyleProp<ImageStyle>;
  };
}

const NavigationBar = (props: NavigationBarProps) => {
  const { appTheme } = useAppContext();
  const navigation = useNavigation();

  const {
    title,
    titleMaxLength,
    titleNumberOfLines,
    titleTextStyle,
    backgroundColor,
    exStyle,
    titleCenter = false,
    showBack,
    paddingHorizontal = 0,
    submit,
  } = props;

  const {
    onSubmit,
    isSubmitProcessing = false,
    submitTitle = 'Submit',
    submitBtnStyle,
    onSubmitBtnType = 'btn',
    customSubmitComponent,
    submitImage,
    submitImageStyle,
  } = submit ?? {};

  const renderTitle = () => (
    <CustomText
      xlarge
      numberOfLines={titleNumberOfLines}
      maxLength={titleMaxLength}
      style={[
        styles.title,
        !titleCenter && showBack && styles.marginLeft,
        !titleCenter && CommonStyle.flex1,
        titleTextStyle,
      ]}
    >
      {title ?? ''}
    </CustomText>
  );

  const renderSubmit = () => {
    if (onSubmit) {
      switch (onSubmitBtnType) {
        case 'btn':
          return (
            <ButtonComponent
              onPress={onSubmit}
              title={submitTitle}
              style={[
                styles.submit,
                titleCenter && CommonStyle.alignSelfEnd,
                submitBtnStyle,
              ]}
              isProcessing={isSubmitProcessing}
              borderRadius={5}
            />
          );
        case 'custom':
          return (
            <View style={[titleCenter && CommonStyle.alignSelfEnd]}>
              {customSubmitComponent}
            </View>
          );
        case 'text':
          return (
            <CustomText
              onPress={onSubmit}
              style={[
                titleCenter && CommonStyle.alignSelfEnd,
                submitBtnStyle as StyleProp<TextStyle>,
              ]}
            >
              {submitTitle}
            </CustomText>
          );
        case 'img':
          return (
            <Pressable
              style={[
                titleCenter && CommonStyle.alignSelfEnd,
                submitBtnStyle as StyleProp<ViewStyle>,
              ]}
              onPress={onSubmit}
            >
              <Image
                resizeMode="contain"
                source={{ uri: submitImage }}
                style={[getSize(25), submitImageStyle]}
              />
            </Pressable>
          );
        default:
          return null;
      }
    } else if (onSubmitBtnType === 'custom') {
      return (
        <View style={[titleCenter && CommonStyle.alignSelfEnd]}>
          {customSubmitComponent}
        </View>
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal },
        { backgroundColor: backgroundColor ?? appTheme.background },
        exStyle,
      ]}
    >
      <ConditionalRender condition={!!showBack}>
        <Pressable
          style={styles.backBtn}
          android_ripple={CommonStyle.androidRipple}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={{ uri: AppImages.icBack }}
            style={[styles.icBack, { tintColor: appTheme.text }]}
            resizeMode="contain"
          />
        </Pressable>
      </ConditionalRender>
      <ConditionalRender condition={titleCenter} fallback={renderTitle()}>
        <View style={[styles.centerTitleView, { paddingHorizontal }]}>
          {renderTitle()}
        </View>
      </ConditionalRender>

      <ConditionalRender condition={titleCenter} fallback={renderSubmit()}>
        <View style={[CommonStyle.flex1]}>{renderSubmit()}</View>
      </ConditionalRender>
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
