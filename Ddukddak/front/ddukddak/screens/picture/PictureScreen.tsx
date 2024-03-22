import React, { useState } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PictureModal from '../../components/picture/PictureModal';
import * as ImagePicker from 'expo-image-picker';
import GreenButton from '../../components/GreenButton';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 50) / 4; // 여기서 50은 카드 사이의 총 마진입니다.
const CARD_HEIGHT = CARD_WIDTH;

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
        <FlatList
          data={selectedImages}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <GreenButton
          content="추가하기"
          onPress={modalOpen}
          style={styles.buttonStyle}
        />
        <GreenButton
          content="삭제하기"
          onPress={modalOpen}
          style={styles.buttonStyle}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // 버튼 사이의 공간을 균등하게
    alignItems: 'center',
    position: 'absolute',
    bottom: 20, // 하단에서부터의 간격
    left: 0,
    right: 0,
    gap: 30,
  },
  buttonStyle: {
    width: '10%',
    margin: 30,
  },
  card: {
    marginTop: '5%',
    marginLeft: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
