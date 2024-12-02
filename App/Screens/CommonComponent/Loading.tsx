import React from 'react';
import {
  ActivityIndicator,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useAppContext } from '@AppContext';

interface LoadingProps {
  size?: ActivityIndicator['props']['size'];
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
}

const Loading = (props: LoadingProps) => {
  const { appTheme } = useAppContext();

  const { size, style, color } = props;

  return (
    <ActivityIndicator
      size={size}
      style={style}
      color={color ?? appTheme.themeColor}
    />
  );
};

export { Loading };
