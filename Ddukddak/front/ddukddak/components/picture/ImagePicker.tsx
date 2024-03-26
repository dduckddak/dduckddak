import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GreenButton from '../GreenButton';
import PictureModal from './PictureModal';
import { addPhoto } from '../../api/photoApi';

interface ImagePickerComponentProps {
  onImageSelected: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  onImageSelected,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const getPermission = useCallback(
    async (type: 'camera' | 'library'): Promise<boolean> => {
      if (Platform.OS !== 'web') {
        const { status } = await (type === 'camera'
          ? ImagePicker.requestCameraPermissionsAsync()
          : ImagePicker.requestMediaLibraryPermissionsAsync());
        if (status !== 'granted') {
          Alert.alert('권한 승인이 거절되었습니다.');
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
    try {
      // addPhoto 함수의 인자로 파일의 URI를 직접 전달
      const response = await addPhoto({ photoFile: photoUri });
      Alert.alert('Upload Success', 'Photo uploaded successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Upload Failed', 'Failed to upload photo.');
    }
  };

  // 갤러리에서 사진 선택 후 업로드
  const pickImage = async () => {
    const hasPermission = await getPermission('library');
    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        uploadImage(result.assets[0].uri);
      }
    }
  };

  const modalOpen = () => {
    setModalVisible(true);
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
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    margin: 30,
  },
});
