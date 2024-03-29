import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GreenButton from '../GreenButton';
import PictureModal from './PictureModal';
import { addPhoto } from '../../api/photoApi';
import AlertModal from '../AlertModal';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const ImagePickerComponent: React.FC = () => {
  // 카메라, 갤러리 모달
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 성공 모달
  const [sAlertModal, setSAlertModal] = useState(false);
  // 실패 모달
  const [fAlertModal, setFAlertModal] = useState(false);
  // 권한 모달
  const [gAlertModal, setGAlertModal] = useState(false);

  const getPermission = useCallback(
    async (type: 'camera' | 'library'): Promise<boolean> => {
      if (Platform.OS !== 'web') {
        const { status } = await (type === 'camera'
          ? ImagePicker.requestCameraPermissionsAsync()
          : ImagePicker.requestMediaLibraryPermissionsAsync());
        if (status !== 'granted') {
          setGAlertModal(true);
          // Alert.alert('권한 승인이 거절되었습니다.');
          return false;
        }
        return true;
      }
      return false;
    },
    [],
  );

  // 이미지를 서버로 업로드
  const uploadImage = async (photoUri: string) => {
    const photoFile: any = {
      uri: photoUri,
      type: 'image/jpeg', // 적절한 MIME 타입 지정
      name: `upload_${Date.now()}.jpg`, // 파일 이름 지정
    };
    try {
      const response = await addPhoto({ photoFile: photoFile as File });
      console.log(response);
      setSAlertModal(true);
    } catch (error) {
      console.error(error);
      setFAlertModal(true);
    }
  };

  // 갤러리에서 사진 선택 후 업로드
  const pickImage = async () => {
    const hasPermission = await getPermission('library');
    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets) {
        uploadImage(result.assets[0].uri);
      }
    }
  };

  // 카메라 촬영 후 업로드
  const takePhoto = async () => {
    const hasPermission = await getPermission('camera');
    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets) {
        uploadImage(result.assets[0].uri);
      }
    }
  };

  const modalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSAlertModal(false);
    setFAlertModal(false);
    setGAlertModal(false);
  };

  return (
    <View>
      <GreenButton
        content="추가하기"
        onPress={modalOpen}
        style={styles.buttonStyle}
      />
      <PictureModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={takePhoto}
        onLaunchImageLibrary={pickImage}
      />

      <AlertModal
        isVisible={sAlertModal}
        text={['사진 업로드 성공 !!']}
        onConfirm={handleModalClose}
      />

      <AlertModal
        isVisible={fAlertModal}
        text={['사진 업로드 실패. 다시 시도해 주세요.']}
        onConfirm={handleModalClose}
      />

      <AlertModal
        isVisible={gAlertModal}
        text={['권한 승인이 거절되었습니다.']}
        onConfirm={handleModalClose}
      />
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  buttonStyle: {
    width: screenWidth * 0.15,
    margin: screenHeight * 0.05,
  },
});
