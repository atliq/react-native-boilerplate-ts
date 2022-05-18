import React, { useContext } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { AppContext } from '@AppContext/index';

interface LoadingProps {
  size?: number | 'small' | 'large' | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  color?: string | undefined;
}

const Loading = (props: LoadingProps) => {
  const { appTheme } = useContext(AppContext);

  const { size, style, color } = props;

  return (
    <ActivityIndicator
      size={size}
      style={style}
      color={(color && color) || appTheme.themeColor}
    />
  );
};

export { Loading };
