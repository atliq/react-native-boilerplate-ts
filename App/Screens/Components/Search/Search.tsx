import React from 'react';
import { View } from 'react-native';
import { CommonStyle } from '@Theme';
import { CustomText, Layout } from '@CommonComponent';
import { useAppContext } from '@AppContext';

const Search = () => {
  const { appTheme } = useAppContext();

  return (
    <Layout>
      <View
        style={[
          CommonStyle.flexContainer,
          CommonStyle.center,
          { backgroundColor: appTheme.background },
        ]}
      >
        <CustomText xlarge style={{ color: appTheme.text }}>
          Search Tab
        </CustomText>
      </View>
    </Layout>
  );
};

export default Search;
