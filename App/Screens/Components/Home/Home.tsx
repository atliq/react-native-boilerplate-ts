/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  CustomText,
  Layout,
  BottomModalContainer,
  IsAlertModal,
} from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';
import {
  compareAppVersions,
  getVersionName,
  openLink,
  alertData,
  isIOS,
  width,
  wrapAsync,
} from '@Utils';
import { useAppContext } from '@AppContext';
import { useAppDispatch } from '@Stores';
import { fetchUser } from '@Thunks';

const Home = () => {
  const { appTheme } = useAppContext();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  const [isShowModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  let version = getVersionName();
  const alertDetails = alertData.updateVersion;

  useEffect(() => {
    if (isFocused) {
      checkMinimumVersion();
      dispatch(fetchUser({ user: {}, loading: false }));
    }
  }, [isFocused]); // Original function wrapped with useTryCatch
  const checkMinimumVersion = wrapAsync(async () => {
    let shouldUpdate = compareAppVersions({
      version,
      minimumVersion: 'v1.0.0', // Wrap whole try block in if condition with apiConfig.serviceConfig and pass minimumVersion from api response
    });
    if (shouldUpdate) {
      setIsUpdate(true);
      return;
    }
    return;
  });

  // Original function wrapped with useTryCatch
  const updateApp = wrapAsync(async () => {
    if (isIOS) {
      await openLink(''); // React Native app for testing
    } else {
      await openLink('');
    }
  });

  return (
    <Layout title="Widgets" padding={20}>
      <CustomText large>Home screen</CustomText>
      <ButtonComponent
        onPress={() => {
          setShowModal(true);
          updateApp();
        }}
        backColor={appTheme.themeColor}
        title="Show Modal"
        borderRadius={10}
      />
      <BottomModalContainer
        title="Modal"
        onClose={() => setShowModal(false)}
        show={isShowModal}
      >
        <CustomText large>Modal</CustomText>
      </BottomModalContainer>
      <IsAlertModal
        visible={isUpdate}
        data={alertDetails}
        onClose={() => null}
        rightBtn={{
          title: 'Update',
          onPress: updateApp,
          style: {
            borderColor: appTheme.themeColor,
            backgroundColor: appTheme.themeColor,
            borderRadius: 0,
            marginVertical: 0,
            width: width * 0.8,
            marginHorizontal: width * 0.05,
          },
          textColor: appTheme.tint,
        }}
      />
    </Layout>
  );
};

export default Home;
