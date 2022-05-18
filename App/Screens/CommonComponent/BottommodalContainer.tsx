import {
  View,
  Modal,
  StyleSheet,
  StyleProp,
  TextStyle,
  Image,
  Pressable,
  ViewStyle,
} from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '@AppContext/index';
import { CustomText } from '@CommonComponent/CustomText';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import { Loading } from '@CommonComponent/Loading';

interface CustomProps {
  show: boolean;
  onClose: Function;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
  modalContainerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  animationType?: 'none' | 'slide' | 'fade' | undefined;
  secondaryBtn?: {
    onPress: Function;
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    isLoading?: boolean;
  };
}
const BottomModalContainer = (props: React.PropsWithChildren<CustomProps>) => {
  const { appTheme } = useContext(AppContext);

  return (
    <Modal
      transparent={true}
      animationType={props.animationType}
      visible={props.show}>
      <View style={[styles.model1, props.mainContainerStyle]}>
        <Pressable
          style={CommonStyle.absoluteView}
          onPress={() => props.onClose()}>
          <View />
        </Pressable>
        <View
          style={[
            styles.modelContainer,
            { backgroundColor: appTheme.background },
            props.modalContainerStyle,
          ]}>
          <View style={styles.titleContainer}>
            <CustomText xlarge style={[props.titleStyle, styles.title]}>
              {props.title}
            </CustomText>
            {props.secondaryBtn && (
              <Pressable
                android_ripple={CommonStyle.androidRipple}
                style={[
                  styles.secondBtn,
                  { backgroundColor: appTheme.text },
                  props.secondaryBtn.style,
                ]}
                onPress={() => props.secondaryBtn?.onPress()}>
                {((props.secondaryBtn.isLoading || false) && (
                  <Loading color={appTheme.tint} />
                )) || (
                  <CustomText
                    large
                    style={[
                      styles.boldFont,
                      { color: appTheme.tint },
                      props.secondaryBtn?.titleStyle,
                    ]}>
                    {props.secondaryBtn?.title}
                  </CustomText>
                )}
              </Pressable>
            )}
            <Pressable style={styles.closeBtn} onPress={() => props.onClose()}>
              <Image
                resizeMode={'contain'}
                source={{ uri: AppImages.icClose }}
                style={styles.closeImg}
              />
            </Pressable>
          </View>
          {(props.children && props.children) || null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  model1: {
    flex: 1,
    backgroundColor: 'rgba(82,82,82,0.3)',
    justifyContent: 'flex-end',
  },
  model: {
    width: '100%',
    backgroundColor: 'rgba(82,82,82,0.3)',
    justifyContent: 'flex-end',
  },
  modelContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    padding: 10,
  },
  closeBtn: { position: 'absolute', right: 10 },
  closeImg: { height: 18, width: 18 },
  secondBtn: {
    position: 'absolute',
    right: 45,
    width: 70,
    paddingVertical: 10,
    top: 0,
    borderRadius: 10,
    ...CommonStyle.center,
  },
  boldFont: { fontWeight: 'bold' },
});

export default BottomModalContainer;
