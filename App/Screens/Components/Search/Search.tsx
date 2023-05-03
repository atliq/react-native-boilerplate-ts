import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { CustomText } from '@CommonComponent';
import { AppContext } from '@AppContext';

const Search = () => {
  const { appTheme } = useContext(AppContext);

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        { backgroundColor: appTheme.background },
      ]}>
      <CustomText xlarge style={{ color: appTheme.text }}>
        Search Tab
      </CustomText>
    </SafeAreaView>
  );
};

export default Search;
