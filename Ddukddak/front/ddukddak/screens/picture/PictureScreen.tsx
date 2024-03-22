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

interface ImageItem {
  uri: string;
}

function CameraButton() {
  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [image, setImage] = useState(null);

  const imagePickerOption = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3] as [number, number],
    quality: 1,
    base64: Platform.OS === 'android',
  };

  const onPickImage = async (pickerResult: ImagePicker.ImagePickerResult) => {
    if (!pickerResult.canceled) {
      const uri = (pickerResult as ImagePicker.ImagePickerSuccessResult).uri;
      setSelectedImages((currentImages) => [...currentImages, uri]);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
    if (Platform.OS === 'android') {
      setModalVisible(true); // Android 경우, modal visible
    } else {
      // iOS에 대한 처리, 필요한 경우 추가
    }
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
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
          horizontal={false}
          numColumns={2}
        />
      </View>
      <Button title="test" onPress={pickImage} />
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
});
