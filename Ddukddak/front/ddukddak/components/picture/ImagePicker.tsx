import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Platform, Dimensions, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GreenButton from '../GreenButton';
import PictureModal from './PictureModal';
import { addPhoto } from '../../api/photoApi';
import AlertModal from '../AlertModal';
import Loading from '../Loading';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const ImagePickerComponent: React.FC = () => {
  // 카메라, 갤러리 모달
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 성공 모달
  const [sAlertModal, setSAlertModal] = useState(false);
  // 실패 모달
  const [fAlertModal, setFAlertModal] = useState(false);
  // 실패 모달 메시지
  const [fAlertModalMessage, setFAlertModalMessage] = useState('');
  // 권한 모달
  const [gAlertModal, setGAlertModal] = useState(false);

  // 로딩 모달
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const photoFile: any = {
      uri: photoUri,
      type: 'image/jpeg', // 적절한 MIME 타입 지정
      name: `upload_${Date.now()}.jpg`, // 파일 이름 지정
    };
    try {
      const response = await addPhoto({ photoFile: photoFile as File });
      console.log(response);
      setSAlertModal(true);
    } catch (error: unknown) {
      console.error(error);

      if (typeof error === 'string') {
        let errorMessage = '사진 업로드에 실패했습니다. 다시 시도해 주세요.';
        if (error.includes('얼굴이 아닙니다.')) {
          errorMessage = '얼굴이 포함된 사진을 업로드해 주세요.';
        } else if (error.includes('하나의 얼굴만 가능합니다.')) {
          errorMessage = '한명의 얼굴이 포함된 사진을 업로드해 주세요.';
        }

        setFAlertModalMessage(errorMessage);
        setFAlertModal(true);
      } else {
        // 에러가 문자열이 아닌 경우의 처리
        setFAlertModalMessage('알 수 없는 에러가 발생했습니다.');
        setFAlertModal(true);
      }
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <Modal visible={isLoading} transparent={true} animationType="fade">
        <View style={styles.centeredLoadingView}>
          <Loading />
        </View>
      </Modal>
    );
  }

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
        text={[fAlertModalMessage]}
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
  centeredLoadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
