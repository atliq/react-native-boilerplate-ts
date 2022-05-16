import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ImageStyle,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';

interface NetworkImageProps {
  imageStyle?: StyleProp<ImageStyle> | any;
  containerStyle?: StyleProp<ViewStyle> | any;
  source: any;
  showLoading?: boolean;
  placeholder?: string;
  errorImage?: string;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat' | any;
}

const NetworkImage = (props: NetworkImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const renderPlaceholder = () => {
    if (props.placeholder) {
      return (
        <Image
          style={[styles.imageStyle, props.imageStyle]}
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
        <FastImage
          style={[styles.imageStyle, props.imageStyle]}
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
      <FastImage
        style={[styles.imageStyle, props.imageStyle]}
        source={{
          uri: props.source,
        }}
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
  container: { height: 100, width: 100 },
  imageStyle: { height: 100, width: 100 },
  loadingContainer: {
    position: 'absolute',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { NetworkImage };
