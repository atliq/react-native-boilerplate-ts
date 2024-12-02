import React, { PropsWithChildren } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { fontSizes } from '@Utils';
import { useAppContext } from '@AppContext';

interface CustomProps extends TextProps {
  size?: number;
  small?: boolean;
  xsmall?: boolean;
  medium?: boolean;
  large?: boolean;
  xlarge?: boolean;
  xxlarge?: boolean;
  xxxlarge?: boolean;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: (event: GestureResponderEvent) => void;
  maxLength?: number;
}
const CustomText = (props: PropsWithChildren<CustomProps>) => {
  const { appTheme } = useAppContext();

  const {
    size,
    xsmall,
    small,
    large,
    xlarge,
    xxlarge,
    xxxlarge,
    style,
    children,
    numberOfLines = 0,
  } = props;

  const getFontSize = () => {
    let fontSize = size ?? fontSizes.medium;
    if (xsmall) {
      fontSize = fontSizes.xsmall;
    } else if (small) {
      fontSize = fontSizes.small;
    } else if (large) {
      fontSize = fontSizes.large;
    } else if (xxlarge) {
      fontSize = fontSizes.xxlarge;
    } else if (xlarge) {
      fontSize = fontSizes.xlarge;
    } else if (xxxlarge) {
      fontSize = fontSizes.xxxlarge;
    }
    return {
      fontSize,
    };
  };

  const renderChildren = () => {
    if (typeof children === 'string' && props.maxLength) {
      return (
        (children?.length < props.maxLength && `${children}`) ||
        `${children.substring(0, props.maxLength).trim()}...`
      );
    }
    return children;
  };

  return (
    <Text
      {...props}
      numberOfLines={numberOfLines}
      style={[getFontSize(), { color: appTheme.text }, style]}>
      {renderChildren()}
    </Text>
  );
};

export { CustomText };
