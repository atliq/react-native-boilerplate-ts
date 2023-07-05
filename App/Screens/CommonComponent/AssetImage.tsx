import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ImageStyle,
  Image,
  ImageProps,
} from 'react-native';

interface AssetImageProps {
  imageStyle?: StyleProp<ImageStyle> | StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle> | StyleProp<ImageStyle>;
  source: any;
  placeholder?: string;
  errorImage?: string;
  resizeMode?: ImageProps['resizeMode'];
}

const AssetImage = (props: AssetImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const renderPlaceholder = () => {
    if (props.placeholder) {
      return (
        <Image
          style={[styles.imageStyle, props.imageStyle as StyleProp<ImageStyle>]}
          source={{ uri: props.placeholder }}
        />
      );
    } else {
      return <ActivityIndicator />;
    }
  };

  const renderError = () => {
    if (props.errorImage) {
      return (
        <Image
          style={[styles.imageStyle, props.imageStyle as StyleProp<ImageStyle>]}
          source={{ uri: props.errorImage }}
        />
      );
    } else {
      return <ActivityIndicator />;
    }
  };

  const renderOverLayContainer = () => {
    if (isLoading || isError) {
      return (
        <View
          style={[
            styles.loadingContainer,
            props.imageStyle,
            props.containerStyle,
          ]}>
          {(isLoading && renderPlaceholder()) || renderError()}
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, props.imageStyle, props.containerStyle]}>
      <Image
        style={[styles.imageStyle, props.imageStyle as StyleProp<ImageStyle>]}
        source={{ uri: props.source }}
        resizeMode={props.resizeMode}
        onLoadStart={() => {
          setLoading(true);
          setError(false);
        }}
        onLoadEnd={() => {
          setLoading(false);
          setError(false);
        }}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
      {renderOverLayContainer()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 50, width: 50 },
  imageStyle: { height: 50, width: 50 },
  loadingContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { AssetImage };
