import React from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
  RefreshControl,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
} from 'react-native';
import { isIOS } from '@Utils';
import { useAppContext } from '@AppContext';
import { NavigationBar, ConditionalRender } from '@CommonComponent';
import { CommonStyle } from '@Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface LayoutProps {
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
    customSubmitComponent?: React.JSX.Element;
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

const Layout = (props: React.PropsWithChildren<LayoutProps>) => {
  const { appTheme } = useAppContext();
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

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        CommonStyle.flex1,
        { backgroundColor: backgroundColor ?? appTheme.background },
        { paddingTop: top, paddingBottom: bottom },
      ]}
    >
      <StatusBar
        backgroundColor={appTheme.themeColor}
        barStyle={
          (appTheme.type === 'dark' && 'light-content') || 'dark-content'
        }
      />
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardView}
        keyboardVerticalOffset={isIOS ? 0 : -500}
      >
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
        <ConditionalRender
          condition={scrollable}
          fallback={
            <ConditionalRender
              condition={removeContainerView}
              fallback={
                <View style={[CommonStyle.flex1, { padding }]}>{children}</View>
              }
            >
              <View style={{ padding }}>{children}</View>
            </ConditionalRender>
          }
        >
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
            }
          >
            {children}
          </ScrollView>
        </ConditionalRender>
      </KeyboardAvoidingView>
    </View>
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
