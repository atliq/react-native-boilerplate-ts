import React, { useContext } from 'react';
import {
  StyleSheet,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '@Theme/CommonStyle';
import { CustomText } from '@CommonComponent';
import { AppContext } from '@AppContext';

const styles = StyleSheet.create({
  gradientBtn: {
    height: 56,
    paddingHorizontal: 25,
    minWidth: 100,
    borderWidth: 1,
    ...CommonStyle.center,
  },
  alignSelf: {
    alignSelf: 'center',
  },
  marginVertical: { marginVertical: 5 },
});

interface GradientButtonProps {
  title: string | JSX.Element;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isProcessing?: boolean;
  textOnly?: boolean;
  backColor?: string;
  colors?: (string | number)[];
  isGradient?: boolean;
  textColor?: string;
  borderRadius?: number;
  border?: string;
  outerStyle?: StyleProp<ViewStyle>;
}
const ButtonComponent = (props: GradientButtonProps) => {
  const {
    title,
    onPress,
    style,
    isProcessing = false,
    textOnly = false,
    backColor,
    colors,
    textColor,
    borderRadius = 10,
    border,
    outerStyle,
    isGradient = false,
  } = props;
  const { appTheme } = useContext(AppContext);
  const { gradientBtn, alignSelf, marginVertical } = styles;
  return (
    <Pressable
      onPress={() => onPress()}
      disabled={isProcessing}
      style={[marginVertical, outerStyle]}
      android_ripple={CommonStyle.androidRipple}>
      <LinearGradient
        colors={
          (!isGradient &&
            ((backColor && [backColor, backColor]) || [
              appTheme.themeColor,
              appTheme.themeColor,
            ])) ||
          (colors && colors) ||
          appTheme.gradient
        }
        style={[
          alignSelf,
          gradientBtn,
          {
            opacity: (isProcessing && 0.6) || 1,
            borderRadius: borderRadius,
            borderColor: border ?? appTheme.transparent,
          },
          CommonStyle.overFlowHidden,
          style,
        ]}>
        {((!isProcessing || textOnly) && (
          <CustomText large style={[{ color: textColor ?? appTheme.tint }]}>
            {title}
          </CustomText>
        )) || <ActivityIndicator color={appTheme.tint} />}
      </LinearGradient>
    </Pressable>
  );
};

export { ButtonComponent };
