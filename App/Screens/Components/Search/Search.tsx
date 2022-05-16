import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { CustomText } from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import Simmer from '@CommonComponent/Simmer';

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
      <Simmer>
        <Simmer.Item flexDirection={'row'} marginTop={30}>
          <Simmer.Item
            height={70}
            width={70}
            marginRight={20}
            borderRadius={5}
          />
          <Simmer.Item flexDirection={'column'} marginTop={10}>
            <Simmer.Item
              height={20}
              width={250}
              alignSelf={'center'}
              borderRadius={20}
            />
            <Simmer.Item
              height={20}
              width={200}
              borderRadius={20}
              marginTop={10}
            />
          </Simmer.Item>
        </Simmer.Item>
      </Simmer>
    </SafeAreaView>
  );
};

export default Search;
