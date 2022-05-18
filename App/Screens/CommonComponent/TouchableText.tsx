import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { CustomText } from '@CommonComponent/index';

interface TouchableTextProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  btnStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  rightIcon?: {
    uri: string;
    style?: StyleProp<ViewStyle>;
  };
}

const TouchableText = (props: TouchableTextProps) => {
  const { onPress, text, style } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, props.btnStyle]}
      onPress={onPress}>
      <CustomText style={style}>{text}</CustomText>
      {props.rightIcon && (
        <View style={[styles.imageContainer, props.rightIcon.style]}>
          <Image source={{ uri: props.rightIcon.uri }} style={styles.image} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: { width: 8, height: 8, marginLeft: 3 },
  image: { width: '100%', height: '100%' },
});

export { TouchableText };
