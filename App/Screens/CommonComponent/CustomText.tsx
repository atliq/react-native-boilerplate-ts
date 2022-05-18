import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { fontSizes } from '@Utils/Constant';
import { AppContext } from '@AppContext/index';

interface CustomProps {
  size?: number;
  small?: boolean;
  xsmall?: boolean;
  medium?: boolean;
  large?: boolean;
  xlarge?: boolean;
  xxlarge?: boolean;
  xxxlarge?: boolean;
  style?: StyleProp<TextStyle>;
  children: JSX.Element | string;
  numberOfLines?: number | undefined;
}
const CustomText = (props: CustomProps) => {
  const { appTheme } = useContext(AppContext);

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
    let fontSize = size || fontSizes.medium;
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

  return (
    <Text
      {...props}
      numberOfLines={numberOfLines}
      style={[getFontSize(), { color: appTheme.text }, style && style]}>
      {children}
    </Text>
  );
};

export { CustomText };
