import React, { useContext } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { isIOS } from '@Utils/Constant';
import { AppContext } from '@AppContext/index';
import { NavigationBar } from '@CommonComponent/NavigationBar';
import CommonStyle from '@Theme/CommonStyle';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  titleCenter?: boolean;
  titleTextStyle?: StyleProp<TextStyle>;
  titleNumberOfLines?: number;
  titleMaxLength?: number;
  padding?: number;
  submit?: {
    onSubmit?: () => void;
    isSubmitProcessing?: boolean;
    submitTitle?: string;
    submitBtnStyle?: StyleProp<ViewStyle>;
    onSubmitBtnType?: 'btn' | 'img' | 'text' | 'custom';
    customSubmitComponent?: JSX.Element;
    submitImage?: string;
    submitImageStyle?: StyleProp<ImageStyle>;
  };
  scrollable?: boolean;
  backgroundColor?: string;
  showBack?: boolean;
  refreshControl?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
  navBarContainerStyle?: StyleProp<ViewStyle>;
  removeContainerView?: boolean;
}

const Layout = (props: LayoutProps) => {
  const { appTheme } = useContext(AppContext);
  const {
    children,
    title,
    titleCenter,
    titleTextStyle,
    titleNumberOfLines = 1,
    titleMaxLength,
    padding = 10,
    scrollable = false,
    backgroundColor,
    showBack = false,
    refreshControl,
    navBarContainerStyle,
    submit,
    removeContainerView = false,
  } = props;

  return (
    <SafeAreaView
      style={[
        CommonStyle.flex1,
        { backgroundColor: backgroundColor || appTheme.background },
      ]}>
      <StatusBar backgroundColor={appTheme.themeColor} barStyle="default" />
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardView}
        keyboardVerticalOffset={isIOS ? 0 : -500}>
        <NavigationBar
          title={title}
          titleCenter={titleCenter}
          titleTextStyle={titleTextStyle}
          titleNumberOfLines={titleNumberOfLines}
          titleMaxLength={titleMaxLength}
          backgroundColor={backgroundColor}
          showBack={showBack}
          exStyle={navBarContainerStyle}
          paddingHorizontal={padding}
          submit={submit}
        />
        {(scrollable && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={[styles.scrollContainer, { padding }]}
            refreshControl={
              (refreshControl && (
                <RefreshControl
                  refreshing={refreshControl.refreshing}
                  onRefresh={refreshControl.onRefresh}
                  tintColor={appTheme.themeColor}
                />
              )) ||
              undefined
            }>
            {children}
          </ScrollView>
        )) ||
          (removeContainerView && (
            <View style={{ padding }}>{children}</View>
          )) || (
            <View style={[CommonStyle.flex1, { padding }]}>{children}</View>
          )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: { flexGrow: 1 },
});

export { Layout };
