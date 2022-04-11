import React, { useContext, useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';
import { CustomText } from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { BottomView, GradientButton } from '@SubComponents/index';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { setItemInStorage } from '@Utils/Storage';
import { Route } from '@Routes/AppRoutes';

const styles = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    marginTop: 130,
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'right',
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 50,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});

const Login = () => {
  const { appTheme, translations } = useContext(AppContext);
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: '',
    password: '',
    isSecureTextEntry: true,
    isProcessing: false,
  });
  const { email, password, isSecureTextEntry, isProcessing } = state;

  const refEmail = useRef<any>();
  const refPassword = useRef<any>();

  const { outer, title, btnText, marginTop, flexDirection, flex } = styles;
  const { input, flexContainer, center, inputIcon, inputImg } = CommonStyle;
  const inputStyle = [
    input,
    {
      color: appTheme.text,
      borderColor: appTheme.border,
    },
  ];

  const onSubmitEditing = (refName: any) => {
    if (refName) {
      refName.focus();
    }
  };

  const onChangeText = (text: string, type: string) => {
    setState({
      ...state,
      [type]: text,
    });
  };

  const onShowPassword = () => {
    setState({
      ...state,
      isSecureTextEntry: !isSecureTextEntry,
    });
  };

  const manageProcessing = (isProcessingState: boolean) => {
    setState({
      ...state,
      isProcessing: isProcessingState,
    });
  };

  const onLogin = async () => {
    try {
      // Field Validation
      // Make api call ans store user in redux and token in Storage
      goToNextScreen(Route.HomeScreen);
      await setItemInStorage('token', 'set login token');
    } catch (error) {
      manageProcessing(false);
    }
  };

  const goToNextScreen = (page: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: page }],
      }),
    );
  };

  return (
    <SafeAreaView
      style={[flexContainer, { backgroundColor: appTheme.background }]}>
      <View style={[flexContainer, center]}>
        <View style={outer}>
          <CustomText xxlarge style={[title, { color: appTheme.text }]}>
            {translations.SIGN_IN}
          </CustomText>
          <TextInput
            onChangeText={(text: string) => onChangeText(text, 'email')}
            value={email}
            autoCapitalize={'none'}
            placeholder={'Email'}
            style={inputStyle}
            placeholderTextColor={appTheme.lightText}
            underlineColorAndroid={appTheme.transparent}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            ref={refEmail}
            onSubmitEditing={() => onSubmitEditing('refPassword')}
          />
          <View style={flexDirection}>
            <TextInput
              onChangeText={(text: string) => onChangeText(text, 'password')}
              value={password}
              autoCapitalize={'none'}
              placeholder={'Password'}
              style={[inputStyle, flex]}
              placeholderTextColor={appTheme.lightText}
              underlineColorAndroid={appTheme.transparent}
              secureTextEntry={isSecureTextEntry}
              returnKeyType={'done'}
              ref={refPassword}
              onSubmitEditing={onLogin}
            />
            <Pressable
              onPress={onShowPassword}
              android_ripple={CommonStyle.androidRipple}>
              <View
                style={{
                  ...center,
                  ...inputIcon,
                  borderBottomColor: appTheme.border,
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    (isSecureTextEntry && AppImages.passwordOpen) ||
                    AppImages.passwordClosed
                  }
                  style={inputImg}
                />
              </View>
            </Pressable>
          </View>
          <CustomText style={[btnText, { color: appTheme.lightText }]}>
            Forgot Password?
          </CustomText>
          <GradientButton
            title={'Log in'}
            isProcessing={isProcessing}
            onPress={onLogin}
            exStyle={marginTop}
          />
          <BottomView
            title={'Need to create an account?'}
            subTitle={'Sign up here'}
            onSubTitle={() => console.log('go to signup')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
