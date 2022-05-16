import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import { AssetImage, CustomText, NetworkImage } from '@CommonComponent/index';
import { ButtonComponent } from '@SubComponents/index';
import AppImages from '@Theme/AppImages';

const styles = StyleSheet.create({
  btnTitle: {
    marginVertical: 10,
  },
  btnBorder: {
    borderRadius: 40,
  },
});
const Users = () => {
  const { appTheme } = useContext(AppContext);
  const { btnTitle, btnBorder } = styles;

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        { backgroundColor: appTheme.background },
      ]}>
      <CustomText xlarge style={[btnTitle, { color: appTheme.text }]}>
        Button Component
      </CustomText>
      <ButtonComponent title={'Button'} onPress={() => null} />
      <ButtonComponent title={'Button'} isProcessing onPress={() => null} />
      <ButtonComponent
        title={'Border Button'}
        border={appTheme.themeColor}
        textColor={appTheme.themeColor}
        backColor={appTheme.background}
        onPress={() => null}
      />
      <ButtonComponent
        title={'Danger Button'}
        border={appTheme.red}
        textColor={appTheme.red}
        backColor={appTheme.background}
        onPress={() => null}
      />
      <ButtonComponent
        title={'Disabled Button'}
        border={appTheme.lightText}
        textColor={appTheme.lightText}
        backColor={appTheme.background}
        onPress={() => null}
      />
      <ButtonComponent
        title={'Rounded Button'}
        style={btnBorder}
        onPress={() => null}
      />
      <NetworkImage
        source={
          'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
        }
        placeholder={AppImages.home}
      />
      <AssetImage source={AppImages.search} />
    </SafeAreaView>
  );
};

export default Users;
