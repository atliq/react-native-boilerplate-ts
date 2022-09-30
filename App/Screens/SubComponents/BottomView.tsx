import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextProps,
} from 'react-native';
import { CustomText } from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';

const styles = StyleSheet.create({
  outer: {
    ...CommonStyle.flexContainer,
    justifyContent: 'flex-end',
    marginBottom: 30,
    alignSelf: 'center',
  },
  flexDirection: {
    flexDirection: 'row',
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  padding: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
  },
  space: { padding: 5 },
});

interface BottomViewProps {
  title: string | JSX.Element;
  subTitle: string | JSX.Element;
  onSubTitle: Function;
  exStyle?: StyleProp<ViewStyle>;
  exTextStyle?: StyleProp<TextProps>;
}
const BottomView = (props: BottomViewProps) => {
  const { title, subTitle, onSubTitle, exStyle, exTextStyle = {} } = props;
  const { outer, flexDirection, paddingVertical, padding } = styles;
  const { appTheme } = useContext(AppContext);
  return (
    <View style={[outer, exStyle && exStyle]}>
      <View style={flexDirection}>
        <CustomText
          large
          style={[
            paddingVertical,
            {
              color: appTheme.lightText,
            },
            exTextStyle,
          ]}>
          {title}
        </CustomText>
        <Pressable
          onPress={() => onSubTitle()}
          android_ripple={CommonStyle.androidRipple}>
          <CustomText
            large
            style={[
              padding,
              {
                color: appTheme.themeColor,
              },
              exTextStyle,
            ]}>
            {subTitle}
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};

interface FooterProps {
  isPageCalling: boolean;
  events: any;
  page: number;
}
const ShowFooter = (props: FooterProps) => {
  const { appTheme } = useContext(AppContext);
  const { isPageCalling, events, page } = props;
  if (isPageCalling && events.length && page !== 1) {
    return (
      <View style={styles.footer}>
        <ActivityIndicator
          animating={true}
          size={'small'}
          color={appTheme.themeColor}
        />
        <CustomText
          style={[styles.space, { color: appTheme.lightText }]}
          medium>
          Loading Data...
        </CustomText>
      </View>
    );
  } else {
    return null;
  }
};

export { BottomView, ShowFooter };
