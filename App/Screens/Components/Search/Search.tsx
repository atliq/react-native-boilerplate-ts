import React from 'react';
import { SafeAreaView } from 'react-native';
import { CommonStyle } from '@Theme';
import { CustomText } from '@CommonComponent';
import { useAppContext } from '@AppContext';

const Search = () => {
  const { appTheme } = useAppContext();

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
