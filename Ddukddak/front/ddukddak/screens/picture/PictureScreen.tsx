import React, { useState } from 'react';
import {
  View,
  Pressable,
  Platform,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  Button,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PictureModal from '../../components/picture/PictureModal';
import * as ImagePicker from 'expo-image-picker';

export declare type ImageInfo = {
  uri: string;
  width: number;
  height: number;
  type?: 'image' | 'video';
  exif?: {
    [key: string]: any;
  };
  base64?: string;
};
export declare type ImagePickerResult =
  | {
      cancelled: true;
    }
  | ({
      cancelled: false;
    } & ImageInfo);

function CameraButton() {
  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const imagePickerOption = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3] as [number, number],
    quality: 1,
    base64: Platform.OS === 'android',
  };

  const onPickImage = async (pickerResult: ImagePicker.ImagePickerResult) => {
    if (!pickerResult.canceled) {
      const uri = (pickerResult as ImagePicker.ImagePickerSuccessResult)
        .assets[0].uri;
      setSelectedImages((currentImages) => [...currentImages, uri]);
      console.log(uri);
    }
  };

  // 카메라 촬영
  const onLaunchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync(imagePickerOption);
    onPickImage(result);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(imagePickerOption);
    onPickImage(result);
  };

  // 선택 모달 오픈
  const modalOpen = () => {
    setModalVisible(true);
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <View style={styles.card}>
      <Image source={{ uri: item }} style={styles.cardImage} />
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <Pressable onPress={modalOpen} style={styles.cameraButton}>
          <Text style={{ margin: 50 }}>클릭</Text>
          <MaterialIcons name="camera-alt" color="white" size={24} />
        </Pressable>
        <FlatList
          data={selectedImages}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
        />
      </View>
      <PictureModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </ImageBackground>
  );
}

export default CameraButton;

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cameraButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10, // 둥근 모서리
    overflow: 'hidden', // 둥근 모서리와 함께 이미지를 잘라냄
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android 그림자
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});
