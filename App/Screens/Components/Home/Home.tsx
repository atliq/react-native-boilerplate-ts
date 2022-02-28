import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { CustomText } from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';

interface CustomProps {
  //YOUR PROPS WITH TYPES
}
const Home = (props: CustomProps) => {
  const { appTheme } = useContext(AppContext);

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        { backgroundColor: appTheme.background },
      ]}>
      <CustomText xlarge style={{ color: appTheme.text }}>
        Welcome...
      </CustomText>
    </SafeAreaView>
  );
};

export default Home;
