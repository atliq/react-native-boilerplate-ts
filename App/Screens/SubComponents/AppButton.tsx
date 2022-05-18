import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomText } from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    ...CommonStyle.center,
    marginVertical: 5,
    minWidth: 100,
  },
  gradientBtn: {
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 25,
    minWidth: 160,
    ...CommonStyle.center,
  },
  alignSelf: {
    alignSelf: 'center',
  },
  overFlowHidden: { overflow: 'hidden' },
  pressableContainer: {
    overflow: 'hidden',
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

interface GradientButtonProps {
  title: string | JSX.Element;
  onPress: Function;
  exStyle?: StyleProp<ViewStyle>;
  isProcessing?: boolean;
  textOnly?: boolean;
}
const GradientButton = (props: GradientButtonProps) => {
  const {
    title,
    onPress,
    exStyle,
    isProcessing = false,
    textOnly = false,
  } = props;
  const { appTheme } = useContext(AppContext);
  const { gradientBtn, alignSelf } = styles;
  return (
    <View
      style={[
        CommonStyle.shadow,
        alignSelf,
        { opacity: (isProcessing && 0.6) || 1 },
        styles.overFlowHidden,
        exStyle && exStyle,
      ]}>
      <Pressable
        onPress={() => onPress()}
        disabled={isProcessing}
        style={styles.overFlowHidden}
        android_ripple={CommonStyle.androidRipple}>
        <LinearGradient colors={appTheme.gradient} style={gradientBtn}>
          {((!isProcessing || textOnly) && (
            <CustomText large style={[{ color: appTheme.tint }]}>
              {title}
            </CustomText>
          )) || <ActivityIndicator color={appTheme.tint} />}
        </LinearGradient>
      </Pressable>
    </View>
  );
};

interface ButtonComponentProps {
  title: string | JSX.Element;
  onPress?: Function;
  style?: StyleProp<ViewStyle>;
  border?: string;
  backColor?: string;
  textColor?: string;
  isProcessing?: boolean;
  icon?: string;
  borderRadius?: number;
}
const ButtonComponent = (props: ButtonComponentProps) => {
  const {
    title,
    onPress,
    style,
    border,
    backColor,
    textColor,
    isProcessing,
    borderRadius = 10,
  } = props;
  const { outer } = styles;
  const { appTheme } = useContext(AppContext);
  return (
    <View style={styles.pressableContainer}>
      <Pressable
        onPress={() => onPress!()}
        disabled={isProcessing}
        android_ripple={CommonStyle.androidRipple}
        style={[
          outer,
          {
            backgroundColor: backColor || appTheme.themeColor,
            borderColor: border || appTheme.border,
            borderRadius: borderRadius,
            overflow: 'hidden',
          },
          style,
        ]}>
        {(!isProcessing && (
          <CustomText large style={{ color: textColor || appTheme.tint }}>
            {title}
          </CustomText>
        )) || <ActivityIndicator color={textColor || appTheme.tint} />}
      </Pressable>
    </View>
  );
};

export { GradientButton, ButtonComponent };
