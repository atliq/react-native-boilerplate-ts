import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import { CustomText } from '@CommonComponent/CustomText';
import { ButtonComponent } from '@SubComponents/index';

interface NavigationBarProps {
  title: string;
  onSubmit?: (event: GestureResponderEvent) => any | undefined;
  isProcessing?: boolean;
  submitTitle?: string;
  backgroundColor?: string;
  showBack?: boolean;
}

const NavigationBar = (props: NavigationBarProps) => {
  const { appTheme } = useContext(AppContext);
  const {
    title,
    onSubmit,
    isProcessing = false,
    submitTitle = 'Submit',
    backgroundColor,
  } = props;
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor || appTheme.background },
      ]}>
      {(props.showBack && (
        <Pressable
          style={styles.backBtn}
          android_ripple={CommonStyle.androidRipple}
          onPress={() => navigation.goBack()}>
          <Image
            source={{ uri: AppImages.icBack }}
            style={[styles.icBack, { tintColor: appTheme.text }]}
            resizeMode="contain"
          />
        </Pressable>
      )) ||
        null}
      <CustomText xlarge style={styles.title}>
        {title}
      </CustomText>
      {(onSubmit && (
        <ButtonComponent
          onPress={onSubmit}
          title={submitTitle}
          style={styles.submit}
          isProcessing={isProcessing}
          borderRadius={5}
        />
      )) ||
        null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    ...CommonStyle.center,
  },
  title: {
    flex: 1,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  icBack: {
    height: 18,
    width: 20,
  },
  backBtn: { padding: 5 },
  submit: { paddingVertical: 7, paddingHorizontal: 15, minWidth: 50 },
});

export { NavigationBar };
