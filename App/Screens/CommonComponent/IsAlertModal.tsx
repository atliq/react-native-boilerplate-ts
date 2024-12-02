import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useAppContext } from '@AppContext';
import { CustomText, CustomTextInput } from '@CommonComponent';
import { CommonStyle } from '@Theme';
import { ButtonComponent } from '@SubComponents';
import { isIOS, width, getSize } from '@Utils';

interface CustomProps {
  visible: boolean;
  onClose: () => void;
  leftBtn?: {
    title: string;
    onPress: () => void;
    style: StyleProp<ViewStyle> | undefined;
    textColor?: string;
  };
  rightBtn?: {
    title: string;
    onPress: (() => void) | (() => Promise<void>);
    style: StyleProp<ViewStyle>;
    textColor?: string;
  };
  data: {
    title: string;
    subTitle?: string;
  };
  isProcessing?: boolean;
  emailInput?: boolean;
  userNameInput?: boolean;
  error?: string;
  deleteAccount?: boolean;
  deleteTextInput?: string;
  setDeleteTextInput?: (text: string) => void;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
}
const IsAlertModal = ({
  visible = false,
  onClose,
  leftBtn,
  rightBtn,
  data = { title: '', subTitle: '' },
  isProcessing = false,
  emailInput,
  userNameInput,
  error = '',
  deleteAccount = false,
  deleteTextInput,
  setDeleteTextInput,
  titleStyle,
  subTitleStyle,
}: CustomProps) => {
  const { appTheme } = useAppContext();

  if (!data) {
    return null;
  }

  const renderModal = () => {
    const { title, subTitle } = data;

    return (
      <KeyboardAvoidingView
        behavior={(isIOS && 'padding') || undefined}
        style={[
          CommonStyle.flexContainer,
          CommonStyle.center,
          { backgroundColor: appTheme.overlay },
        ]}>
        <TouchableOpacity
          style={[
            CommonStyle.absoluteView,
            { backgroundColor: appTheme.transparent },
          ]}
          activeOpacity={1}
          onPress={onClose}>
          <View />
        </TouchableOpacity>
        <View style={[styles.card, { backgroundColor: appTheme.background }]}>
          <View style={styles.footer}>
            <CustomText
              xlarge
              style={[
                styles.title,
                {
                  color: appTheme.text,
                },
                titleStyle,
              ]}>
              {title}
            </CustomText>
            {(subTitle && (
              <CustomText
                large
                style={[
                  styles.subTitle,
                  {
                    color: appTheme.gray,
                  },
                  subTitleStyle,
                ]}>
                {subTitle}
              </CustomText>
            )) ||
              null}
            {(deleteAccount && (
              <CustomText
                large
                style={styles.deleteAccountText}
                children={
                  <View style={[CommonStyle.row, styles.deleteText]}>
                    <CustomText>{'Please type '}</CustomText>
                    <CustomText
                      large
                      style={[
                        styles.deleteStyle,
                        {
                          color: appTheme.themeColor,
                        },
                      ]}>
                      {'DELETE '}
                    </CustomText>
                    <CustomText>to confirm.</CustomText>
                  </View>
                }
              />
            )) ||
              null}

            {(deleteAccount && (
              <CustomTextInput
                containerStyle={[styles.DeleteTextInput]}
                onTextChange={text => {
                  setDeleteTextInput!(text);
                }}
                placeholder="Type here..."
                value={deleteTextInput}
                label=""
              />
            )) ||
              null}

            {(emailInput && (
              <View style={styles.textInput}>{emailInput}</View>
            )) ||
              null}
            {(userNameInput && (
              <View style={styles.textInput}>{userNameInput}</View>
            )) ||
              null}
            {(error && (
              <View style={styles.errorOuter}>
                <CustomText style={{ color: appTheme.red }}>{error}</CustomText>
              </View>
            )) ||
              null}
            <View style={styles.bottomBtn}>
              {(leftBtn && (
                <ButtonComponent
                  onPress={() => {
                    leftBtn.onPress();
                  }}
                  title={leftBtn.title}
                  textColor={leftBtn.textColor}
                  style={[styles.btnOuter, leftBtn.style]}
                />
              )) ||
                null}
              {(rightBtn && (
                <ButtonComponent
                  isProcessing={isProcessing}
                  onPress={rightBtn.onPress}
                  title={rightBtn.title}
                  textColor={rightBtn.textColor}
                  style={[styles.btnOuter, rightBtn.style]}
                />
              )) ||
                null}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}>
      {renderModal()}
    </Modal>
  );
};
export { IsAlertModal };

const styles = StyleSheet.create({
  card: {
    width: '90%',
    overflow: 'hidden',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    width: '80%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  bottomBtn: {
    flexDirection: 'row',
    marginTop: 20,
  },
  btnOuter: {
    minHeight: 50,
    shadowOpacity: 0,
    elevation: 0,
    width: (width * 0.9) / 2,
  },
  xOuter: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  xInner: {
    ...getSize(30),
    position: 'absolute',
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorOuter: {
    width: '80%',
    alignSelf: 'center',
  },
  subTitle: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
  deleteAccountText: {
    justifyContent: 'center',
    marginTop: 20,
  },
  deleteText: {
    justifyContent: 'center',
    width: width - 40,
  },
  DeleteTextInput: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  deleteStyle: {
    transform: [
      {
        translateY: (!isIOS && -2) || -1,
      },
    ],
    fontWeight: 'bold',
  },
});
