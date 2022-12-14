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
  onSubmit?: () => void;
  isSubmitProcessing?: boolean;
  submitTitle?: string;
  submitBtnStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  backgroundColor?: string;
  showBack?: boolean;
  refreshControl?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
  navBarContainerStyle?: StyleProp<ViewStyle>;
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
    padding = 0,
    onSubmit,
    isSubmitProcessing = false,
    submitTitle,
    submitBtnStyle,
    scrollable = false,
    backgroundColor,
    showBack = false,
    refreshControl,
    navBarContainerStyle,
  } = props;

  return (
    <SafeAreaView
      style={[
        CommonStyle.flex1,
        { backgroundColor: backgroundColor || appTheme.background },
      ]}>
      <StatusBar backgroundColor={appTheme.themeColor} barStyle={'default'} />
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.keyboardView}
        keyboardVerticalOffset={isIOS ? 0 : -500}>
        <NavigationBar
          title={title}
          submitTitle={submitTitle}
          titleCenter={titleCenter}
          titleTextStyle={titleTextStyle}
          titleNumberOfLines={titleNumberOfLines}
          titleMaxLength={titleMaxLength}
          onSubmit={onSubmit}
          isProcessing={isSubmitProcessing}
          backgroundColor={backgroundColor}
          showBack={showBack}
          exStyle={navBarContainerStyle}
          paddingHorizontal={padding}
          submitBtnStyle={submitBtnStyle}
        />
        {(scrollable && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
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
        )) || <View style={[CommonStyle.flex1, { padding }]}>{children}</View>}
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
