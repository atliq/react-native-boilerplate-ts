import React, { useContext } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { isIOS } from '@Utils/Constant';
import { AppContext } from '@AppContext/index';
import { NavigationBar } from '@CommonComponent/NavigationBar';
import CommonStyle from '@Theme/CommonStyle';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  padding?: number;
  onSubmit?: () => void;
  isSubmitProcessing?: boolean;
  submitTitle?: string;
  scrollable?: boolean;
  backgroundColor?: string;
  showBack?: boolean;
  refreshControl?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
}

const Layout = (props: LayoutProps) => {
  const { appTheme } = useContext(AppContext);
  const {
    children,
    title,
    padding = 0,
    onSubmit,
    isSubmitProcessing = false,
    submitTitle,
    scrollable = false,
    backgroundColor,
    showBack = false,
    refreshControl,
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
        {(title && (
          <NavigationBar
            title={title}
            submitTitle={submitTitle}
            onSubmit={onSubmit}
            isProcessing={isSubmitProcessing}
            backgroundColor={backgroundColor}
            showBack={showBack}
          />
        )) ||
          null}
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
