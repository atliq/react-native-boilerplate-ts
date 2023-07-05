import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { CustomText, Loading } from '@CommonComponent';
import CommonStyle from '@Theme/CommonStyle';

interface CustomProps {
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}
const EmptyComponent = (props: CustomProps) => {
  const { isLoading = false, textStyle, style } = props;
  const text = props.text ?? 'No Data Found';
  return (
    <View style={[CommonStyle.flex1, CommonStyle.center, style]}>
      {(!isLoading && <CustomText style={textStyle}>{text}</CustomText>) || (
        <Loading />
      )}
    </View>
  );
};

export { EmptyComponent };
