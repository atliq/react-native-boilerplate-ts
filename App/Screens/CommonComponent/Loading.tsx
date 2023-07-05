import React, { useContext } from 'react';
import {
  ActivityIndicator,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { AppContext } from '@AppContext';

interface LoadingProps {
  size?: ActivityIndicator['props']['size'];
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
}

const Loading = (props: LoadingProps) => {
  const { appTheme } = useContext(AppContext);

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
