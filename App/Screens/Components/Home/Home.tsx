import React, { useState } from 'react';
import { CustomText, Layout, BottomModalContainer } from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';

const Home = () => {
  const [isShowModal, setShowModal] = useState(false);
  return (
    <Layout title="Widgets" padding={20}>
      <CustomText large>Home screen</CustomText>
      <ButtonComponent
        onPress={() => {
          setShowModal(true);
        }}
        title={'Show Modal'}
      />
      <BottomModalContainer
        title={'Modal'}
        onClose={() => setShowModal(false)}
        show={isShowModal}>
        <CustomText large>Modal</CustomText>
      </BottomModalContainer>
    </Layout>
  );
};

export default Home;
